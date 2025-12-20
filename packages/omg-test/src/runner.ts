/**
 * Contract Test Runner
 *
 * Orchestrates contract tests against a live API.
 */

import { loadApi } from 'omg-parser';
import { compileToOpenApi } from 'omg-compiler';
import type { TestOptions, TestResult, TestSummary, EndpointSpec, CheckResult } from './types.js';
import { buildRequest, extractEndpoints } from './request-builder.js';
import { validateResponse, validateStatusCode, validateRequiredFields } from './validator.js';

const DEFAULT_TIMEOUT = 30000;
const DEFAULT_RETRIES = 2;

/**
 * Run contract tests against a live API
 */
export async function runContractTests(
  inputPath: string,
  options: TestOptions
): Promise<TestSummary> {
  const startTime = Date.now();
  const results: TestResult[] = [];

  // Load and compile OMG to OpenAPI
  const api = loadApi(inputPath);
  const openapi = compileToOpenApi(api);

  // Extract testable endpoints
  // Cast to the expected type - OpenAPI paths are compatible
  const allEndpoints = extractEndpoints(
    openapi as unknown as {
      paths: Record<string, Record<string, unknown>>;
      components?: { schemas?: Record<string, unknown> };
    }
  );

  // Filter endpoints if specified
  const endpoints = filterEndpoints(allEndpoints, options.endpoints);

  if (options.verbose) {
    console.error(`Found ${endpoints.length} endpoint(s) to test`);
  }

  // Run tests for each endpoint
  for (const endpoint of endpoints) {
    const result = await testEndpoint(endpoint, options);
    results.push(result);
  }

  // Calculate summary
  const summary: TestSummary = {
    total: results.length,
    passed: results.filter((r) => r.passed).length,
    failed: results.filter((r) => !r.passed && !r.error?.includes('skipped')).length,
    skipped: results.filter((r) => r.error?.includes('skipped')).length,
    duration: Date.now() - startTime,
    results,
  };

  return summary;
}

/**
 * Test a single endpoint
 */
async function testEndpoint(endpoint: EndpointSpec, options: TestOptions): Promise<TestResult> {
  const startTime = Date.now();
  const checks: CheckResult[] = [];

  // Build the request
  const buildResult = buildRequest(endpoint, options);

  if (buildResult.error || !buildResult.request) {
    return {
      operationId: endpoint.operationId,
      method: endpoint.method,
      path: endpoint.path,
      passed: false,
      duration: Date.now() - startTime,
      checks: [],
      error: `Skipped: ${buildResult.error}`,
    };
  }

  const { request } = buildResult;

  if (options.verbose) {
    console.error(`Testing ${endpoint.method} ${endpoint.path}...`);
    console.error(`  URL: ${request.url}`);
  }

  // Execute the request with retries
  let response: Response | undefined;
  let lastError: Error | undefined;

  const maxRetries = options.retries ?? DEFAULT_RETRIES;
  const timeout = options.timeout ?? DEFAULT_TIMEOUT;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      response = await fetch(request.url, {
        method: request.method,
        headers: request.headers,
        body: request.body,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      break; // Success, exit retry loop
    } catch (err) {
      lastError = err as Error;
      if (attempt < maxRetries) {
        // Wait before retrying (exponential backoff)
        await sleep(Math.pow(2, attempt) * 1000);
      }
    }
  }

  if (!response) {
    return {
      operationId: endpoint.operationId,
      method: endpoint.method,
      path: endpoint.path,
      passed: false,
      duration: Date.now() - startTime,
      checks: [],
      error: `Request failed after ${maxRetries + 1} attempts: ${lastError?.message}`,
      request: {
        url: request.url,
        method: request.method,
        headers: request.headers,
        body: request.body ? JSON.parse(request.body) : undefined,
      },
    };
  }

  // Parse response body
  let body: unknown;
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    try {
      body = await response.json();
    } catch {
      body = await response.text();
    }
  } else {
    body = await response.text();
  }

  // Get expected status codes
  const expectedCodes = Object.keys(endpoint.responses)
    .filter((code) => code !== 'default')
    .map((code) => parseInt(code, 10));

  const hasDefaultResponse = 'default' in endpoint.responses;

  // Validate status code
  const statusCheck = validateStatusCode(response.status, expectedCodes, hasDefaultResponse);
  checks.push(statusCheck);

  // Get the schema for this status code
  const statusKey = String(response.status);
  const responseSpec = endpoint.responses[statusKey] || endpoint.responses['default'];

  if (responseSpec?.schema) {
    // Validate required fields
    const requiredChecks = validateRequiredFields(body, responseSpec.schema);
    checks.push(...requiredChecks);

    // Validate full schema
    const schemaChecks = validateResponse(body, responseSpec.schema, response.status);
    checks.push(...schemaChecks);
  } else {
    checks.push({
      name: 'Schema validation',
      passed: true,
      message: `No schema defined for status ${response.status}, skipping body validation`,
    });
  }

  // Determine overall pass/fail
  const passed = checks.every((c) => c.passed);

  // Build response headers record
  const responseHeaders: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    responseHeaders[key] = value;
  });

  return {
    operationId: endpoint.operationId,
    method: endpoint.method,
    path: endpoint.path,
    passed,
    duration: Date.now() - startTime,
    checks,
    request: {
      url: request.url,
      method: request.method,
      headers: request.headers,
      body: request.body ? JSON.parse(request.body) : undefined,
    },
    response: {
      status: response.status,
      headers: responseHeaders,
      body,
    },
  };
}

/**
 * Filter endpoints based on user criteria
 */
function filterEndpoints(endpoints: EndpointSpec[], filter?: string[]): EndpointSpec[] {
  if (!filter || filter.length === 0) {
    return endpoints;
  }

  return endpoints.filter((endpoint) => {
    for (const f of filter) {
      // Match by operationId
      if (endpoint.operationId === f) return true;
      // Match by path
      if (endpoint.path === f) return true;
      // Match by method + path (e.g., "GET /health")
      if (`${endpoint.method} ${endpoint.path}` === f.toUpperCase()) return true;
      // Match by glob pattern on path
      if (f.includes('*') && matchGlob(endpoint.path, f)) return true;
    }
    return false;
  });
}

/**
 * Simple glob matching for paths
 */
function matchGlob(path: string, pattern: string): boolean {
  const regex = pattern.replace(/\*/g, '.*').replace(/\?/g, '.');
  return new RegExp(`^${regex}$`).test(path);
}

/**
 * Sleep for a number of milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
