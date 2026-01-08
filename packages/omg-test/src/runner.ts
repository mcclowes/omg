/**
 * Test Runner
 *
 * Orchestrates contract testing against live APIs
 */

import type { ParsedApi, ParsedEndpoint } from 'omg-parser';
import type {
  TestRunnerOptions,
  TestSuiteResult,
  EndpointTestResult,
  AuthConfig,
  EnvConfig,
  BuiltRequest,
} from './types.js';
import { createRequestBuilder, executeRequest } from './request-builder.js';
import { createValidator } from './validator.js';
import { createReporter } from './reporter.js';

/**
 * Create a test runner for an API specification
 */
export function createTestRunner(api: ParsedApi, options: TestRunnerOptions) {
  const {
    baseUrl,
    auth,
    env = {},
    timeout = 30000,
    retries = 3,
    retryDelay = 1000,
    endpoints,
    skip,
    bail = false,
    verbose = false,
    headers = {},
  } = options;

  const requestBuilder = createRequestBuilder(api, {
    baseUrl,
    auth,
    env,
    headers,
    timeout,
  });

  const validator = createValidator(api);
  const reporter = createReporter({ format: 'console', verbose });

  return {
    /**
     * Run all tests
     */
    async run(): Promise<TestSuiteResult> {
      const startedAt = new Date();
      const startTime = Date.now();

      const results: EndpointTestResult[] = [];

      // Build requests for all endpoints
      const requests = requestBuilder.buildAll({ endpoints, skip });

      let shouldBail = false;

      for (const builtRequest of requests) {
        if (shouldBail) {
          // Mark remaining tests as skipped due to bail
          results.push({
            endpoint: {
              method: builtRequest.endpoint.method,
              path: builtRequest.endpoint.path,
              operationId: builtRequest.endpoint.operationId,
            },
            status: 'skipped',
            duration: 0,
            expectedStatusCodes: builtRequest.expectedStatusCodes,
            skipReason: 'Bailed due to previous failure',
          });
          continue;
        }

        const result = await runSingleTest(builtRequest, {
          validator,
          retries,
          retryDelay,
          verbose,
        });

        results.push(result);
        reporter.reportEndpoint(result);

        if (bail && (result.status === 'failed' || result.status === 'error')) {
          shouldBail = true;
        }
      }

      const finishedAt = new Date();
      const duration = Date.now() - startTime;

      // Calculate summary
      const summary = {
        total: results.length,
        passed: results.filter((r) => r.status === 'passed').length,
        failed: results.filter((r) => r.status === 'failed').length,
        skipped: results.filter((r) => r.status === 'skipped').length,
        errors: results.filter((r) => r.status === 'error').length,
      };

      return {
        apiName: api.name,
        apiVersion: api.version,
        baseUrl,
        duration,
        startedAt,
        finishedAt,
        summary,
        results,
      };
    },

    /**
     * Run test for a single endpoint
     */
    async runEndpoint(operationId: string): Promise<EndpointTestResult> {
      const endpoint = api.endpoints.find((e) => e.operationId === operationId);
      if (!endpoint) {
        throw new Error(`Endpoint not found: ${operationId}`);
      }

      const builtRequest = requestBuilder.build(endpoint);
      return runSingleTest(builtRequest, { validator, retries, retryDelay, verbose });
    },

    /**
     * Get list of endpoints that will be tested
     */
    getEndpoints(): Array<{ method: string; path: string; operationId: string }> {
      const requests = requestBuilder.buildAll({ endpoints, skip });
      return requests.map((r) => ({
        method: r.endpoint.method,
        path: r.endpoint.path,
        operationId: r.endpoint.operationId,
      }));
    },
  };
}

/**
 * Run a single test
 */
async function runSingleTest(
  builtRequest: BuiltRequest,
  options: {
    validator: ReturnType<typeof createValidator>;
    retries: number;
    retryDelay: number;
    verbose: boolean;
  }
): Promise<EndpointTestResult> {
  const { validator, retries, retryDelay, verbose } = options;
  const { endpoint, request, expectedStatusCodes, skipped, skipReason } = builtRequest;

  const startTime = Date.now();

  // Handle skipped requests
  if (skipped) {
    return {
      endpoint: {
        method: endpoint.method,
        path: endpoint.path,
        operationId: endpoint.operationId,
      },
      status: 'skipped',
      duration: 0,
      expectedStatusCodes,
      skipReason,
    };
  }

  try {
    // Execute the request
    const response = await executeRequest(request, { retries, retryDelay });
    const duration = Date.now() - startTime;

    // Validate status code
    const statusValidation = validator.validateStatusCode(response.statusCode, expectedStatusCodes);

    // Get the response schema for the actual status code
    const responseInfo = endpoint.responses[response.statusCode];
    const schema = responseInfo?.schema || null;

    // Validate response body
    const bodyValidation = validator.validate(response.body, schema);

    // Determine overall status
    const isStatusValid = statusValidation.valid;
    const isBodyValid = bodyValidation.valid;
    const status = isStatusValid && isBodyValid ? 'passed' : 'failed';

    // Merge validation results
    const validation = {
      valid: isStatusValid && isBodyValid,
      errors: [...statusValidation.errors, ...bodyValidation.errors],
    };

    const result: EndpointTestResult = {
      endpoint: {
        method: endpoint.method,
        path: endpoint.path,
        operationId: endpoint.operationId,
      },
      status,
      duration,
      statusCode: response.statusCode,
      expectedStatusCodes,
      validation,
    };

    // Include request/response details in verbose mode or on failure
    if (verbose || status === 'failed') {
      result.request = {
        url: request.url,
        method: request.method,
        headers: request.headers,
        body: request.body,
      };
      result.response = {
        statusCode: response.statusCode,
        headers: response.headers,
        body: response.body,
      };
    }

    return result;
  } catch (error) {
    const duration = Date.now() - startTime;

    return {
      endpoint: {
        method: endpoint.method,
        path: endpoint.path,
        operationId: endpoint.operationId,
      },
      status: 'error',
      duration,
      expectedStatusCodes,
      error: error instanceof Error ? error.message : String(error),
      request: {
        url: request.url,
        method: request.method,
        headers: request.headers,
        body: request.body,
      },
    };
  }
}

/**
 * Run contract tests against a live API
 *
 * This is a convenience function that creates a test runner and runs all tests.
 */
export async function runContractTests(
  api: ParsedApi,
  options: TestRunnerOptions
): Promise<TestSuiteResult> {
  const runner = createTestRunner(api, options);
  return runner.run();
}

/**
 * Parse authentication from a string
 *
 * Supported formats:
 * - "Bearer <token>" -> { type: 'bearer', token: '<token>' }
 * - "Basic <base64>" -> { type: 'basic', ... }
 * - "<name>: <value>" -> { type: 'header', name: '<name>', value: '<value>' }
 */
export function parseAuth(auth: string): AuthConfig {
  if (!auth || auth.toLowerCase() === 'none') {
    return { type: 'none' };
  }

  // Bearer token
  if (auth.toLowerCase().startsWith('bearer ')) {
    return { type: 'bearer', token: auth.slice(7) };
  }

  // Basic auth
  if (auth.toLowerCase().startsWith('basic ')) {
    const base64 = auth.slice(6);
    try {
      const decoded = Buffer.from(base64, 'base64').toString('utf-8');
      const [username, password] = decoded.split(':');
      return { type: 'basic', username: username || '', password: password || '' };
    } catch {
      // Not valid base64, treat as raw credentials
      return { type: 'header', name: 'Authorization', value: auth };
    }
  }

  // Custom header (name: value format)
  const colonIndex = auth.indexOf(':');
  if (colonIndex > 0) {
    const name = auth.slice(0, colonIndex).trim();
    const value = auth.slice(colonIndex + 1).trim();

    // Check if it looks like a standard Authorization header
    if (name.toLowerCase() === 'authorization') {
      return { type: 'header', name: 'Authorization', value };
    }

    return { type: 'header', name, value };
  }

  // Default: treat as bearer token
  return { type: 'bearer', token: auth };
}

/**
 * Parse environment file content
 *
 * Supports simple KEY=VALUE format
 */
export function parseEnvFile(content: string): EnvConfig {
  const env: EnvConfig = {};

  for (const line of content.split('\n')) {
    const trimmed = line.trim();

    // Skip empty lines and comments
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const eqIndex = trimmed.indexOf('=');
    if (eqIndex > 0) {
      const key = trimmed.slice(0, eqIndex).trim();
      let value = trimmed.slice(eqIndex + 1).trim();

      // Remove surrounding quotes
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      env[key] = value;
    }
  }

  return env;
}

/**
 * Load environment from a file
 */
export async function loadEnvFile(filePath: string): Promise<EnvConfig> {
  const fs = await import('fs');
  const content = fs.readFileSync(filePath, 'utf-8');
  return parseEnvFile(content);
}
