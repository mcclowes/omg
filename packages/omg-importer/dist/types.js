/**
 * OpenAPI 3.x Types for Import
 *
 * Simplified type definitions for parsing OpenAPI specifications.
 */
/**
 * Type guard to check if an object is a ReferenceObject
 */
export function isReferenceObject(obj) {
    return typeof obj === 'object' && obj !== null && '$ref' in obj;
}
//# sourceMappingURL=types.js.map