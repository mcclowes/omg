/**
 * OpenAPI 3.1 Compiler
 *
 * Transforms parsed OMG into OpenAPI 3.1 specification.
 *
 * Features:
 * - Extracts deeply nested objects to components/schemas for legibility
 * - Supports recursive/self-referencing types
 * - Generates meaningful schema names from context
 */

import type {
  ParsedApi,
  ParsedEndpoint,
  ParsedResponse,
  OmgSchema,
  OmgType,
  OmgPrimitive,
  OmgObject,
  OmgArray,
  OmgEnum,
  OmgUnion,
  OmgIntersection,
  OmgReference,
  OmgAnnotation,
  OmgServer,
  OmgSecurityScheme,
  OmgSecurityRequirement,
  OmgExternalDocs,
  OmgTag,
  OmgHeader,
  OmgExample,
  OmgLink,
  OmgLicense,
} from 'omg-parser';

// OpenAPI 3.1 Types (extended for full preservation)
export interface OpenApiSpec {
  openapi: '3.1.0';
  info: {
    title: string;
    version: string;
    description?: string;
    termsOfService?: string;
    contact?: {
      name?: string;
      email?: string;
      url?: string;
    };
    license?: {
      name: string;
      url?: string;
      identifier?: string;
    };
  };
  servers?: OmgServer[];
  paths: Record<string, PathItem>;
  security?: OmgSecurityRequirement[];
  tags?: OmgTag[];
  externalDocs?: OmgExternalDocs;
  components?: {
    schemas?: Record<string, SchemaObject>;
    parameters?: Record<string, ParameterObject>;
    responses?: Record<string, ResponseObject>;
    securitySchemes?: Record<string, OmgSecurityScheme>;
  };
  // Allow vendor extensions passthrough
  [key: string]: unknown;
}

interface PathItem {
  get?: OperationObject;
  post?: OperationObject;
  put?: OperationObject;
  patch?: OperationObject;
  delete?: OperationObject;
  head?: OperationObject;
  options?: OperationObject;
}

interface OperationObject {
  operationId: string;
  summary?: string;
  description?: string;
  tags?: string[];
  deprecated?: boolean;
  parameters?: ParameterObject[];
  requestBody?: RequestBodyObject;
  responses: Record<string, ResponseObject>;
  security?: OmgSecurityRequirement[];
  servers?: OmgServer[];
  externalDocs?: OmgExternalDocs;
  /** List of operationIds that should be called before this endpoint */
  'x-follows'?: string[];
  /** Webhooks that may be fired in response to this endpoint */
  'x-webhooks-resulting'?: string[];
  /** Webhooks to listen to for updates from this endpoint's operation */
  'x-webhooks-listen'?: string[];
  // Allow vendor extensions passthrough
  [key: string]: unknown;
}

interface ParameterObject {
  name: string;
  in: 'path' | 'query' | 'header';
  required?: boolean;
  description?: string;
  schema: SchemaObject;
}

interface RequestBodyObject {
  required?: boolean;
  content: Record<string, MediaTypeObject>;
}

interface ResponseObject {
  description: string;
  content?: Record<string, MediaTypeObject>;
  headers?: Record<string, HeaderObject>;
  links?: Record<string, LinkObject>;
  // Allow vendor extensions passthrough
  [key: string]: unknown;
}

interface HeaderObject {
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  schema?: SchemaObject;
}

interface LinkObject {
  operationRef?: string;
  operationId?: string;
  parameters?: Record<string, unknown>;
  requestBody?: unknown;
  description?: string;
  server?: OmgServer;
}

interface MediaTypeObject {
  schema: SchemaObject;
  example?: unknown;
  examples?: Record<string, ExampleObject>;
}

interface ExampleObject {
  summary?: string;
  description?: string;
  value?: unknown;
  externalValue?: string;
}

interface SchemaObject {
  type?: string;
  format?: string;
  description?: string;
  title?: string;
  properties?: Record<string, SchemaObject>;
  items?: SchemaObject;
  required?: string[];
  enum?: (string | number | boolean)[];
  oneOf?: SchemaObject[];
  allOf?: SchemaObject[];
  nullable?: boolean;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  minItems?: number;
  maxItems?: number;
  pattern?: string;
  default?: unknown;
  $ref?: string;
  // Metadata for round-trip preservation
  example?: unknown;
  readOnly?: boolean;
  writeOnly?: boolean;
  deprecated?: boolean;
  // Allow vendor extensions passthrough
  [key: string]: unknown;
}

/**
 * Configuration for schema extraction behavior
 */
interface CompilerConfig {
  /** Maximum nesting depth before extracting to $ref (default: 2) */
  maxInlineDepth: number;
  /** Minimum properties for extraction at depth threshold (default: 2) */
  minPropertiesForExtraction: number;
}

const DEFAULT_CONFIG: CompilerConfig = {
  maxInlineDepth: 2,
  minPropertiesForExtraction: 2,
};

/**
 * Compilation context for tracking extracted schemas and recursion
 */
interface CompilerContext {
  /** Extracted schemas to add to components */
  extractedSchemas: Record<string, SchemaObject>;
  /** Current path for generating meaningful names */
  path: string[];
  /** Current nesting depth */
  depth: number;
  /** Set of type signatures being compiled (for recursion detection) */
  compilingTypes: Set<string>;
  /** Map of type signatures to their schema names (for recursion) */
  typeToSchemaName: Map<string, string>;
  /** Configuration */
  config: CompilerConfig;
}

/**
 * Create a fresh compiler context
 */
function createContext(config: Partial<CompilerConfig> = {}): CompilerContext {
  return {
    extractedSchemas: {},
    path: [],
    depth: 0,
    compilingTypes: new Set(),
    typeToSchemaName: new Map(),
    config: { ...DEFAULT_CONFIG, ...config },
  };
}

/**
 * Generate a unique type signature for recursion detection
 */
function getTypeSignature(type: OmgType): string {
  return JSON.stringify(type);
}

/**
 * Convert a path array to a PascalCase schema name
 * e.g., ['CreateInvoice', 'Request', 'lineItems', 'Item'] -> 'CreateInvoiceRequestLineItemsItem'
 */
function pathToSchemaName(path: string[]): string {
  return path
    .map((segment) => {
      // Remove special characters and capitalize first letter
      const cleaned = segment.replace(/[^a-zA-Z0-9]/g, '');
      return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    })
    .join('');
}

/**
 * Singularize a name for array items
 */
function singularize(name: string): string {
  if (name.endsWith('ies')) {
    return name.slice(0, -3) + 'y';
  }
  if (name.endsWith('s') && !name.endsWith('ss')) {
    return name.slice(0, -1);
  }
  return name;
}

/**
 * Check if a type should be extracted based on depth and complexity
 */
function shouldExtract(type: OmgType, ctx: CompilerContext): boolean {
  if (type.kind !== 'object') return false;

  const propertyCount = Object.keys(type.properties).length;

  // Extract if we're beyond max depth and have enough properties
  if (ctx.depth >= ctx.config.maxInlineDepth) {
    return propertyCount >= ctx.config.minPropertiesForExtraction;
  }

  return false;
}

/**
 * Compile a ParsedApi to OpenAPI 3.1
 */
export function compileToOpenApi(
  api: ParsedApi,
  config: Partial<CompilerConfig> = {}
): OpenApiSpec {
  const ctx = createContext(config);

  const spec: OpenApiSpec = {
    openapi: '3.1.0',
    info: {
      title: api.name,
      version: api.version,
      description: api.description || undefined,
    },
    paths: {},
    components: {
      schemas: {},
    },
  };

  // Add contact info
  if (api.contact) {
    spec.info.contact = api.contact;
  }

  // Add license
  if (api.license) {
    spec.info.license = api.license;
  }

  // Add terms of service
  if (api.termsOfService) {
    spec.info.termsOfService = api.termsOfService;
  }

  // Add servers (full list if available, otherwise just baseUrl)
  if (api.servers && api.servers.length > 0) {
    spec.servers = api.servers;
  } else if (api.baseUrl) {
    spec.servers = [{ url: api.baseUrl }];
  }

  // Add security schemes to components
  if (api.securitySchemes) {
    spec.components!.securitySchemes = api.securitySchemes;
  }

  // Add global security requirements
  if (api.security && api.security.length > 0) {
    spec.security = api.security;
  }

  // Add external docs
  if (api.externalDocs) {
    spec.externalDocs = api.externalDocs;
  }

  // Add tags with descriptions
  if (api.tags && api.tags.length > 0) {
    spec.tags = api.tags;
  }

  // Passthrough vendor extensions
  if (api.extensions) {
    for (const [key, value] of Object.entries(api.extensions)) {
      spec[key] = value;
    }
  }

  // Compile shared types first (they may be referenced)
  for (const [name, schema] of Object.entries(api.types)) {
    const typeCtx = { ...ctx, path: [name], depth: 0 };
    spec.components!.schemas![name] = compileSchemaWithContext(schema, typeCtx);
  }

  // Compile each endpoint
  for (const endpoint of api.endpoints) {
    const pathItem = spec.paths[endpoint.path] || {};
    const method = endpoint.method.toLowerCase() as keyof PathItem;

    pathItem[method] = compileEndpointWithContext(endpoint, ctx);
    spec.paths[endpoint.path] = pathItem;
  }

  // Add all extracted schemas to components
  for (const [name, schema] of Object.entries(ctx.extractedSchemas)) {
    if (!spec.components!.schemas![name]) {
      spec.components!.schemas![name] = schema;
    }
  }

  return spec;
}

/**
 * Convert operationId to PascalCase for schema naming
 * e.g., 'create-invoice' -> 'CreateInvoice'
 */
function operationIdToPascalCase(operationId: string): string {
  return operationId
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Compile a single endpoint to an OperationObject (with context)
 */
function compileEndpointWithContext(
  endpoint: ParsedEndpoint,
  parentCtx: CompilerContext
): OperationObject {
  const baseName = operationIdToPascalCase(endpoint.operationId);

  const operation: OperationObject = {
    operationId: endpoint.operationId,
    summary: endpoint.summary || undefined,
    description: endpoint.description || undefined,
    tags: endpoint.tags.length > 0 ? endpoint.tags : undefined,
    deprecated: endpoint.deprecated || undefined,
    responses: {},
  };

  // Add extension metadata
  if (endpoint.follows && endpoint.follows.length > 0) {
    operation['x-follows'] = endpoint.follows;
  }

  if (endpoint.webhooks?.resulting && endpoint.webhooks.resulting.length > 0) {
    operation['x-webhooks-resulting'] = endpoint.webhooks.resulting;
  }

  if (endpoint.webhooks?.listen && endpoint.webhooks.listen.length > 0) {
    operation['x-webhooks-listen'] = endpoint.webhooks.listen;
  }

  // Add security requirements
  if (endpoint.security && endpoint.security.length > 0) {
    operation.security = endpoint.security;
  }

  // Add external docs
  if (endpoint.externalDocs) {
    operation.externalDocs = endpoint.externalDocs;
  }

  // Add server overrides
  if (endpoint.servers && endpoint.servers.length > 0) {
    operation.servers = endpoint.servers;
  }

  // Passthrough vendor extensions
  if (endpoint.extensions) {
    for (const [key, value] of Object.entries(endpoint.extensions)) {
      operation[key] = value;
    }
  }

  // Compile parameters
  const parameters: ParameterObject[] = [];

  if (endpoint.parameters.path) {
    const ctx = { ...parentCtx, path: [baseName, 'Path'], depth: 0 };
    parameters.push(...compileParametersWithContext(endpoint.parameters.path, 'path', ctx));
  }

  if (endpoint.parameters.query) {
    const ctx = { ...parentCtx, path: [baseName, 'Query'], depth: 0 };
    parameters.push(...compileParametersWithContext(endpoint.parameters.query, 'query', ctx));
  }

  if (endpoint.parameters.headers) {
    const ctx = { ...parentCtx, path: [baseName, 'Headers'], depth: 0 };
    parameters.push(...compileParametersWithContext(endpoint.parameters.headers, 'header', ctx));
  }

  if (parameters.length > 0) {
    operation.parameters = parameters;
  }

  // Compile request body
  if (endpoint.requestBody) {
    const ctx = { ...parentCtx, path: [baseName, 'Request'], depth: 0 };
    operation.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: compileSchemaWithContext(endpoint.requestBody, ctx),
        },
      },
    };
  }

  // Compile responses
  for (const [statusCode, response] of Object.entries(endpoint.responses) as [
    string,
    ParsedResponse,
  ][]) {
    const ctx = { ...parentCtx, path: [baseName, `Response${statusCode}`], depth: 0 };
    const description = response.description || getStatusDescription(parseInt(statusCode));

    const oasResponse: ResponseObject = { description };

    if (response.schema) {
      const mediaType: MediaTypeObject = {
        schema: compileSchemaWithContext(response.schema, ctx),
      };

      // Add example
      if (response.example !== undefined) {
        mediaType.example = response.example;
      }

      // Add examples
      if (response.examples) {
        mediaType.examples = response.examples as Record<string, ExampleObject>;
      }

      oasResponse.content = { 'application/json': mediaType };
    }

    // Add response headers
    if (response.headers) {
      oasResponse.headers = compileHeaders(response.headers);
    }

    // Add response links
    if (response.links) {
      oasResponse.links = response.links as Record<string, LinkObject>;
    }

    // Passthrough vendor extensions
    if (response.extensions) {
      for (const [key, value] of Object.entries(response.extensions)) {
        oasResponse[key] = value;
      }
    }

    operation.responses[statusCode] = oasResponse;
  }

  // Ensure at least one response
  if (Object.keys(operation.responses).length === 0) {
    operation.responses['200'] = {
      description: 'Success',
    };
  }

  return operation;
}

/**
 * Compile OMG schema parameters to OpenAPI parameters (with context)
 */
function compileParametersWithContext(
  schema: OmgSchema,
  location: 'path' | 'query' | 'header',
  ctx: CompilerContext
): ParameterObject[] {
  if (schema.kind !== 'object') {
    return [];
  }

  const parameters: ParameterObject[] = [];

  for (const [name, propType] of Object.entries(schema.properties) as [string, OmgType][]) {
    const isOptional = 'optional' in propType && propType.optional;
    const required = location === 'path' ? true : !isOptional;
    const propCtx = { ...ctx, path: [...ctx.path, name], depth: ctx.depth + 1 };

    parameters.push({
      name,
      in: location,
      required,
      description: propType.description,
      schema: compileSchemaWithContext(propType, propCtx),
    });
  }

  return parameters;
}

/**
 * Compile OMG type to OpenAPI schema (with context for extraction and recursion)
 */
function compileSchemaWithContext(type: OmgType, ctx: CompilerContext): SchemaObject {
  // Check for recursion - if we're already compiling this type, return a $ref
  const typeSignature = getTypeSignature(type);
  if (ctx.compilingTypes.has(typeSignature)) {
    const existingName = ctx.typeToSchemaName.get(typeSignature);
    if (existingName) {
      return { $ref: `#/components/schemas/${existingName}` };
    }
  }

  // Check if this object should be extracted to components
  if (shouldExtract(type, ctx)) {
    const schemaName = pathToSchemaName(ctx.path);

    // Mark as being compiled (for recursion detection)
    ctx.compilingTypes.add(typeSignature);
    ctx.typeToSchemaName.set(typeSignature, schemaName);

    // Compile the full schema at depth 0 for extraction
    const extractCtx = { ...ctx, depth: 0, path: [schemaName] };
    const extractedSchema = compileSchemaInternal(type, extractCtx);

    // Store the extracted schema
    ctx.extractedSchemas[schemaName] = extractedSchema;

    // Remove from compiling set
    ctx.compilingTypes.delete(typeSignature);

    // Return a reference
    return { $ref: `#/components/schemas/${schemaName}` };
  }

  return compileSchemaInternal(type, ctx);
}

/**
 * Internal schema compilation (called after extraction decision)
 */
function compileSchemaInternal(type: OmgType, ctx: CompilerContext): SchemaObject {
  const schema: SchemaObject = {};

  // Handle nullable
  if ('nullable' in type && type.nullable) {
    schema.nullable = true;
  }

  // Handle description
  if (type.description) {
    schema.description = type.description;
  }

  // Handle title
  if ('title' in type && type.title) {
    schema.title = type.title;
  }

  // Handle example
  if ('example' in type && type.example !== undefined) {
    schema.example = type.example;
  }

  // Handle readOnly/writeOnly
  if ('readOnly' in type && type.readOnly) {
    schema.readOnly = true;
  }
  if ('writeOnly' in type && type.writeOnly) {
    schema.writeOnly = true;
  }

  // Handle deprecated
  if ('deprecated' in type && type.deprecated) {
    schema.deprecated = true;
  }

  // Passthrough vendor extensions
  if ('extensions' in type && type.extensions) {
    for (const [key, value] of Object.entries(type.extensions)) {
      schema[key] = value;
    }
  }

  // Apply annotations
  if ('annotations' in type) {
    applyAnnotations(schema, type.annotations);
  }

  switch (type.kind) {
    case 'primitive':
      return compilePrimitive(type, schema);

    case 'object':
      return compileObjectWithContext(type, schema, ctx);

    case 'array':
      return compileArrayWithContext(type, schema, ctx);

    case 'enum':
      return compileEnum(type, schema);

    case 'union':
      return compileUnionWithContext(type, schema, ctx);

    case 'intersection':
      return compileIntersectionWithContext(type, schema, ctx);

    case 'reference':
      return compileReference(type, schema);

    default:
      return schema;
  }
}

/**
 * Legacy compileSchema for backward compatibility
 */
function compileSchema(type: OmgType): SchemaObject {
  const ctx = createContext();
  return compileSchemaWithContext(type, ctx);
}

function compilePrimitive(type: OmgPrimitive, schema: SchemaObject): SchemaObject {
  switch (type.type) {
    case 'string':
      schema.type = 'string';
      break;
    case 'number':
      schema.type = 'number';
      break;
    case 'integer':
      schema.type = 'integer';
      break;
    case 'boolean':
      schema.type = 'boolean';
      break;
    case 'decimal':
      schema.type = 'number';
      schema.format = 'decimal';
      break;
    case 'date':
      schema.type = 'string';
      schema.format = 'date';
      break;
    case 'datetime':
      schema.type = 'string';
      schema.format = 'date-time';
      break;
    case 'uuid':
      schema.type = 'string';
      schema.format = 'uuid';
      break;
    case 'any':
      // No type constraint
      break;
  }

  return schema;
}

function compileObjectWithContext(
  type: OmgObject,
  schema: SchemaObject,
  ctx: CompilerContext
): SchemaObject {
  schema.type = 'object';
  schema.properties = {};

  const required: string[] = [];

  for (const [name, propType] of Object.entries(type.properties) as [string, OmgType][]) {
    // Create child context with updated path and depth
    const childCtx: CompilerContext = {
      ...ctx,
      path: [...ctx.path, name],
      depth: ctx.depth + 1,
    };

    schema.properties[name] = compileSchemaWithContext(propType, childCtx);

    const isOptional = 'optional' in propType && propType.optional;
    if (!isOptional) {
      required.push(name);
    }
  }

  if (required.length > 0) {
    schema.required = required;
  }

  return schema;
}

function compileArrayWithContext(
  type: OmgArray,
  schema: SchemaObject,
  ctx: CompilerContext
): SchemaObject {
  schema.type = 'array';

  // For array items, use singular form of parent name
  const lastPathSegment = ctx.path[ctx.path.length - 1] || 'Items';
  const singularName = singularize(lastPathSegment);
  // Avoid redundant "Item" suffix if already singular
  const itemName = singularName.endsWith('Item') ? singularName : singularName;

  const childCtx: CompilerContext = {
    ...ctx,
    path: [...ctx.path.slice(0, -1), itemName],
    depth: ctx.depth + 1,
  };

  schema.items = compileSchemaWithContext(type.items, childCtx);
  return schema;
}

function compileEnum(type: OmgEnum, schema: SchemaObject): SchemaObject {
  // Determine type from values
  const firstValue = type.values[0];
  if (typeof firstValue === 'string') {
    schema.type = 'string';
  } else if (typeof firstValue === 'number') {
    schema.type = Number.isInteger(firstValue) ? 'integer' : 'number';
  } else if (typeof firstValue === 'boolean') {
    schema.type = 'boolean';
  }

  schema.enum = type.values;
  return schema;
}

function compileUnionWithContext(
  type: OmgUnion,
  schema: SchemaObject,
  ctx: CompilerContext
): SchemaObject {
  schema.oneOf = type.types.map((unionType: OmgType, index: number) => {
    const childCtx: CompilerContext = {
      ...ctx,
      path: [...ctx.path, `Variant${index + 1}`],
      depth: ctx.depth + 1,
    };
    return compileSchemaWithContext(unionType, childCtx);
  });
  return schema;
}

function compileIntersectionWithContext(
  type: OmgIntersection,
  schema: SchemaObject,
  ctx: CompilerContext
): SchemaObject {
  schema.allOf = type.types.map((intersectionType: OmgType, index: number) => {
    const childCtx: CompilerContext = {
      ...ctx,
      path: [...ctx.path, `Part${index + 1}`],
      depth: ctx.depth + 1,
    };
    return compileSchemaWithContext(intersectionType, childCtx);
  });
  return schema;
}

function compileReference(type: OmgReference, schema: SchemaObject): SchemaObject {
  schema.$ref = `#/components/schemas/${type.name}`;
  return schema;
}

/**
 * Compile headers to OpenAPI format
 */
function compileHeaders(headers: Record<string, OmgHeader>): Record<string, HeaderObject> {
  const result: Record<string, HeaderObject> = {};
  for (const [name, header] of Object.entries(headers)) {
    const h: HeaderObject = {
      description: header.description,
      required: header.required,
      deprecated: header.deprecated,
    };
    if (header.schema) {
      const ctx = createContext();
      h.schema = compileSchemaWithContext(header.schema, ctx);
    }
    result[name] = h;
  }
  return result;
}

/**
 * Apply OMG annotations to OpenAPI schema
 */
function applyAnnotations(schema: SchemaObject, annotations: OmgAnnotation[]): void {
  for (const annotation of annotations) {
    switch (annotation.name) {
      case 'min':
        schema.minimum = annotation.args[0] as number;
        break;
      case 'max':
        schema.maximum = annotation.args[0] as number;
        break;
      case 'minLength':
        schema.minLength = annotation.args[0] as number;
        break;
      case 'maxLength':
        schema.maxLength = annotation.args[0] as number;
        break;
      case 'minItems':
        schema.minItems = annotation.args[0] as number;
        break;
      case 'maxItems':
        schema.maxItems = annotation.args[0] as number;
        break;
      case 'pattern':
        schema.pattern = annotation.args[0] as string;
        break;
      case 'format':
        schema.format = annotation.args[0] as string;
        break;
      case 'default':
        schema.default = annotation.args[0];
        break;
    }
  }
}

/**
 * Get description for HTTP status code
 */
function getStatusDescription(code: number): string {
  const descriptions: Record<number, string> = {
    // 1xx Informational
    100: 'Continue',
    101: 'Switching Protocols',
    102: 'Processing',
    103: 'Early Hints',

    // 2xx Success
    200: 'Success',
    201: 'Created',
    202: 'Accepted',
    203: 'Non-Authoritative Information',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',
    207: 'Multi-Status',
    208: 'Already Reported',
    226: 'IM Used',

    // 3xx Redirection
    300: 'Multiple Choices',
    301: 'Moved Permanently',
    302: 'Found',
    303: 'See Other',
    304: 'Not Modified',
    305: 'Use Proxy',
    307: 'Temporary Redirect',
    308: 'Permanent Redirect',

    // 4xx Client Errors
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Content Too Large',
    414: 'URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Range Not Satisfiable',
    417: 'Expectation Failed',
    418: "I'm a Teapot",
    421: 'Misdirected Request',
    422: 'Unprocessable Entity',
    423: 'Locked',
    424: 'Failed Dependency',
    425: 'Too Early',
    426: 'Upgrade Required',
    428: 'Precondition Required',
    429: 'Too Many Requests',
    431: 'Request Header Fields Too Large',
    451: 'Unavailable For Legal Reasons',

    // 5xx Server Errors
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
    506: 'Variant Also Negotiates',
    507: 'Insufficient Storage',
    508: 'Loop Detected',
    510: 'Not Extended',
    511: 'Network Authentication Required',
  };

  return descriptions[code] || 'Response';
}
