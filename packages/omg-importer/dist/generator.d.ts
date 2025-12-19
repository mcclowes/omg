/**
 * OMG File Generator
 *
 * Generates .omg.md file content from OmgDocument structures.
 */
import type { OmgDocument, OmgSchema, OmgType } from 'omg-parser';
/**
 * Generator options
 */
export interface GeneratorOptions {
    /** Indentation size (default: 2) */
    indent?: number;
    /** Use JSON-style syntax for schemas (default: false for cleaner OMG style) */
    jsonStyle?: boolean;
}
/**
 * Generate .omg.md file content from an OmgDocument
 */
export declare function generateDocument(doc: OmgDocument, options?: GeneratorOptions): string;
/**
 * Generate OMG schema syntax from an OmgType
 */
export declare function generateSchema(type: OmgType, opts: GeneratorOptions, depth: number): string;
/**
 * Generate multiple documents with proper file structure
 */
export interface GeneratedFiles {
    path: string;
    content: string;
}
/**
 * Generate all files from an import result
 */
export declare function generateFiles(api: OmgDocument, endpoints: OmgDocument[], types: Map<string, {
    schema: OmgSchema;
    document: OmgDocument;
}>, options?: GeneratorOptions): GeneratedFiles[];
//# sourceMappingURL=generator.d.ts.map