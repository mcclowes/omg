/**
 * OpenAPI 3.x Types for Import
 *
 * Simplified type definitions for parsing OpenAPI specifications.
 */

export interface OpenApiSpec {
  openapi: string;
  info: InfoObject;
  servers?: ServerObject[];
  paths?: Record<string, PathItemObject>;
  components?: ComponentsObject;
  tags?: TagObject[];
}

export interface InfoObject {
  title: string;
  version: string;
  description?: string;
  termsOfService?: string;
  contact?: ContactObject;
  license?: LicenseObject;
}

export interface ContactObject {
  name?: string;
  url?: string;
  email?: string;
}

export interface LicenseObject {
  name: string;
  url?: string;
}

export interface ServerObject {
  url: string;
  description?: string;
  variables?: Record<string, ServerVariableObject>;
}

export interface ServerVariableObject {
  default: string;
  description?: string;
  enum?: string[];
}

export interface TagObject {
  name: string;
  description?: string;
  externalDocs?: ExternalDocObject;
}

export interface ExternalDocObject {
  url: string;
  description?: string;
}

export interface PathItemObject {
  $ref?: string;
  summary?: string;
  description?: string;
  get?: OperationObject;
  put?: OperationObject;
  post?: OperationObject;
  delete?: OperationObject;
  options?: OperationObject;
  head?: OperationObject;
  patch?: OperationObject;
  trace?: OperationObject;
  servers?: ServerObject[];
  parameters?: (ParameterObject | ReferenceObject)[];
}

export interface OperationObject {
  operationId?: string;
  summary?: string;
  description?: string;
  tags?: string[];
  deprecated?: boolean;
  parameters?: (ParameterObject | ReferenceObject)[];
  requestBody?: RequestBodyObject | ReferenceObject;
  responses?: Record<string, ResponseObject | ReferenceObject>;
  security?: SecurityRequirementObject[];
  servers?: ServerObject[];
  'x-follows'?: string[];
  'x-webhooks-resulting'?: string[];
  'x-webhooks-listen'?: string[];
}

export interface ParameterObject {
  name: string;
  in: 'query' | 'header' | 'path' | 'cookie';
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  schema?: SchemaObject | ReferenceObject;
  style?: string;
  explode?: boolean;
  example?: unknown;
  examples?: Record<string, ExampleObject | ReferenceObject>;
}

export interface RequestBodyObject {
  description?: string;
  required?: boolean;
  content: Record<string, MediaTypeObject>;
}

export interface ResponseObject {
  description: string;
  headers?: Record<string, HeaderObject | ReferenceObject>;
  content?: Record<string, MediaTypeObject>;
  links?: Record<string, LinkObject | ReferenceObject>;
}

export interface MediaTypeObject {
  schema?: SchemaObject | ReferenceObject;
  example?: unknown;
  examples?: Record<string, ExampleObject | ReferenceObject>;
  encoding?: Record<string, EncodingObject>;
}

export interface SchemaObject {
  // Type
  type?: string | string[];
  format?: string;

  // Metadata
  title?: string;
  description?: string;
  default?: unknown;
  deprecated?: boolean;
  readOnly?: boolean;
  writeOnly?: boolean;
  example?: unknown;
  examples?: unknown[];

  // Composition
  allOf?: (SchemaObject | ReferenceObject)[];
  oneOf?: (SchemaObject | ReferenceObject)[];
  anyOf?: (SchemaObject | ReferenceObject)[];
  not?: SchemaObject | ReferenceObject;

  // Object
  properties?: Record<string, SchemaObject | ReferenceObject>;
  additionalProperties?: boolean | SchemaObject | ReferenceObject;
  required?: string[];
  minProperties?: number;
  maxProperties?: number;

  // Array
  items?: SchemaObject | ReferenceObject;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;

  // String
  minLength?: number;
  maxLength?: number;
  pattern?: string;

  // Number
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number | boolean;
  exclusiveMaximum?: number | boolean;
  multipleOf?: number;

  // Enum
  enum?: (string | number | boolean | null)[];
  const?: unknown;

  // Nullable (OpenAPI 3.0)
  nullable?: boolean;

  // Reference (inline for convenience)
  $ref?: string;

  // Discriminator
  discriminator?: DiscriminatorObject;
}

export interface DiscriminatorObject {
  propertyName: string;
  mapping?: Record<string, string>;
}

export interface ReferenceObject {
  $ref: string;
  summary?: string;
  description?: string;
}

export interface ExampleObject {
  summary?: string;
  description?: string;
  value?: unknown;
  externalValue?: string;
}

export interface HeaderObject {
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  schema?: SchemaObject | ReferenceObject;
}

export interface LinkObject {
  operationRef?: string;
  operationId?: string;
  parameters?: Record<string, unknown>;
  requestBody?: unknown;
  description?: string;
  server?: ServerObject;
}

export interface EncodingObject {
  contentType?: string;
  headers?: Record<string, HeaderObject | ReferenceObject>;
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
}

export interface SecurityRequirementObject {
  [name: string]: string[];
}

export interface ComponentsObject {
  schemas?: Record<string, SchemaObject | ReferenceObject>;
  responses?: Record<string, ResponseObject | ReferenceObject>;
  parameters?: Record<string, ParameterObject | ReferenceObject>;
  examples?: Record<string, ExampleObject | ReferenceObject>;
  requestBodies?: Record<string, RequestBodyObject | ReferenceObject>;
  headers?: Record<string, HeaderObject | ReferenceObject>;
  securitySchemes?: Record<string, SecuritySchemeObject | ReferenceObject>;
  links?: Record<string, LinkObject | ReferenceObject>;
  callbacks?: Record<string, CallbackObject | ReferenceObject>;
}

export interface SecuritySchemeObject {
  type: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect';
  description?: string;
  name?: string;
  in?: 'query' | 'header' | 'cookie';
  scheme?: string;
  bearerFormat?: string;
  flows?: OAuthFlowsObject;
  openIdConnectUrl?: string;
}

export interface OAuthFlowsObject {
  implicit?: OAuthFlowObject;
  password?: OAuthFlowObject;
  clientCredentials?: OAuthFlowObject;
  authorizationCode?: OAuthFlowObject;
}

export interface OAuthFlowObject {
  authorizationUrl?: string;
  tokenUrl?: string;
  refreshUrl?: string;
  scopes: Record<string, string>;
}

export interface CallbackObject {
  [expression: string]: PathItemObject | ReferenceObject;
}

/**
 * Type guard to check if an object is a ReferenceObject
 */
export function isReferenceObject(obj: unknown): obj is ReferenceObject {
  return typeof obj === 'object' && obj !== null && '$ref' in obj;
}
