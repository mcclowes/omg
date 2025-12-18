/**
 * Output Formatters
 *
 * Serialize OpenAPI spec to YAML or JSON.
 */
import type { OpenApiSpec } from './openapi.js';
export type OutputFormat = 'yaml' | 'json';
/**
 * Serialize OpenAPI spec to string
 */
export declare function serialize(spec: OpenApiSpec, format: OutputFormat): string;
/**
 * Detect format from file extension
 */
export declare function detectFormat(filename: string): OutputFormat;
//# sourceMappingURL=output.d.ts.map