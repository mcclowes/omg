/**
 * omg-importer
 *
 * Import OpenAPI specifications to OMG format.
 */
export { importOpenApi } from './importer.js';
export type { ImportResult, ImportWarning, ImportOptions } from './importer.js';
export { convertSchema, createConversionContext, getReferencedSchemas, } from './schema-converter.js';
export type { ConversionContext } from './schema-converter.js';
export { generateDocument, generateSchema, generateFiles } from './generator.js';
export type { GeneratorOptions, GeneratedFiles } from './generator.js';
export type { OpenApiSpec, InfoObject, PathItemObject, OperationObject, ParameterObject, RequestBodyObject, ResponseObject, SchemaObject, ReferenceObject, ComponentsObject, } from './types.js';
export { isReferenceObject } from './types.js';
//# sourceMappingURL=index.d.ts.map