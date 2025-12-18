/**
 * OMG Formatter
 *
 * Formats .omg.md files for consistent style:
 * - Normalizes YAML frontmatter
 * - Formats OMG schema blocks with consistent indentation
 * - Preserves markdown prose and JSON example blocks
 */
export interface FormatOptions {
    /** Indentation size (default: 2) */
    indent?: number;
    /** Sort frontmatter keys (default: true) */
    sortFrontmatter?: boolean;
    /** Frontmatter key order */
    frontmatterOrder?: string[];
}
/**
 * Format an OMG document
 */
export declare function formatDocument(content: string, options?: FormatOptions): string;
//# sourceMappingURL=formatter.d.ts.map