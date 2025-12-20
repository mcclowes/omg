/**
 * Response Validator
 *
 * Uses ajv (JSON Schema validator) to validate API responses against OpenAPI schemas.
 * This is the "wrapper around existing tools" approach - ajv is battle-tested.
 */
import type { CheckResult, SchemaSpec } from './types.js';
/**
 * Validate a response body against a JSON Schema
 */
export declare function validateResponse(body: unknown, schema: SchemaSpec, statusCode: number): CheckResult[];
/**
 * Validate that a status code matches expected
 */
export declare function validateStatusCode(actual: number, expected: number[], hasDefaultResponse: boolean): CheckResult;
/**
 * Validate required fields are present
 */
export declare function validateRequiredFields(body: unknown, schema: SchemaSpec): CheckResult[];
//# sourceMappingURL=validator.d.ts.map