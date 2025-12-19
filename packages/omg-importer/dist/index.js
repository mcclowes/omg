/**
 * omg-importer
 *
 * Import OpenAPI specifications to OMG format.
 */
// Main importer
export { importOpenApi } from './importer.js';
// Schema converter
export { convertSchema, createConversionContext, getReferencedSchemas, } from './schema-converter.js';
// Generator
export { generateDocument, generateSchema, generateFiles } from './generator.js';
export { isReferenceObject } from './types.js';
//# sourceMappingURL=index.js.map