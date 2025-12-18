/**
 * Document Parser
 *
 * Parses .omg.md files into an OmgDocument structure:
 * - Extracts front matter (YAML between ---)
 * - Extracts title (first # heading)
 * - Extracts description (prose content)
 * - Extracts code blocks by language tag
 * - Extracts partial references ({{> path }})
 */
import type { OmgDocument } from './types.js';
/**
 * Parse a .omg.md file into an OmgDocument
 */
export declare function parseDocument(content: string, filePath: string): OmgDocument;
/**
 * Parse the http block to extract method and path
 * Format: "GET /path/to/resource"
 */
export declare function parseHttpBlock(content: string): {
    method: string;
    path: string;
} | null;
//# sourceMappingURL=document-parser.d.ts.map