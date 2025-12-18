/**
 * OMG AST Types
 */

// HTTP Methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

// Webhook metadata for endpoints
export interface EndpointWebhooks {
  /** Webhooks that may be fired in response to this endpoint */
  resulting?: string[];
  /** Webhooks to listen to for updates from this endpoint's operation */
  listen?: string[];
}

// Front matter for endpoint files
export interface EndpointFrontMatter {
  method: HttpMethod;
  path: string;
  operationId?: string;
  tags?: string[];
  deprecated?: boolean;
  auth?: 'bearer' | 'apikey' | 'none' | string;
  summary?: string;
  /** List of operationIds that should be called before this endpoint */
  follows?: string[];
  /** Webhook metadata for this endpoint */
  webhooks?: EndpointWebhooks;
}

// Front matter for API root
export interface ApiFrontMatter {
  name: string;
  version: string;
  baseUrl?: string;
  auth?: string;
  contact?: {
    name?: string;
    email?: string;
    url?: string;
  };
}

// Code block types
export type OmgBlockType =
  | 'http'
  | 'omg.path'
  | 'omg.query'
  | 'omg.headers'
  | 'omg.body'
  | 'omg.response'
  | 'omg.returns'
  | 'omg.example'
  | 'omg.type'
  | 'omg.errors'
  | 'omg.config';

// Parsed code block
export interface OmgBlock {
  type: OmgBlockType;
  statusCode?: number; // For omg.response.201, etc.
  content: string;
  parsed?: OmgSchema; // Parsed schema (after OMG parsing)
  parsedResponses?: ParsedReturnsBlock; // For omg.returns blocks
  line: number;
}

/**
 * Single response entry in a returns block
 */
export interface ParsedReturnEntry {
  statusCode: number;
  schema: OmgSchema | null;
  condition?: string;
  description?: string;
}

/**
 * Parsed returns block containing multiple conditional responses
 */
export interface ParsedReturnsBlock {
  responses: ParsedReturnEntry[];
}

// Partial reference
export interface PartialRef {
  path: string;
  line: number;
}

// Parsed document
export interface OmgDocument {
  filePath: string;
  frontMatter: EndpointFrontMatter | ApiFrontMatter | null;
  title: string | null;
  description: string;
  blocks: OmgBlock[];
  partials: PartialRef[];
}

// ============================================
// OMG Schema Types (JSON + annotations)
// ============================================

export type OmgType =
  | OmgPrimitive
  | OmgObject
  | OmgArray
  | OmgEnum
  | OmgUnion
  | OmgIntersection
  | OmgReference;

export interface OmgPrimitive {
  kind: 'primitive';
  type:
    | 'string'
    | 'number'
    | 'integer'
    | 'boolean'
    | 'decimal'
    | 'date'
    | 'datetime'
    | 'uuid'
    | 'any';
  nullable?: boolean;
  optional?: boolean;
  annotations: OmgAnnotation[];
  description?: string;
}

export interface OmgObject {
  kind: 'object';
  properties: Record<string, OmgType>;
  nullable?: boolean;
  optional?: boolean;
  annotations: OmgAnnotation[];
  description?: string;
}

export interface OmgArray {
  kind: 'array';
  items: OmgType;
  nullable?: boolean;
  optional?: boolean;
  annotations: OmgAnnotation[];
  description?: string;
}

export interface OmgEnum {
  kind: 'enum';
  values: (string | number | boolean)[];
  nullable?: boolean;
  optional?: boolean;
  annotations: OmgAnnotation[];
  description?: string;
}

export interface OmgUnion {
  kind: 'union';
  types: OmgType[];
  nullable?: boolean;
  optional?: boolean;
  annotations: OmgAnnotation[];
  description?: string;
}

export interface OmgIntersection {
  kind: 'intersection';
  types: OmgType[];
  nullable?: boolean;
  optional?: boolean;
  annotations: OmgAnnotation[];
  description?: string;
}

export interface OmgReference {
  kind: 'reference';
  name: string;
  nullable?: boolean;
  optional?: boolean;
  annotations: OmgAnnotation[];
  description?: string;
}

export interface OmgAnnotation {
  name: string;
  args: (string | number | boolean)[];
}

export type OmgSchema = OmgType;

// ============================================
// Parse Warnings
// ============================================

/**
 * Warning generated during parsing (non-fatal issues)
 */
export interface ParseWarning {
  message: string;
  line?: number;
  column?: number;
  context?: string;
}

// ============================================
// Parsed API (fully resolved)
// ============================================

/**
 * Parsed response with optional condition and description
 */
export interface ParsedResponse {
  schema: OmgSchema | null;
  condition?: string;
  description?: string;
}

export interface ParsedEndpoint {
  method: HttpMethod;
  path: string;
  operationId: string;
  tags: string[];
  summary: string;
  description: string;
  deprecated: boolean;
  /** List of operationIds that should be called before this endpoint */
  follows: string[];
  /** Webhook metadata for this endpoint */
  webhooks: EndpointWebhooks;
  parameters: {
    path: OmgSchema | null;
    query: OmgSchema | null;
    headers: OmgSchema | null;
  };
  requestBody: OmgSchema | null;
  responses: Record<number, ParsedResponse>;
}

export interface ParsedApi {
  name: string;
  version: string;
  baseUrl: string;
  description: string;
  endpoints: ParsedEndpoint[];
  types: Record<string, OmgSchema>;
}
