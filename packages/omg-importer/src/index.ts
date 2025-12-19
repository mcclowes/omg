/**
 * omg-importer
 *
 * Import OpenAPI specifications to OMG format.
 */

// Main importer
export { importOpenApi } from './importer.js';
export type { ImportResult, ImportWarning, ImportOptions } from './importer.js';

// Schema converter
export {
  convertSchema,
  createConversionContext,
  getReferencedSchemas,
} from './schema-converter.js';
export type { ConversionContext } from './schema-converter.js';

// Generator
export { generateDocument, generateSchema, generateFiles } from './generator.js';
export type { GeneratorOptions, GeneratedFiles } from './generator.js';

// OpenAPI types
export type {
  OpenApiSpec,
  InfoObject,
  PathItemObject,
  OperationObject,
  ParameterObject,
  RequestBodyObject,
  ResponseObject,
  SchemaObject,
  ReferenceObject,
  ComponentsObject,
} from './types.js';
export { isReferenceObject } from './types.js';
