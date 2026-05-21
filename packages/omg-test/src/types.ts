/**
 * Contract Testing Types
 */

export interface TestOptions {
  /** Base URL of the API to test */
  baseUrl: string;
  /** Authentication configuration */
  auth?: AuthConfig;
  /** Filter to specific endpoints (operationIds or paths) */
  endpoints?: string[];
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Number of retries on network failure */
  retries?: number;
  /** Verbose output */
  verbose?: boolean;
  /** Environment variables for path/query params */
  env?: Record<string, string>;
  /** Headers to include in all requests */
  headers?: Record<string, string>;
}

export interface AuthConfig {
  type: 'bearer' | 'basic' | 'header';
  value: string;
  /** Header name for 'header' type auth */
  headerName?: string;
}

export interface TestResult {
  operationId: string;
  method: string;
  path: string;
  passed: boolean;
  duration: number;
  checks: CheckResult[];
  error?: string;
  request?: {
    url: string;
    method: string;
    headers: Record<string, string>;
    body?: unknown;
  };
  response?: {
    status: number;
    headers: Record<string, string>;
    body?: unknown;
  };
}

export interface CheckResult {
  name: string;
  passed: boolean;
  message?: string;
  expected?: unknown;
  actual?: unknown;
  path?: string;
}

export interface TestSummary {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  results: TestResult[];
}

export interface EndpointSpec {
  operationId: string;
  method: string;
  path: string;
  summary?: string;
  parameters: ParameterSpec[];
  requestBody?: RequestBodySpec;
  responses: Record<string, ResponseSpec>;
}

export interface ParameterSpec {
  name: string;
  in: 'path' | 'query' | 'header';
  required: boolean;
  schema: SchemaSpec;
  example?: unknown;
}

export interface RequestBodySpec {
  required: boolean;
  schema: SchemaSpec;
  example?: unknown;
}

export interface ResponseSpec {
  description: string;
  schema?: SchemaSpec;
}

export interface SchemaSpec {
  // OpenAPI/JSON Schema object
  [key: string]: unknown;
}

export type ReportFormat = 'console' | 'json' | 'junit';
