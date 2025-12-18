/**
 * Returns Block Parser
 *
 * Parses OMG returns block syntax with conditional responses.
 *
 * Syntax:
 * ```omg.returns
 * {
 *   204: void
 *     when exists(invoiceId) && status in [Draft, Void]
 *     "Invoice successfully deleted"
 *
 *   404: NotFoundError
 *     when !exists(invoiceId)
 *     "Invoice does not exist"
 *
 *   409: ConflictError
 *     when exists(invoiceId) && status in [Sent, Paid]
 *     "Cannot delete invoice in ${status} status"
 * }
 * ```
 */
import type { ParsedReturnsBlock, ParseWarning } from './types.js';
/**
 * Result of parsing a returns block, including any warnings
 */
export interface ParseReturnsResult {
    block: ParsedReturnsBlock;
    warnings: ParseWarning[];
}
/**
 * Parse an OMG returns block with conditional responses.
 * Uses a line-based approach for reliability with complex conditions.
 *
 * @returns ParseReturnsResult containing the parsed block and any warnings
 */
export declare function parseReturnsBlock(input: string): ParseReturnsResult;
//# sourceMappingURL=returns-parser.d.ts.map