/**
 * Schema Parser
 *
 * Parses OMG schema syntax (JSON-like + type annotations) into OmgSchema.
 *
 * Supports:
 * - JSON literals: { id: "123", name: "Test" }
 * - Type annotations: { id: string, name: string @maxLength(200) }
 * - Enums: "draft" | "sent" | "paid"
 * - Optional: string?
 * - Nullable: string | null
 * - Arrays: [{ id: string }]
 * - Nested objects
 * - Comments: // inline comments
 *
 * Field names can be unquoted identifiers (preferred) or quoted strings.
 */
import type { OmgSchema } from './types.js';
/**
 * Parse OMG schema syntax into an OmgSchema
 */
export declare function parseSchema(input: string): OmgSchema;
/**
 * Infer schema from a pure JSON example
 */
export declare function inferSchemaFromJson(json: unknown): OmgSchema;
//# sourceMappingURL=schema-parser.d.ts.map