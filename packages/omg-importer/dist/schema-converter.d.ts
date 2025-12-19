/**
 * Schema Converter
 *
 * Converts OpenAPI schemas to OMG type representations.
 */
import type { OmgType } from 'omg-parser';
import type { SchemaObject, ReferenceObject } from './types.js';
/**
 * Context for schema conversion
 */
export interface ConversionContext {
    /** Component schemas for resolving references */
    schemas: Record<string, SchemaObject | ReferenceObject>;
    /** Track which refs we're currently resolving (for cycle detection) */
    resolving: Set<string>;
    /** Whether to inline referenced schemas or use references */
    inlineRefs: boolean;
}
/**
 * Create a default conversion context
 */
export declare function createConversionContext(schemas?: Record<string, SchemaObject | ReferenceObject>, options?: {
    inlineRefs?: boolean;
}): ConversionContext;
/**
 * Convert an OpenAPI schema to an OMG type
 */
export declare function convertSchema(schema: SchemaObject | ReferenceObject, ctx: ConversionContext): OmgType;
/**
 * Get all referenced schema names from a type (recursively)
 */
export declare function getReferencedSchemas(type: OmgType): Set<string>;
//# sourceMappingURL=schema-converter.d.ts.map