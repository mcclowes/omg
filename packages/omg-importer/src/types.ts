/**
 * OpenAPI 3.x Type Definitions (subset needed for import)
 */

export interface OpenAPISpec {
  openapi: string;
  info: OpenAPIInfo;
  servers?: OpenAPIServer[];
  paths?: Record<string, OpenAPIPathItem>;
  components?: OpenAPIComponents;
  tags?: OpenAPITag[];
}

export interface OpenAPIInfo {
  title: string;
  version: string;
  description?: string;
  contact?: {
    name?: string;
    email?: string;
    url?: string;
  };
}

export interface OpenAPIServer {
  url: string;
  description?: string;
}

export interface OpenAPITag {
  name: string;
  description?: string;
}

export interface OpenAPIPathItem {
  get?: OpenAPIOperation;
  post?: OpenAPIOperation;
  put?: OpenAPIOperation;
  patch?: OpenAPIOperation;
  delete?: OpenAPIOperation;
  head?: OpenAPIOperation;
  options?: OpenAPIOperation;
  parameters?: OpenAPIParameter[];
}

export interface OpenAPIOperation {
  operationId?: string;
  summary?: string;
  description?: string;
  tags?: string[];
  deprecated?: boolean;
  parameters?: OpenAPIParameter[];
  requestBody?: OpenAPIRequestBody;
  responses?: Record<string, OpenAPIResponse>;
  security?: OpenAPISecurityRequirement[];
}

export interface OpenAPIParameter {
  name: string;
  in: 'path' | 'query' | 'header' | 'cookie';
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  schema?: OpenAPISchema;
}

export interface OpenAPIRequestBody {
  description?: string;
  required?: boolean;
  content?: Record<string, OpenAPIMediaType>;
}

export interface OpenAPIResponse {
  description?: string;
  content?: Record<string, OpenAPIMediaType>;
  headers?: Record<string, OpenAPIHeader>;
}

export interface OpenAPIMediaType {
  schema?: OpenAPISchema;
  example?: unknown;
  examples?: Record<string, OpenAPIExample>;
}

export interface OpenAPIHeader {
  description?: string;
  required?: boolean;
  schema?: OpenAPISchema;
}

export interface OpenAPIExample {
  summary?: string;
  description?: string;
  value?: unknown;
}

export interface OpenAPISchema {
  type?: string;
  format?: string;
  description?: string;
  nullable?: boolean;
  enum?: (string | number | boolean)[];
  items?: OpenAPISchema;
  properties?: Record<string, OpenAPISchema>;
  additionalProperties?: boolean | OpenAPISchema;
  required?: string[];
  allOf?: OpenAPISchema[];
  oneOf?: OpenAPISchema[];
  anyOf?: OpenAPISchema[];
  $ref?: string;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  default?: unknown;
  example?: unknown;
}

export interface OpenAPIComponents {
  schemas?: Record<string, OpenAPISchema>;
  parameters?: Record<string, OpenAPIParameter>;
  responses?: Record<string, OpenAPIResponse>;
  requestBodies?: Record<string, OpenAPIRequestBody>;
  securitySchemes?: Record<string, OpenAPISecurityScheme>;
}

export interface OpenAPISecurityScheme {
  type: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect';
  description?: string;
  name?: string;
  in?: string;
  scheme?: string;
  bearerFormat?: string;
}

export type OpenAPISecurityRequirement = Record<string, string[]>;

/**
 * Import options
 */
export interface ImportOptions {
  /** Output directory for generated files */
  outputDir: string;
  /** Whether to generate partials for reusable components */
  generatePartials?: boolean;
  /** Whether to include examples from OpenAPI spec */
  includeExamples?: boolean;
  /** Whether to inline $ref schemas or keep as references */
  inlineRefs?: boolean;
}

/**
 * Import result
 */
export interface ImportResult {
  /** Path to generated API root file */
  apiFile: string;
  /** Paths to generated endpoint files */
  endpointFiles: string[];
  /** Paths to generated partial files */
  partialFiles: string[];
  /** Any warnings during import */
  warnings: string[];
}
