/**
 * @omg/parser
 *
 * Parser for OMG (OpenAPI Markdown Grammar) files.
 */
export type { HttpMethod, EndpointFrontMatter, ApiFrontMatter, OmgBlockType, OmgBlock, PartialRef, OmgDocument, OmgType, OmgPrimitive, OmgObject, OmgArray, OmgEnum, OmgUnion, OmgIntersection, OmgReference, OmgAnnotation, OmgSchema, ParsedEndpoint, ParsedApi, ParsedResponse, ParsedReturnEntry, ParsedReturnsBlock, } from './types.js';
export { parseDocument, parseHttpBlock } from './document-parser.js';
export { parseSchema, inferSchemaFromJson } from './schema-parser.js';
export { parseReturnsBlock } from './returns-parser.js';
export { resolveDocument, buildEndpoint, loadApi } from './resolver.js';
export type { ResolvedDocument } from './resolver.js';
//# sourceMappingURL=index.d.ts.map