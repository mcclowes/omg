/**
 * OpenAPI to OMG Importer
 *
 * Converts OpenAPI 3.x specifications to OMG document structure.
 */
import type { OmgDocument, OmgSchema } from 'omg-parser';
import type { OpenApiSpec } from './types.js';
/**
 * Result of importing an OpenAPI spec
 */
export interface ImportResult {
    /** Root API document */
    api: OmgDocument;
    /** Individual endpoint documents */
    endpoints: OmgDocument[];
    /** Named type definitions (from components/schemas) */
    types: Map<string, {
        schema: OmgSchema;
        document: OmgDocument;
    }>;
    /** Warnings encountered during import */
    warnings: ImportWarning[];
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
}
/**
 * Import an OpenAPI specification to OMG format
 */
export declare function importOpenApi(spec: OpenApiSpec, options?: ImportOptions): ImportResult;
//# sourceMappingURL=importer.d.ts.map