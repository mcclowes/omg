/**
 * Resolver
 *
 * Resolves partials and builds the complete API from multiple .omg.md files.
 */
import type { OmgDocument, OmgBlock, ParsedEndpoint, ParsedApi } from './types.js';
interface ResolverOptions {
    basePath: string;
}
export interface ResolvedDocument extends OmgDocument {
    resolvedBlocks: OmgBlock[];
}
/**
 * Resolve a single document, loading and inlining partials
 */
export declare function resolveDocument(doc: OmgDocument, options: ResolverOptions, visited?: Set<string>): ResolvedDocument;
/**
 * Extract type name from omg.type block content
 *
 * Supports:
 * - type TypeName { ... }
 * - type TypeName = ...
 */
export declare function extractTypeName(content: string): string | null;
/**
 * Build a ParsedEndpoint from a resolved document
 */
export declare function buildEndpoint(doc: ResolvedDocument): ParsedEndpoint | null;
/**
 * Load and parse an entire API from a directory
 */
export declare function loadApi(rootPath: string): ParsedApi;
export {};
//# sourceMappingURL=resolver.d.ts.map