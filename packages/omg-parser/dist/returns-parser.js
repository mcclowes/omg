"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseReturnsBlock = parseReturnsBlock;
const schema_parser_js_1 = require("./schema-parser.js");
/**
 * Parse an OMG returns block with conditional responses.
 * Uses a line-based approach for reliability with complex conditions.
 */
function parseReturnsBlock(input) {
    const responses = [];
    const lines = input.split('\n');
    let currentEntry = null;
    let typeBuffer = '';
    let conditionBuffer = '';
    let inCondition = false;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        // Skip empty lines and braces
        if (!trimmed || trimmed === '{' || trimmed === '}') {
            continue;
        }
        // Check for status code line (e.g., "200: Invoice" or "204: void")
        const statusMatch = trimmed.match(/^(\d+)\s*:\s*(.*)$/);
        if (statusMatch) {
            // Save previous entry if exists
            if (currentEntry && currentEntry.statusCode !== undefined) {
                currentEntry.schema = parseTypeString(typeBuffer.trim());
                if (conditionBuffer) {
                    currentEntry.condition = conditionBuffer.trim();
                }
                responses.push(currentEntry);
            }
            // Start new entry
            currentEntry = {
                statusCode: parseInt(statusMatch[1], 10),
            };
            typeBuffer = statusMatch[2];
            conditionBuffer = '';
            inCondition = false;
            continue;
        }
        // Check for 'when' condition
        const whenMatch = trimmed.match(/^when\s+(.*)$/);
        if (whenMatch) {
            inCondition = true;
            conditionBuffer = whenMatch[1];
            continue;
        }
        // Check for description string
        const stringMatch = trimmed.match(/^["'](.*)["']$/);
        if (stringMatch && currentEntry) {
            currentEntry.description = stringMatch[1];
            inCondition = false;
            continue;
        }
        // Continue building type or condition
        if (inCondition) {
            conditionBuffer += ' ' + trimmed;
        }
        else if (currentEntry) {
            typeBuffer += ' ' + trimmed;
        }
    }
    // Save last entry
    if (currentEntry && currentEntry.statusCode !== undefined) {
        currentEntry.schema = parseTypeString(typeBuffer.trim());
        if (conditionBuffer) {
            currentEntry.condition = conditionBuffer.trim();
        }
        responses.push(currentEntry);
    }
    return { responses };
}
/**
 * Parse a type string into an OmgSchema
 */
function parseTypeString(typeStr) {
    if (!typeStr || typeStr === 'void') {
        return null;
    }
    try {
        return (0, schema_parser_js_1.parseSchema)(typeStr);
    }
    catch {
        // If parsing fails, treat as a reference
        return {
            kind: 'reference',
            name: typeStr.split(/\s/)[0], // Take first word as type name
            annotations: [],
        };
    }
}
//# sourceMappingURL=returns-parser.js.map