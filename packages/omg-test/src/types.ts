/**
 * OMG Test Types
 *
 * Type definitions for contract testing against live APIs
 */

import type { ParsedEndpoint, ParsedApi } from 'omg-parser';

/**
 * Authentication configuration
 */
export type AuthConfig =
  | { type: 'bearer'; token: string }
  | { type: 'basic'; username: string; password: string }
  | { type: 'header'; name: string; value: string }
  | { type: 'apikey'; key: string; value: string; in: 'header' | 'query' }
  | { type: 'none' };

/**
 * Environment variables for path/query parameters
 */
export type EnvConfig = Record<string, string>;

/**
 * Options for the test runner
 */
export interface TestRunnerOptions {
  /** Base URL of the API to test against */
  baseUrl: string;
  /** Authentication configuration */
  auth?: AuthConfig;
  /** Environment variables for parameter substitution */
  env?: EnvConfig;
  /** Timeout for each request in milliseconds */
  timeout?: number;
  /** Number of retries on network failures */
  retries?: number;
  /** Delay between retries in milliseconds (exponential backoff applied) */
  retryDelay?: number;
  /** Filter to specific endpoint operationIds */
  endpoints?: string[];
  /** Skip specific endpoint operationIds */
  skip?: string[];
  /** Stop on first failure */
  bail?: boolean;
  /** Enable verbose output */
  verbose?: boolean;
  /** Custom headers to include in all requests */
  headers?: Record<string, string>;
}

/**
 * Result of validating a single response
 */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/**
 * Individual validation error
 */
export interface ValidationError {
  path: string;
  message: string;
  keyword?: string;
  expected?: unknown;
  actual?: unknown;
}

/**
 * Status of a single test
 */
export type TestStatus = 'passed' | 'failed' | 'skipped' | 'error';

/**
 * Result of testing a single endpoint
 */
export interface EndpointTestResult {
  /** The endpoint that was tested */
  endpoint: {
    method: string;
    path: string;
    operationId: string;
  };
  /** Test status */
  status: TestStatus;
  /** Duration in milliseconds */
  duration: number;
  /** HTTP status code received */
  statusCode?: number;
  /** Expected status codes */
  expectedStatusCodes: number[];
  /** Response validation result */
  validation?: ValidationResult;
  /** Request details (for debugging) */
  request?: {
    url: string;
    method: string;
    headers: Record<string, string>;
    body?: unknown;
  };
  /** Response details (for debugging) */
  response?: {
    statusCode: number;
    headers: Record<string, string>;
    body: unknown;
  };
  /** Error message if test errored */
  error?: string;
  /** Skip reason if skipped */
  skipReason?: string;
}

/**
 * Result of running all tests
 */
export interface TestSuiteResult {
  /** API name */
  apiName: string;
  /** API version */
  apiVersion: string;
  /** Base URL tested against */
  baseUrl: string;
  /** Total duration in milliseconds */
  duration: number;
  /** Timestamp when tests started */
  startedAt: Date;
  /** Timestamp when tests finished */
  finishedAt: Date;
  /** Summary statistics */
  summary: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
    errors: number;
  };
  /** Individual endpoint results */
  results: EndpointTestResult[];
}

/**
 * Reporter output format
 */
export type ReportFormat = 'console' | 'json' | 'junit';

/**
 * Reporter options
 */
export interface ReporterOptions {
  /** Output format */
  format: ReportFormat;
  /** Output file path (stdout if not specified) */
  outputPath?: string;
  /** Enable colors (for console format) */
  colors?: boolean;
  /** Verbose output */
  verbose?: boolean;
}

/**
 * HTTP request configuration
 */
export interface HttpRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: unknown;
  timeout?: number;
}

/**
 * HTTP response
 */
export interface HttpResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: unknown;
  duration: number;
}

/**
 * Request builder configuration
 */
export interface RequestBuilderConfig {
  /** Base URL of the API */
  baseUrl: string;
  /** Authentication configuration */
  auth?: AuthConfig;
  /** Environment variables for parameter substitution */
  env?: EnvConfig;
  /** Custom headers */
  headers?: Record<string, string>;
  /** Request timeout in milliseconds */
  timeout?: number;
}

/**
 * Built request ready to execute
 */
export interface BuiltRequest {
  /** The endpoint being tested */
  endpoint: ParsedEndpoint;
  /** The HTTP request to execute */
  request: HttpRequest;
  /** Expected status codes from the spec */
  expectedStatusCodes: number[];
  /** Whether this request was skipped */
  skipped?: boolean;
  /** Reason for skipping */
  skipReason?: string;
}
