/**
 * Output Formatters
 *
 * Serialize OpenAPI spec to YAML or JSON.
 */

import YAML from 'yaml';
import type { OpenApiSpec } from './openapi.js';

export type OutputFormat = 'yaml' | 'json';

/**
 * Serialize OpenAPI spec to string
 */
export function serialize(spec: OpenApiSpec, format: OutputFormat): string {
  switch (format) {
    case 'yaml':
      return YAML.stringify(spec, {
        indent: 2,
        lineWidth: 0, // Don't wrap lines
        defaultStringType: 'QUOTE_DOUBLE',
        defaultKeyType: 'PLAIN',
      });

    case 'json':
      return JSON.stringify(spec, null, 2);

    default:
      throw new Error(`Unknown format: ${format}`);
  }
}

/**
 * Detect format from file extension
 */
export function detectFormat(filename: string): OutputFormat {
  if (filename.endsWith('.json')) {
    return 'json';
  }
  return 'yaml';
}
