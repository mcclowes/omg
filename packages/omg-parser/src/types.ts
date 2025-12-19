/**
 * OMG AST Types
 */

// HTTP Methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

// ============================================
// OpenAPI Preservation Types
// ============================================

/** Server definition with variables */
export interface OmgServer {
  url: string;
  description?: string;
  variables?: Record<string, OmgServerVariable>;
}

export interface OmgServerVariable {
  default: string;
  enum?: string[];
  description?: string;
}

/** Security scheme definition */
export interface OmgSecurityScheme {
  type: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect';
  description?: string;
  name?: string;
  in?: 'query' | 'header' | 'cookie';
  scheme?: string;
  bearerFormat?: string;
  flows?: OmgOAuthFlows;
  openIdConnectUrl?: string;
}

export interface OmgOAuthFlows {
  implicit?: OmgOAuthFlow;
  password?: OmgOAuthFlow;
  clientCredentials?: OmgOAuthFlow;
  authorizationCode?: OmgOAuthFlow;
}

export interface OmgOAuthFlow {
  authorizationUrl?: string;
  tokenUrl?: string;
  refreshUrl?: string;
  scopes: Record<string, string>;
}

/** Security requirement (map of scheme name to scopes) */
export type OmgSecurityRequirement = Record<string, string[]>;

/** External documentation link */
export interface OmgExternalDocs {
  url: string;
  description?: string;
}

/** Example object */
export interface OmgExample {
  summary?: string;
  description?: string;
  value?: unknown;
  externalValue?: string;
}

/** Header definition */
export interface OmgHeader {
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  schema?: OmgSchema;
  example?: unknown;
  examples?: Record<string, OmgExample>;
}

/** Tag with description */
export interface OmgTag {
  name: string;
  description?: string;
  externalDocs?: OmgExternalDocs;
}

/** License information */
export interface OmgLicense {
  name: string;
  url?: string;
  identifier?: string;
}

/** Link object for response linking */
export interface OmgLink {
  operationRef?: string;
  operationId?: string;
  parameters?: Record<string, unknown>;
  requestBody?: unknown;
  description?: string;
  server?: OmgServer;
}

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
  /**
   * Expand this endpoint into multiple variants based on @when conditions.
   * The value is the field name used in @when(field = "value") conditions.
   * Each variant generates a separate path with #value suffix.
   */
  expandVariants?: string;
  /** Operation-level security requirements */
  security?: OmgSecurityRequirement[];
  /** External documentation */
  externalDocs?: OmgExternalDocs;
  /** Operation-level server overrides */
  servers?: OmgServer[];
  /** Vendor extensions (x-*) passthrough */
  extensions?: Record<string, unknown>;
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
  /** All server definitions */
  servers?: OmgServer[];
  /** Global security requirements */
  security?: OmgSecurityRequirement[];
  /** Security scheme definitions */
  securitySchemes?: Record<string, OmgSecurityScheme>;
  /** License information */
  license?: OmgLicense;
  /** Terms of service URL */
  termsOfService?: string;
  /** External documentation */
  externalDocs?: OmgExternalDocs;
  /** Tag definitions with descriptions */
  tags?: OmgTag[];
  /** Vendor extensions (x-*) passthrough */
  extensions?: Record<string, unknown>;
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

/**
 * Parsed @when condition for variant expansion
 * e.g., @when(petType = "cat") becomes { field: "petType", value: "cat" }
 */
export interface WhenCondition {
  field: string;
  value: string;
}

// Parsed code block
export interface OmgBlock {
  type: OmgBlockType;
  statusCode?: number; // For omg.response.201, etc.
  content: string;
  parsed?: OmgSchema; // Parsed schema (after OMG parsing)
  parsedResponses?: ParsedReturnsBlock; // For omg.returns blocks
  /** Full response metadata for omg.response blocks */
  parsedResponse?: ParsedResponse;
  line: number;
  /** @when condition for variant expansion */
  whenCondition?: WhenCondition;
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

/** Common metadata fields for all OmgType variants */
export interface OmgTypeMetadata {
  nullable?: boolean;
  optional?: boolean;
  annotations: OmgAnnotation[];
  description?: string;
  /** Example value */
  example?: unknown;
  /** Named examples */
  examples?: Record<string, OmgExample>;
  /** Read-only field */
  readOnly?: boolean;
  /** Write-only field */
  writeOnly?: boolean;
  /** Deprecated field */
  deprecated?: boolean;
  /** Schema title */
  title?: string;
  /** Vendor extensions (x-*) passthrough */
  extensions?: Record<string, unknown>;
}

export interface OmgPrimitive extends OmgTypeMetadata {
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
}

export interface OmgObject extends OmgTypeMetadata {
  kind: 'object';
  properties: Record<string, OmgType>;
}

export interface OmgArray extends OmgTypeMetadata {
  kind: 'array';
  items: OmgType;
}

export interface OmgEnum extends OmgTypeMetadata {
  kind: 'enum';
  values: (string | number | boolean)[];
}

export interface OmgUnion extends OmgTypeMetadata {
  kind: 'union';
  types: OmgType[];
}

export interface OmgIntersection extends OmgTypeMetadata {
  kind: 'intersection';
  types: OmgType[];
}

export interface OmgReference extends OmgTypeMetadata {
  kind: 'reference';
  name: string;
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
  /** Response headers */
  headers?: Record<string, OmgHeader>;
  /** Response links */
  links?: Record<string, OmgLink>;
  /** Example value */
  example?: unknown;
  /** Named examples */
  examples?: Record<string, OmgExample>;
  /** Vendor extensions (x-*) passthrough */
  extensions?: Record<string, unknown>;
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
  /** Operation-level security requirements */
  security?: OmgSecurityRequirement[];
  /** External documentation */
  externalDocs?: OmgExternalDocs;
  /** Operation-level server overrides */
  servers?: OmgServer[];
  /** Vendor extensions (x-*) passthrough */
  extensions?: Record<string, unknown>;
}

export interface ParsedApi {
  name: string;
  version: string;
  baseUrl: string;
  description: string;
  endpoints: ParsedEndpoint[];
  types: Record<string, OmgSchema>;
  /** All server definitions */
  servers?: OmgServer[];
  /** Global security requirements */
  security?: OmgSecurityRequirement[];
  /** Security scheme definitions */
  securitySchemes?: Record<string, OmgSecurityScheme>;
  /** License information */
  license?: OmgLicense;
  /** Terms of service URL */
  termsOfService?: string;
  /** External documentation */
  externalDocs?: OmgExternalDocs;
  /** Tag definitions with descriptions */
  tags?: OmgTag[];
  /** Contact information */
  contact?: {
    name?: string;
    email?: string;
    url?: string;
  };
  /** Vendor extensions (x-*) passthrough */
  extensions?: Record<string, unknown>;
}
