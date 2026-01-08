/**
 * Request Builder
 *
 * Generates HTTP requests from OpenAPI/OMG specifications
 */

import type { ParsedApi, ParsedEndpoint, OmgSchema, OmgObject } from 'omg-parser';
import type {
  AuthConfig,
  EnvConfig,
  RequestBuilderConfig,
  BuiltRequest,
  HttpRequest,
} from './types.js';

/**
 * Create a request builder for an API specification
 */
export function createRequestBuilder(api: ParsedApi, config: RequestBuilderConfig) {
  return {
    /**
     * Build requests for all endpoints in the API
     */
    buildAll(options?: { endpoints?: string[]; skip?: string[] }): BuiltRequest[] {
      const { endpoints, skip } = options || {};
      return api.endpoints
        .filter((endpoint) => {
          // Filter by operationId if specified
          if (endpoints && endpoints.length > 0) {
            return endpoints.includes(endpoint.operationId);
          }
          return true;
        })
        .filter((endpoint) => {
          // Skip specific endpoints
          if (skip && skip.length > 0) {
            return !skip.includes(endpoint.operationId);
          }
          return true;
        })
        .map((endpoint) => buildRequest(endpoint, config));
    },

    /**
     * Build a request for a specific endpoint
     */
    build(endpoint: ParsedEndpoint): BuiltRequest {
      return buildRequest(endpoint, config);
    },
  };
}

/**
 * Build an HTTP request for a specific endpoint
 */
function buildRequest(endpoint: ParsedEndpoint, config: RequestBuilderConfig): BuiltRequest {
  const { baseUrl, auth, env = {}, headers: customHeaders = {}, timeout } = config;

  // Build the URL with path parameters
  let url = buildUrl(baseUrl, endpoint.path, endpoint.parameters.path, env);

  // Add query parameters
  const queryString = buildQueryString(endpoint.parameters.query, env);
  if (queryString) {
    url += `?${queryString}`;
  }

  // Build headers
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...customHeaders,
  };

  // Add endpoint-specific headers from schema
  if (endpoint.parameters.headers) {
    const headerValues = extractHeaderValues(endpoint.parameters.headers, env);
    Object.assign(headers, headerValues);
  }

  // Add authentication
  applyAuth(headers, auth, url);

  // Build request body for POST/PUT/PATCH
  let body: unknown = undefined;
  if (endpoint.requestBody && ['POST', 'PUT', 'PATCH'].includes(endpoint.method)) {
    body = generateRequestBody(endpoint.requestBody, env);
    headers['Content-Type'] = 'application/json';
  }

  // Get expected status codes from responses
  const expectedStatusCodes = Object.keys(endpoint.responses)
    .map(Number)
    .filter((code) => !isNaN(code))
    .sort((a, b) => a - b);

  // Check if we have required path parameters that are missing
  const missingParams = findMissingPathParams(endpoint.path, env);
  if (missingParams.length > 0) {
    return {
      endpoint,
      request: { url, method: endpoint.method, headers, body, timeout },
      expectedStatusCodes,
      skipped: true,
      skipReason: `Missing required path parameters: ${missingParams.join(', ')}. Provide values in --env file.`,
    };
  }

  return {
    endpoint,
    request: { url, method: endpoint.method, headers, body, timeout },
    expectedStatusCodes,
  };
}

/**
 * Build the full URL with path parameters substituted
 */
function buildUrl(
  baseUrl: string,
  path: string,
  pathSchema: OmgSchema | null,
  env: EnvConfig
): string {
  // Remove trailing slash from base URL
  const base = baseUrl.replace(/\/$/, '');

  // Substitute path parameters
  let resolvedPath = path;
  const pathParamRegex = /\{(\w+)\}/g;
  let match;

  while ((match = pathParamRegex.exec(path)) !== null) {
    const paramName = match[1];
    const value = env[paramName] || generatePathParamValue(paramName, pathSchema);
    resolvedPath = resolvedPath.replace(`{${paramName}}`, encodeURIComponent(value));
  }

  return base + resolvedPath;
}

/**
 * Find path parameters that are missing from env
 */
function findMissingPathParams(path: string, env: EnvConfig): string[] {
  const missing: string[] = [];
  const pathParamRegex = /\{(\w+)\}/g;
  let match;

  while ((match = pathParamRegex.exec(path)) !== null) {
    const paramName = match[1];
    if (!(paramName in env)) {
      missing.push(paramName);
    }
  }

  return missing;
}

/**
 * Generate a placeholder value for a path parameter
 */
function generatePathParamValue(paramName: string, pathSchema: OmgSchema | null): string {
  // Try to get hints from the schema
  if (pathSchema && pathSchema.kind === 'object') {
    const prop = pathSchema.properties[paramName];
    if (prop) {
      // Check for example value
      if (prop.example !== undefined) {
        return String(prop.example);
      }
      // Generate based on type
      if (prop.kind === 'primitive') {
        switch (prop.type) {
          case 'uuid':
            return '00000000-0000-0000-0000-000000000000';
          case 'integer':
          case 'number':
            return '1';
          default:
            return 'test';
        }
      }
    }
  }

  // Default placeholders based on common naming conventions
  if (paramName.toLowerCase().includes('id')) {
    return '1';
  }
  if (paramName.toLowerCase().includes('uuid')) {
    return '00000000-0000-0000-0000-000000000000';
  }

  return 'test';
}

/**
 * Build query string from query parameter schema
 */
function buildQueryString(querySchema: OmgSchema | null, env: EnvConfig): string {
  if (!querySchema || querySchema.kind !== 'object') {
    return '';
  }

  const params: string[] = [];

  for (const [name, prop] of Object.entries(querySchema.properties)) {
    // Check if value is provided in env
    if (env[name] !== undefined) {
      params.push(`${encodeURIComponent(name)}=${encodeURIComponent(env[name])}`);
      continue;
    }

    // Only include required parameters in the test request
    if (!prop.optional) {
      const value = generateQueryParamValue(name, prop);
      if (value !== undefined) {
        params.push(`${encodeURIComponent(name)}=${encodeURIComponent(String(value))}`);
      }
    }
  }

  return params.join('&');
}

/**
 * Generate a value for a query parameter
 */
function generateQueryParamValue(name: string, schema: OmgSchema): unknown {
  // Check for example value
  if (schema.example !== undefined) {
    return schema.example;
  }

  if (schema.kind === 'primitive') {
    switch (schema.type) {
      case 'string':
        return 'test';
      case 'integer':
      case 'number':
        return 1;
      case 'boolean':
        return true;
      case 'date':
        return new Date().toISOString().split('T')[0];
      case 'datetime':
        return new Date().toISOString();
      default:
        return 'test';
    }
  }

  if (schema.kind === 'enum' && schema.values.length > 0) {
    return schema.values[0];
  }

  return undefined;
}

/**
 * Extract header values from header schema
 */
function extractHeaderValues(
  headerSchema: OmgSchema | null,
  env: EnvConfig
): Record<string, string> {
  const headers: Record<string, string> = {};

  if (!headerSchema || headerSchema.kind !== 'object') {
    return headers;
  }

  for (const [name, prop] of Object.entries(headerSchema.properties)) {
    // Check if value is provided in env
    if (env[name] !== undefined) {
      headers[name] = env[name];
      continue;
    }

    // Only include required headers
    if (!prop.optional && prop.example !== undefined) {
      headers[name] = String(prop.example);
    }
  }

  return headers;
}

/**
 * Apply authentication to request headers
 */
function applyAuth(
  headers: Record<string, string>,
  auth: AuthConfig | undefined,
  url: string
): void {
  if (!auth || auth.type === 'none') {
    return;
  }

  switch (auth.type) {
    case 'bearer':
      headers['Authorization'] = `Bearer ${auth.token}`;
      break;

    case 'basic': {
      const credentials = Buffer.from(`${auth.username}:${auth.password}`).toString('base64');
      headers['Authorization'] = `Basic ${credentials}`;
      break;
    }

    case 'header':
      headers[auth.name] = auth.value;
      break;

    case 'apikey':
      if (auth.in === 'header') {
        headers[auth.key] = auth.value;
      }
      // Query parameter API keys are handled separately
      break;
  }
}

/**
 * Generate a request body from the request body schema
 */
function generateRequestBody(schema: OmgSchema, env: EnvConfig): unknown {
  return generateValue(schema, env);
}

/**
 * Generate a value for a schema
 */
function generateValue(schema: OmgSchema, env: EnvConfig): unknown {
  // Check for example value first
  if (schema.example !== undefined) {
    return schema.example;
  }

  switch (schema.kind) {
    case 'primitive':
      return generatePrimitiveValue(schema.type);

    case 'object': {
      const obj: Record<string, unknown> = {};
      for (const [name, prop] of Object.entries(schema.properties)) {
        // Skip optional fields without examples
        if (prop.optional && prop.example === undefined) {
          continue;
        }
        // Use env value if available
        if (env[name] !== undefined) {
          obj[name] = parseEnvValue(env[name], prop);
        } else {
          obj[name] = generateValue(prop, env);
        }
      }
      return obj;
    }

    case 'array':
      return [generateValue(schema.items, env)];

    case 'enum':
      return schema.values[0];

    case 'union':
      // Use the first type in the union
      return schema.types.length > 0 ? generateValue(schema.types[0], env) : null;

    case 'intersection': {
      // Merge all object types
      const merged: Record<string, unknown> = {};
      for (const type of schema.types) {
        const value = generateValue(type, env);
        if (typeof value === 'object' && value !== null) {
          Object.assign(merged, value);
        }
      }
      return merged;
    }

    case 'reference':
      // References should be resolved by the parser, but return a placeholder
      return {};

    default:
      return null;
  }
}

/**
 * Generate a primitive value
 */
function generatePrimitiveValue(
  type:
    | 'string'
    | 'number'
    | 'integer'
    | 'boolean'
    | 'decimal'
    | 'date'
    | 'datetime'
    | 'uuid'
    | 'any'
): unknown {
  switch (type) {
    case 'string':
      return 'test';
    case 'number':
    case 'decimal':
      return 1.0;
    case 'integer':
      return 1;
    case 'boolean':
      return true;
    case 'date':
      return new Date().toISOString().split('T')[0];
    case 'datetime':
      return new Date().toISOString();
    case 'uuid':
      return '00000000-0000-0000-0000-000000000000';
    case 'any':
      return {};
    default:
      return null;
  }
}

/**
 * Parse an environment value based on the expected type
 */
function parseEnvValue(value: string, schema: OmgSchema): unknown {
  if (schema.kind === 'primitive') {
    switch (schema.type) {
      case 'integer':
        return parseInt(value, 10);
      case 'number':
      case 'decimal':
        return parseFloat(value);
      case 'boolean':
        return value.toLowerCase() === 'true';
      default:
        return value;
    }
  }

  // Try to parse as JSON for complex types
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

/**
 * Execute an HTTP request with retry logic
 */
export async function executeRequest(
  request: HttpRequest,
  options: { retries?: number; retryDelay?: number } = {}
): Promise<{
  statusCode: number;
  headers: Record<string, string>;
  body: unknown;
  duration: number;
}> {
  const { retries = 3, retryDelay = 1000 } = options;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) {
      // Exponential backoff
      const delay = retryDelay * Math.pow(2, attempt - 1);
      await sleep(delay);
    }

    try {
      const startTime = Date.now();

      const controller = new AbortController();
      const timeoutId = request.timeout
        ? setTimeout(() => controller.abort(), request.timeout)
        : undefined;

      try {
        const response = await fetch(request.url, {
          method: request.method,
          headers: request.headers,
          body: request.body ? JSON.stringify(request.body) : undefined,
          signal: controller.signal,
        });

        const duration = Date.now() - startTime;

        // Parse response body
        let body: unknown;
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          body = await response.json();
        } else {
          const text = await response.text();
          // Try to parse as JSON anyway
          try {
            body = JSON.parse(text);
          } catch {
            body = text;
          }
        }

        // Convert headers to plain object
        const headers: Record<string, string> = {};
        response.headers.forEach((value, key) => {
          headers[key] = value;
        });

        return {
          statusCode: response.status,
          headers,
          body,
          duration,
        };
      } finally {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry on abort (timeout)
      if (lastError.name === 'AbortError') {
        throw new Error(`Request timed out after ${request.timeout}ms`);
      }

      // Only retry on network errors
      if (attempt === retries) {
        throw lastError;
      }
    }
  }

  throw lastError || new Error('Request failed');
}

/**
 * Sleep for a specified duration
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
