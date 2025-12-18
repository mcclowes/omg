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
import type { ParsedReturnsBlock } from './types.js';
/**
 * Parse an OMG returns block with conditional responses.
 * Uses a line-based approach for reliability with complex conditions.
 */
export declare function parseReturnsBlock(input: string): ParsedReturnsBlock;
//# sourceMappingURL=returns-parser.d.ts.map