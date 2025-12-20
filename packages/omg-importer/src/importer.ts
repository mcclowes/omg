/**
 * OpenAPI to OMG Importer
 *
 * Converts OpenAPI 3.x specifications to OMG document structure.
 */

import type {
  OmgDocument,
  EndpointFrontMatter,
  ApiFrontMatter,
  OmgBlock,
  OmgBlockType,
  OmgSchema,
  HttpMethod,
  OmgServer,
  OmgSecurityScheme,
  OmgSecurityRequirement,
  OmgExternalDocs,
  OmgTag,
  OmgHeader,
  OmgExample,
  OmgLink,
  ParsedResponse,
  PartialRef,
} from 'omg-parser';
import type {
  OpenApiSpec,
  PathItemObject,
  OperationObject,
  ParameterObject,
  RequestBodyObject,
  ResponseObject,
  SchemaObject,
  ReferenceObject,
  SecuritySchemeObject,
  HeaderObject,
  ExampleObject,
  LinkObject,
} from './types.js';
import { isReferenceObject } from './types.js';
import {
  convertSchema,
  createConversionContext,
  type ConversionContext,
} from './schema-converter.js';
import {
  detectPatterns,
  findMatchingPatterns,
  type DetectedPattern,
  type ParameterCategory,
} from './pattern-detector.js';
import {
  generatePartials,
  buildPatternToPartialMap,
  type GeneratedPartial,
} from './partial-generator.js';

/**
 * Result of importing an OpenAPI spec
 */
export interface ImportResult {
  /** Root API document */
  api: OmgDocument;
  /** Individual endpoint documents */
  endpoints: OmgDocument[];
  /** Named type definitions (from components/schemas) */
  types: Map<string, { schema: OmgSchema; document: OmgDocument }>;
  /** Warnings encountered during import */
  warnings: ImportWarning[];
  /** Generated partial documents */
  partials: Map<string, OmgDocument>;
  /** Mapping from pattern key to partial path */
  patternToPartial: Map<string, string>;
}

/**
 * Warning generated during import
 */
export interface ImportWarning {
  message: string;
  path?: string;
  operationId?: string;
}

/**
 * Import options
 */
export interface ImportOptions {
  /** Whether to inline referenced schemas (default: false) */
  inlineRefs?: boolean;
  /** Base directory for output (used for file paths) */
  baseDir?: string;
  /** Whether to generate separate type files (default: true) */
  generateTypeFiles?: boolean;
  /** Whether to extract repeated parameters as partials (default: true) */
  extractPartials?: boolean;
  /** Minimum occurrences to extract as partial (default: 3) */
  partialThreshold?: number;
  /** Categories to extract partials for (default: ['header', 'query']) */
  partialCategories?: ParameterCategory[];
}

/**
 * Import an OpenAPI specification to OMG format
 */
export function importOpenApi(spec: OpenApiSpec, options: ImportOptions = {}): ImportResult {
  const warnings: ImportWarning[] = [];
  const extractPartials = options.extractPartials ?? true;
  const partialThreshold = options.partialThreshold ?? 3;
  const partialCategories = options.partialCategories ?? ['header', 'query'];

  const ctx = createConversionContext(spec.components?.schemas || {}, {
    inlineRefs: options.inlineRefs ?? false,
  });

  // Phase 1: Detect patterns (if extraction enabled)
  let detectedPatterns = new Map<string, DetectedPattern>();
  let generatedPartials: GeneratedPartial[] = [];
  let patternToPartial = new Map<string, string>();

  if (extractPartials) {
    const detection = detectPatterns(spec, {
      categories: partialCategories,
      threshold: partialThreshold,
    });
    detectedPatterns = detection.patterns;

    // Generate partial documents
    generatedPartials = generatePartials(detectedPatterns, ctx, {
      baseDir: options.baseDir || '.',
    });

    // Build pattern-to-partial mapping
    patternToPartial = buildPatternToPartialMap(generatedPartials);
  }

  // Create root API document
  const api = createApiDocument(spec, options);

  // Convert endpoints (with partial references)
  const endpoints = convertEndpoints(
    spec,
    ctx,
    warnings,
    options,
    detectedPatterns,
    patternToPartial
  );

  // Convert named types
  const types = convertNamedTypes(spec, ctx, options);

  // Build partials map
  const partialsMap = new Map<string, OmgDocument>();
  for (const partial of generatedPartials) {
    partialsMap.set(partial.path, partial.document);
  }

  return {
    api,
    endpoints,
    types,
    warnings,
    partials: partialsMap,
    patternToPartial,
  };
}

/**
 * Create the root API document
 */
function createApiDocument(spec: OpenApiSpec, options: ImportOptions): OmgDocument {
  const frontMatter: ApiFrontMatter = {
    name: spec.info.title,
    version: spec.info.version,
  };

  // Add base URL from first server (for backward compatibility)
  if (spec.servers && spec.servers.length > 0) {
    frontMatter.baseUrl = spec.servers[0].url;
  }

  // Add all servers
  const servers = convertServers(spec.servers);
  if (servers) {
    frontMatter.servers = servers;
  }

  // Add contact info
  if (spec.info.contact) {
    frontMatter.contact = {
      name: spec.info.contact.name,
      email: spec.info.contact.email,
      url: spec.info.contact.url,
    };
  }

  // Add license
  if (spec.info.license) {
    frontMatter.license = {
      name: spec.info.license.name,
      url: spec.info.license.url,
    };
  }

  // Add terms of service
  if (spec.info.termsOfService) {
    frontMatter.termsOfService = spec.info.termsOfService;
  }

  // Add security schemes
  const securitySchemes = convertSecuritySchemes(spec.components?.securitySchemes, spec);
  if (securitySchemes) {
    frontMatter.securitySchemes = securitySchemes;
  }

  // Add global security requirements
  if (spec.security && spec.security.length > 0) {
    frontMatter.security = spec.security as OmgSecurityRequirement[];
  }

  // Add external docs
  if (spec.externalDocs) {
    frontMatter.externalDocs = {
      url: spec.externalDocs.url,
      description: spec.externalDocs.description,
    };
  }

  // Add tags with descriptions
  const tags = convertTags(spec.tags);
  if (tags) {
    frontMatter.tags = tags;
  }

  // Passthrough vendor extensions
  const extensions = extractExtensions(spec as unknown as Record<string, unknown>);
  if (extensions) {
    frontMatter.extensions = extensions;
  }

  const baseDir = options.baseDir || '.';

  return {
    filePath: `${baseDir}/api.omg.md`,
    frontMatter,
    title: spec.info.title,
    description: spec.info.description || '',
    blocks: [],
    partials: [],
  };
}

/**
 * Convert all endpoints from OpenAPI paths
 */
function convertEndpoints(
  spec: OpenApiSpec,
  ctx: ConversionContext,
  warnings: ImportWarning[],
  options: ImportOptions,
  detectedPatterns: Map<string, DetectedPattern>,
  patternToPartial: Map<string, string>
): OmgDocument[] {
  const endpoints: OmgDocument[] = [];
  const paths = spec.paths || {};

  for (const [path, pathItem] of Object.entries(paths)) {
    if (!pathItem) continue;

    // Handle path-level parameters
    const pathParams = resolveParameters(pathItem.parameters || [], spec, warnings);

    // Process each HTTP method
    const methods: Array<{ method: HttpMethod; operation: OperationObject }> = [];

    if (pathItem.get) methods.push({ method: 'GET', operation: pathItem.get });
    if (pathItem.post) methods.push({ method: 'POST', operation: pathItem.post });
    if (pathItem.put) methods.push({ method: 'PUT', operation: pathItem.put });
    if (pathItem.patch) methods.push({ method: 'PATCH', operation: pathItem.patch });
    if (pathItem.delete) methods.push({ method: 'DELETE', operation: pathItem.delete });
    if (pathItem.head) methods.push({ method: 'HEAD', operation: pathItem.head });
    if (pathItem.options) methods.push({ method: 'OPTIONS', operation: pathItem.options });

    for (const { method, operation } of methods) {
      const doc = convertOperation(
        path,
        method,
        operation,
        pathParams,
        spec,
        ctx,
        warnings,
        options,
        detectedPatterns,
        patternToPartial
      );
      endpoints.push(doc);
    }
  }

  return endpoints;
}

/**
 * Resolve parameter references
 */
function resolveParameters(
  params: (ParameterObject | ReferenceObject)[],
  spec: OpenApiSpec,
  warnings: ImportWarning[]
): ParameterObject[] {
  return params
    .map((param) => {
      if (isReferenceObject(param)) {
        const resolved = resolveParameterRef(param.$ref, spec);
        if (!resolved) {
          warnings.push({
            message: `Could not resolve parameter reference: ${param.$ref}`,
          });
          return null;
        }
        return resolved;
      }
      return param;
    })
    .filter((p): p is ParameterObject => p !== null);
}

/**
 * Resolve a parameter reference
 */
function resolveParameterRef(ref: string, spec: OpenApiSpec): ParameterObject | null {
  const match = ref.match(/^#\/components\/parameters\/(.+)$/);
  if (!match) return null;

  const name = match[1];
  const param = spec.components?.parameters?.[name];

  if (!param) return null;
  if (isReferenceObject(param)) {
    // Recursive resolution not supported for simplicity
    return null;
  }

  return param;
}

/**
 * Convert a single operation to an OmgDocument
 */
function convertOperation(
  path: string,
  method: HttpMethod,
  operation: OperationObject,
  pathLevelParams: ParameterObject[],
  spec: OpenApiSpec,
  ctx: ConversionContext,
  warnings: ImportWarning[],
  options: ImportOptions,
  detectedPatterns: Map<string, DetectedPattern>,
  patternToPartial: Map<string, string>
): OmgDocument {
  // Generate operationId if not present
  const operationId = operation.operationId || generateOperationId(method, path);
  const baseDir = options.baseDir || '.';

  // Build front matter
  const frontMatter: EndpointFrontMatter = {
    method,
    path,
    operationId,
  };

  if (operation.tags && operation.tags.length > 0) {
    frontMatter.tags = operation.tags;
  }

  if (operation.deprecated) {
    frontMatter.deprecated = true;
  }

  // Note: We don't add summary to frontMatter because it duplicates the title.
  // The title is set to operation.summary at the end of this function.

  // Handle x-follows extension
  if (operation['x-follows'] && operation['x-follows'].length > 0) {
    frontMatter.follows = operation['x-follows'];
  }

  // Handle webhooks extensions
  if (operation['x-webhooks-resulting'] || operation['x-webhooks-listen']) {
    frontMatter.webhooks = {};
    if (operation['x-webhooks-resulting']) {
      frontMatter.webhooks.resulting = operation['x-webhooks-resulting'];
    }
    if (operation['x-webhooks-listen']) {
      frontMatter.webhooks.listen = operation['x-webhooks-listen'];
    }
  }

  // Add security requirements
  if (operation.security && operation.security.length > 0) {
    frontMatter.security = operation.security as OmgSecurityRequirement[];
  }

  // Add external docs
  if (operation.externalDocs) {
    frontMatter.externalDocs = {
      url: operation.externalDocs.url,
      description: operation.externalDocs.description,
    };
  }

  // Add server overrides
  const servers = convertServers(operation.servers);
  if (servers) {
    frontMatter.servers = servers;
  }

  // Passthrough vendor extensions
  const extensions = extractExtensions(operation as unknown as Record<string, unknown>);
  if (extensions) {
    frontMatter.extensions = extensions;
  }

  // Collect blocks and partial references
  const blocks: OmgBlock[] = [];
  const partialRefs: PartialRef[] = [];

  // Merge path-level and operation-level parameters
  const allParams = [
    ...pathLevelParams,
    ...resolveParameters(operation.parameters || [], spec, warnings),
  ];

  // Separate parameters by location
  const pathParams = allParams.filter((p) => p.in === 'path');
  const queryParams = allParams.filter((p) => p.in === 'query');
  const headerParams = allParams.filter((p) => p.in === 'header');

  // Helper to process parameters with partial extraction
  const processParams = (params: ParameterObject[], blockType: OmgBlockType) => {
    if (params.length === 0) return;

    // Find matching patterns and remaining params
    const { matchedPatternKeys, remainingParams } = findMatchingPatterns(params, detectedPatterns);

    // Add partial references for matched patterns
    for (const patternKey of matchedPatternKeys) {
      const partialPath = patternToPartial.get(patternKey);
      if (partialPath) {
        // Avoid duplicate partial references
        if (!partialRefs.some((p) => p.path === partialPath)) {
          partialRefs.push({ path: partialPath, line: 0 });
        }
      }
    }

    // Add inline block for remaining params (if any)
    if (remainingParams.length > 0) {
      const schema = parametersToSchema(remainingParams, ctx);
      blocks.push({
        type: blockType,
        content: '',
        parsed: schema,
        line: 0,
      });
    }
  };

  // Process each parameter category
  processParams(pathParams, 'omg.path');
  processParams(queryParams, 'omg.query');
  processParams(headerParams, 'omg.headers');

  // Convert request body
  if (operation.requestBody) {
    const bodySchema = convertRequestBody(operation.requestBody, spec, ctx, warnings);
    if (bodySchema) {
      blocks.push({
        type: 'omg.body',
        content: '',
        parsed: bodySchema,
        line: 0,
      });
    }
  }

  // Convert responses
  if (operation.responses) {
    for (const [statusCode, response] of Object.entries(operation.responses)) {
      const parsedResponse = convertResponseFull(response, spec, ctx, warnings);
      const code = parseInt(statusCode, 10);

      if (!isNaN(code)) {
        const blockType: OmgBlockType = code === 200 ? 'omg.response' : 'omg.response';
        blocks.push({
          type: blockType,
          statusCode: code === 200 ? undefined : code,
          content: '',
          parsed: parsedResponse.schema || undefined,
          parsedResponse, // Store full response metadata
          line: 0,
        });
      }
    }
  }

  // Build file path with logical grouping
  // e.g., /Accounts/{AccountID} + GET -> accounts/get-account.omg.md
  // e.g., /Accounts/{AccountID}/Attachments/{FileName} + PUT -> accounts/attachments/put-attachment-by-filename.omg.md
  const { directory, fileName } = generateEndpointFilePath(path, method, operationId);

  return {
    filePath: `${baseDir}/endpoints/${directory}${fileName}`,
    frontMatter,
    title: operation.summary || `${method} ${path}`,
    description: operation.description || '',
    blocks,
    partials: partialRefs,
  };
}

/**
 * Convert parameters to an object schema
 */
function parametersToSchema(params: ParameterObject[], ctx: ConversionContext): OmgSchema {
  const properties: Record<string, OmgSchema> = {};

  for (const param of params) {
    let paramSchema: OmgSchema;

    if (param.schema) {
      paramSchema = convertSchema(param.schema, ctx);
    } else {
      // Default to string if no schema
      paramSchema = {
        kind: 'primitive',
        type: 'string',
        annotations: [],
      };
    }

    // Mark as optional if not required
    if (!param.required) {
      paramSchema.optional = true;
    }

    // Add description
    if (param.description) {
      paramSchema.description = param.description;
    }

    // Add deprecated flag
    if (param.deprecated) {
      paramSchema.deprecated = true;
    }

    // Add example
    if (param.example !== undefined) {
      paramSchema.example = param.example;
    }

    // Add examples
    const examples = convertExamples(param.examples);
    if (examples) {
      paramSchema.examples = examples;
    }

    // Add vendor extensions
    const extensions = extractExtensions(param as unknown as Record<string, unknown>);
    if (extensions) {
      paramSchema.extensions = extensions;
    }

    properties[param.name] = paramSchema;
  }

  return {
    kind: 'object',
    properties,
    annotations: [],
  };
}

/**
 * Convert request body to schema
 */
function convertRequestBody(
  body: RequestBodyObject | ReferenceObject,
  spec: OpenApiSpec,
  ctx: ConversionContext,
  warnings: ImportWarning[]
): OmgSchema | null {
  // Resolve reference if needed
  if (isReferenceObject(body)) {
    const resolved = resolveRequestBodyRef(body.$ref, spec);
    if (!resolved) {
      warnings.push({
        message: `Could not resolve request body reference: ${body.$ref}`,
      });
      return null;
    }
    body = resolved;
  }

  // Get JSON content schema
  const jsonContent = body.content['application/json'];
  if (!jsonContent?.schema) {
    // Try other content types
    const anyContent = Object.values(body.content)[0];
    if (!anyContent?.schema) {
      return null;
    }
    return convertSchema(anyContent.schema, ctx);
  }

  return convertSchema(jsonContent.schema, ctx);
}

/**
 * Resolve request body reference
 */
function resolveRequestBodyRef(ref: string, spec: OpenApiSpec): RequestBodyObject | null {
  const match = ref.match(/^#\/components\/requestBodies\/(.+)$/);
  if (!match) return null;

  const name = match[1];
  const body = spec.components?.requestBodies?.[name];

  if (!body) return null;
  if (isReferenceObject(body)) return null;

  return body;
}

/**
 * Convert response to full ParsedResponse with metadata
 */
function convertResponseFull(
  response: ResponseObject | ReferenceObject,
  spec: OpenApiSpec,
  ctx: ConversionContext,
  warnings: ImportWarning[]
): ParsedResponse {
  // Resolve reference if needed
  if (isReferenceObject(response)) {
    const resolved = resolveResponseRef(response.$ref, spec);
    if (!resolved) {
      warnings.push({
        message: `Could not resolve response reference: ${response.$ref}`,
      });
      return { schema: null };
    }
    response = resolved;
  }

  const result: ParsedResponse = {
    schema: null,
    description: response.description,
  };

  // Import response headers
  const headers = convertHeaders(response.headers, ctx);
  if (headers) {
    result.headers = headers;
  }

  // Import links
  const links = convertLinks(response.links);
  if (links) {
    result.links = links;
  }

  // No content (e.g., 204 No Content)
  if (!response.content) {
    return result;
  }

  // Get JSON content and extract schema + examples
  const jsonContent = response.content['application/json'];
  if (jsonContent?.schema) {
    result.schema = convertSchema(jsonContent.schema, ctx);

    // Import example
    if (jsonContent.example !== undefined) {
      result.example = jsonContent.example;
    }

    // Import examples
    const examples = convertExamples(jsonContent.examples);
    if (examples) {
      result.examples = examples;
    }
  } else {
    // Try other content types
    const anyContent = Object.values(response.content)[0];
    if (anyContent?.schema) {
      result.schema = convertSchema(anyContent.schema, ctx);

      if (anyContent.example !== undefined) {
        result.example = anyContent.example;
      }
      const examples = convertExamples(anyContent.examples);
      if (examples) {
        result.examples = examples;
      }
    }
  }

  // Import vendor extensions
  const extensions = extractExtensions(response as unknown as Record<string, unknown>);
  if (extensions) {
    result.extensions = extensions;
  }

  return result;
}

/**
 * Resolve response reference
 */
function resolveResponseRef(ref: string, spec: OpenApiSpec): ResponseObject | null {
  const match = ref.match(/^#\/components\/responses\/(.+)$/);
  if (!match) return null;

  const name = match[1];
  const response = spec.components?.responses?.[name];

  if (!response) return null;
  if (isReferenceObject(response)) return null;

  return response;
}

/**
 * Convert named types from components/schemas
 */
function convertNamedTypes(
  spec: OpenApiSpec,
  ctx: ConversionContext,
  options: ImportOptions
): Map<string, { schema: OmgSchema; document: OmgDocument }> {
  const types = new Map<string, { schema: OmgSchema; document: OmgDocument }>();
  const schemas = spec.components?.schemas || {};
  const baseDir = options.baseDir || '.';

  for (const [name, schemaOrRef] of Object.entries(schemas)) {
    // Skip references (they point to other schemas)
    if (isReferenceObject(schemaOrRef)) continue;

    const schema = convertSchema(schemaOrRef, ctx);

    // Create a document for this type
    const doc: OmgDocument = {
      filePath: `${baseDir}/types/${toKebabCase(name)}.omg.md`,
      frontMatter: null,
      title: name,
      description: schemaOrRef.description || '',
      blocks: [
        {
          type: 'omg.type',
          content: '', // Will be generated
          parsed: schema,
          line: 0,
        },
      ],
      partials: [],
    };

    types.set(name, { schema, document: doc });
  }

  return types;
}

/**
 * Generate an operation ID from method and path
 */
function generateOperationId(method: string, path: string): string {
  // Convert path to kebab-case
  const pathPart = path
    .replace(/\{([^}]+)\}/g, 'by-$1') // {id} -> by-id
    .replace(/\//g, '-')
    .replace(/^-/, '')
    .replace(/-$/, '')
    .toLowerCase();

  return `${method.toLowerCase()}-${pathPart || 'root'}`;
}

/**
 * Generate endpoint file path with logical grouping
 *
 * Uses resource-action pattern: resource-verb.omg.md
 *
 * Examples:
 * - GET /Accounts -> accounts/accounts-list.omg.md
 * - GET /Accounts/{AccountID} -> accounts/account-get.omg.md
 * - PUT /Accounts -> accounts/account-create.omg.md
 * - POST /Accounts/{AccountID} -> accounts/account-update.omg.md
 * - DELETE /Accounts/{AccountID} -> accounts/account-delete.omg.md
 * - GET /Accounts/{AccountID}/Attachments -> accounts/attachments/attachments-list.omg.md
 * - GET /Accounts/{AccountID}/Attachments/{AttachmentID} -> accounts/attachments/attachment-get.omg.md
 */
function generateEndpointFilePath(
  urlPath: string,
  method: HttpMethod,
  operationId: string
): { directory: string; fileName: string } {
  // Parse path segments, separating resources from parameters
  const segments = urlPath.split('/').filter((s) => s.length > 0);

  // Identify resource segments (not path parameters)
  const resources: string[] = [];
  const params: string[] = [];

  for (const segment of segments) {
    if (segment.startsWith('{') && segment.endsWith('}')) {
      params.push(segment.slice(1, -1)); // Remove braces
    } else {
      resources.push(segment);
    }
  }

  // Build directory from ALL resources (kebab-case)
  // e.g., /Accounts -> accounts/, /Accounts/{id}/Attachments -> accounts/attachments/
  const directory =
    resources.length > 0 ? resources.map((r) => toKebabCase(r)).join('/') + '/' : '';

  // The primary resource is the last resource segment
  const primaryResource = resources.length > 0 ? resources[resources.length - 1] : 'root';

  // Generate filename using resource-action pattern
  const hasIdParam = params.length > 0;
  const singularResource = toSingular(toKebabCase(primaryResource));
  const pluralResource = toKebabCase(primaryResource);

  let resourceName: string;
  let action: string;

  switch (method) {
    case 'GET':
      if (hasIdParam) {
        resourceName = singularResource;
        action = 'get';
      } else {
        resourceName = pluralResource;
        action = 'list';
      }
      break;
    case 'POST':
      resourceName = singularResource;
      action = hasIdParam ? 'update' : 'create';
      break;
    case 'PUT':
      resourceName = singularResource;
      action = hasIdParam ? 'replace' : 'create';
      break;
    case 'PATCH':
      resourceName = singularResource;
      action = 'update';
      break;
    case 'DELETE':
      resourceName = singularResource;
      action = 'delete';
      break;
    case 'HEAD':
      resourceName = singularResource;
      action = 'head';
      break;
    case 'OPTIONS':
      resourceName = singularResource;
      action = 'options';
      break;
  }

  // If there are multiple path params, make the filename more specific
  // e.g., /Accounts/{AccountID}/Attachments/{FileName} -> attachment-get-by-filename
  let suffix = '';
  if (params.length > 1) {
    const lastParam = params[params.length - 1];
    const paramName = toKebabCase(lastParam.replace(/Id$/i, '').replace(/ID$/i, ''));
    if (paramName && paramName !== singularResource) {
      suffix = `-by-${paramName}`;
    }
  }

  // Use operationId as fallback/override if it's more descriptive
  // Check if operationId follows common patterns and use it for better names
  const operationAction = extractActionFromOperationId(operationId, primaryResource);
  if (operationAction) {
    // Parse the operationId-derived action to maintain resource-action pattern
    const parts = operationAction.match(/^(\w+)-(.+)$/);
    if (parts) {
      action = parts[1];
      resourceName = parts[2];
    }
  }

  return {
    directory,
    fileName: `${resourceName}-${action}${suffix}.omg.md`,
  };
}

/**
 * Extract action name from operationId using resource-action pattern
 * e.g., "getAccounts" -> "accounts-list", "getAccount" -> "account-get"
 */
function extractActionFromOperationId(operationId: string, resource: string): string | null {
  // Common patterns: getAccounts, createAccount, updateAccount, deleteAccount
  const patterns = [
    { regex: /^get([A-Z][a-zA-Z]*)s$/, action: 'list', plural: true }, // getAccounts -> accounts-list
    { regex: /^list([A-Z][a-zA-Z]*)$/, action: 'list', plural: true }, // listAccounts -> accounts-list
    { regex: /^get([A-Z][a-zA-Z]*)$/, action: 'get', plural: false }, // getAccount -> account-get
    { regex: /^create([A-Z][a-zA-Z]*)$/, action: 'create', plural: false }, // createAccount -> account-create
    { regex: /^update([A-Z][a-zA-Z]*)$/, action: 'update', plural: false }, // updateAccount -> account-update
    { regex: /^delete([A-Z][a-zA-Z]*)$/, action: 'delete', plural: false }, // deleteAccount -> account-delete
    { regex: /^replace([A-Z][a-zA-Z]*)$/, action: 'replace', plural: false }, // replaceAccount -> account-replace
  ];

  for (const { regex, action, plural } of patterns) {
    const match = operationId.match(regex);
    if (match) {
      let resourceName = toKebabCase(match[1]);
      if (plural && !resourceName.endsWith('s')) {
        resourceName += 's';
      }
      // Return in action-resource format so the caller can parse it
      return `${action}-${resourceName}`;
    }
  }

  // Fallback: try to parse kebab-case operationId (e.g., "get-account" -> "get-account")
  const kebab = toKebabCase(operationId);
  const verbMatch = kebab.match(/^(get|list|create|update|delete|replace|head|options)-(.+)$/);
  if (verbMatch) {
    return `${verbMatch[1]}-${verbMatch[2]}`;
  }

  return null;
}

/**
 * Convert plural to singular (simple heuristic)
 */
function toSingular(word: string): string {
  if (word.endsWith('ies')) {
    return word.slice(0, -3) + 'y';
  }
  if (word.endsWith('ses') || word.endsWith('xes') || word.endsWith('zes')) {
    return word.slice(0, -2);
  }
  if (word.endsWith('s') && !word.endsWith('ss')) {
    return word.slice(0, -1);
  }
  return word;
}

/**
 * Convert a string to kebab-case
 */
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

// ============================================
// Extension and Metadata Extraction Helpers
// ============================================

/** Known OMG-specific extensions that are handled separately */
const KNOWN_EXTENSIONS = ['x-follows', 'x-webhooks-resulting', 'x-webhooks-listen'];

/**
 * Extract vendor extensions (x-*) from an object, excluding known ones
 */
function extractExtensions(obj: Record<string, unknown>): Record<string, unknown> | undefined {
  const extensions: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('x-') && !KNOWN_EXTENSIONS.includes(key)) {
      extensions[key] = value;
    }
  }
  return Object.keys(extensions).length > 0 ? extensions : undefined;
}

/**
 * Convert OpenAPI servers to OmgServer format
 */
function convertServers(servers: OpenApiSpec['servers']): OmgServer[] | undefined {
  if (!servers || servers.length === 0) return undefined;
  return servers.map((s) => ({
    url: s.url,
    description: s.description,
    variables: s.variables,
  }));
}

/**
 * Convert OpenAPI security schemes to OMG format
 */
function convertSecuritySchemes(
  schemes: Record<string, SecuritySchemeObject | ReferenceObject> | undefined,
  spec: OpenApiSpec
): Record<string, OmgSecurityScheme> | undefined {
  if (!schemes) return undefined;

  const result: Record<string, OmgSecurityScheme> = {};
  for (const [name, schemeOrRef] of Object.entries(schemes)) {
    if (isReferenceObject(schemeOrRef)) continue;
    const scheme = schemeOrRef;
    result[name] = {
      type: scheme.type,
      description: scheme.description,
      name: scheme.name,
      in: scheme.in,
      scheme: scheme.scheme,
      bearerFormat: scheme.bearerFormat,
      flows: scheme.flows,
      openIdConnectUrl: scheme.openIdConnectUrl,
    };
  }
  return Object.keys(result).length > 0 ? result : undefined;
}

/**
 * Convert OpenAPI tags to OmgTag format
 */
function convertTags(tags: OpenApiSpec['tags']): OmgTag[] | undefined {
  if (!tags || tags.length === 0) return undefined;
  return tags.map((t) => ({
    name: t.name,
    description: t.description,
    externalDocs: t.externalDocs,
  }));
}

/**
 * Convert OpenAPI headers to OmgHeader format
 */
function convertHeaders(
  headers: Record<string, HeaderObject | ReferenceObject> | undefined,
  ctx: ConversionContext
): Record<string, OmgHeader> | undefined {
  if (!headers) return undefined;

  const result: Record<string, OmgHeader> = {};
  for (const [name, headerOrRef] of Object.entries(headers)) {
    if (isReferenceObject(headerOrRef)) continue;
    const header = headerOrRef;
    result[name] = {
      description: header.description,
      required: header.required,
      deprecated: header.deprecated,
      schema: header.schema ? convertSchema(header.schema, ctx) : undefined,
    };
  }
  return Object.keys(result).length > 0 ? result : undefined;
}

/**
 * Convert OpenAPI examples to OmgExample format
 */
function convertExamples(
  examples: Record<string, ExampleObject | ReferenceObject> | undefined
): Record<string, OmgExample> | undefined {
  if (!examples) return undefined;

  const result: Record<string, OmgExample> = {};
  for (const [name, exampleOrRef] of Object.entries(examples)) {
    if (isReferenceObject(exampleOrRef)) continue;
    const example = exampleOrRef;
    result[name] = {
      summary: example.summary,
      description: example.description,
      value: example.value,
      externalValue: example.externalValue,
    };
  }
  return Object.keys(result).length > 0 ? result : undefined;
}

/**
 * Convert OpenAPI links to OmgLink format
 */
function convertLinks(
  links: Record<string, LinkObject | ReferenceObject> | undefined
): Record<string, OmgLink> | undefined {
  if (!links) return undefined;

  const result: Record<string, OmgLink> = {};
  for (const [name, linkOrRef] of Object.entries(links)) {
    if (isReferenceObject(linkOrRef)) continue;
    const link = linkOrRef;
    result[name] = {
      operationRef: link.operationRef,
      operationId: link.operationId,
      parameters: link.parameters,
      requestBody: link.requestBody,
      description: link.description,
      server: link.server,
    };
  }
  return Object.keys(result).length > 0 ? result : undefined;
}
