/**
 * omg-parser
 *
 * Parser for OMG (OpenAPI Markdown Grammar) files.
 */

// Types
export type {
  HttpMethod,
  EndpointFrontMatter,
  ApiFrontMatter,
  OmgBlockType,
  OmgBlock,
  PartialRef,
  OmgDocument,
  OmgType,
  OmgTypeMetadata,
  OmgPrimitive,
  OmgObject,
  OmgArray,
  OmgEnum,
  OmgUnion,
  OmgIntersection,
  OmgReference,
  OmgAnnotation,
  OmgSchema,
  ParsedEndpoint,
  ParsedApi,
  ParsedResponse,
  ParsedReturnEntry,
  ParsedReturnsBlock,
  ParseWarning,
  WhenCondition,
  EndpointWebhooks,
  // New OpenAPI preservation types
  OmgServer,
  OmgServerVariable,
  OmgSecurityScheme,
  OmgOAuthFlows,
  OmgOAuthFlow,
  OmgSecurityRequirement,
  OmgExternalDocs,
  OmgExample,
  OmgHeader,
  OmgTag,
  OmgLicense,
  OmgLink,
} from './types.js';

// Document parsing
export { parseDocument, parseHttpBlock } from './document-parser.js';

// Schema parsing
export { parseSchema, inferSchemaFromJson } from './schema-parser.js';

// Returns block parsing
export { parseReturnsBlock } from './returns-parser.js';
export type { ParseReturnsResult } from './returns-parser.js';

// Resolution
export { resolveDocument, buildEndpoint, buildEndpoints, loadApi } from './resolver.js';
export type { ResolvedDocument } from './resolver.js';

// Formatter
export { formatDocument } from './formatter.js';
export type { FormatOptions } from './formatter.js';

// Type index (for IDE features)
export { buildTypeIndex, findTypeDefinition, getTypeNames } from './type-index.js';
export type { TypeDefinition, TypeIndex } from './type-index.js';

// Type serializer (for hover display)
export { serializeType, formatTypeForHover } from './type-serializer.js';
