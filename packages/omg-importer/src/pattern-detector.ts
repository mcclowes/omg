/**
 * Pattern Detector
 *
 * Analyzes OpenAPI specs to detect repeated parameter patterns
 * suitable for extraction as partials.
 */

import type {
  OpenApiSpec,
  ParameterObject,
  PathItemObject,
  OperationObject,
  ReferenceObject,
} from './types.js';
import { isReferenceObject } from './types.js';

/**
 * Category of parameters
 */
export type ParameterCategory = 'header' | 'query' | 'path' | 'cookie';

/**
 * A detected pattern of repeated parameters
 */
export interface DetectedPattern {
  /** Canonical key for this pattern */
  key: string;
  /** Category: header, query, path, cookie */
  category: ParameterCategory;
  /** The parameter that forms this pattern */
  parameter: ParameterObject;
  /** Suggested partial name (e.g., 'xero-tenant-id') */
  suggestedName: string;
  /** Count of occurrences across all endpoints */
  occurrences: number;
  /** List of operationIds where this pattern appears */
  usedBy: string[];
}

/**
 * Options for pattern detection
 */
export interface PatternDetectionOptions {
  /** Categories to scan for patterns */
  categories: ParameterCategory[];
  /** Minimum occurrences to consider a pattern (default: 3) */
  threshold: number;
}

/**
 * Result of pattern detection
 */
export interface PatternDetectionResult {
  /** Detected patterns that meet the threshold */
  patterns: Map<string, DetectedPattern>;
}

/**
 * Generate a canonical key for a parameter
 * Parameters with same name, type, location, and constraints get same key
 */
function generatePatternKey(param: ParameterObject): string {
  const schemaPart = param.schema ? JSON.stringify(param.schema) : 'any';
  return `${param.in}:${param.name}:${param.required ? 'required' : 'optional'}:${schemaPart}`;
}

/**
 * Convert a string to kebab-case
 */
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Suggest a human-readable name for a parameter pattern
 */
function suggestPatternName(param: ParameterObject): string {
  return toKebabCase(param.name);
}

/**
 * Resolve a parameter reference to its definition
 */
function resolveParameterRef(ref: string, spec: OpenApiSpec): ParameterObject | null {
  const match = ref.match(/^#\/components\/parameters\/(.+)$/);
  if (!match) return null;

  const name = match[1];
  const param = spec.components?.parameters?.[name];

  if (!param) return null;
  if (isReferenceObject(param)) return null; // Don't follow nested refs

  return param;
}

/**
 * Resolve a parameter, following $ref if needed
 */
function resolveParameter(
  paramOrRef: ParameterObject | ReferenceObject,
  spec: OpenApiSpec
): ParameterObject | null {
  if (isReferenceObject(paramOrRef)) {
    return resolveParameterRef(paramOrRef.$ref, spec);
  }
  return paramOrRef;
}

/**
 * Detect repeated parameter patterns across all operations
 */
export function detectPatterns(
  spec: OpenApiSpec,
  options: PatternDetectionOptions
): PatternDetectionResult {
  const patternCounts = new Map<
    string,
    {
      parameter: ParameterObject;
      occurrences: number;
      usedBy: string[];
    }
  >();

  const paths = spec.paths || {};
  const categorySet = new Set(options.categories);

  for (const [path, pathItem] of Object.entries(paths)) {
    if (!pathItem) continue;

    // Get path-level parameters
    const pathParams = (pathItem.parameters || [])
      .map((p) => resolveParameter(p, spec))
      .filter((p): p is ParameterObject => p !== null);

    const methods: (keyof PathItemObject)[] = [
      'get',
      'post',
      'put',
      'patch',
      'delete',
      'head',
      'options',
    ];

    for (const method of methods) {
      const operation = pathItem[method] as OperationObject | undefined;
      if (!operation) continue;

      const operationId = operation.operationId || `${method.toUpperCase()}-${path}`;

      // Get operation-level parameters
      const opParams = (operation.parameters || [])
        .map((p) => resolveParameter(p, spec))
        .filter((p): p is ParameterObject => p !== null);

      // Combine path and operation parameters
      const allParams = [...pathParams, ...opParams];

      // Filter by category and process each parameter
      for (const param of allParams) {
        if (!categorySet.has(param.in as ParameterCategory)) continue;

        const key = generatePatternKey(param);

        if (!patternCounts.has(key)) {
          patternCounts.set(key, {
            parameter: param,
            occurrences: 0,
            usedBy: [],
          });
        }

        const entry = patternCounts.get(key)!;
        entry.occurrences++;
        if (!entry.usedBy.includes(operationId)) {
          entry.usedBy.push(operationId);
        }
      }
    }
  }

  // Filter to patterns meeting threshold and build result
  const patterns = new Map<string, DetectedPattern>();

  for (const [key, entry] of patternCounts) {
    if (entry.occurrences >= options.threshold) {
      patterns.set(key, {
        key,
        category: entry.parameter.in as ParameterCategory,
        parameter: entry.parameter,
        suggestedName: suggestPatternName(entry.parameter),
        occurrences: entry.occurrences,
        usedBy: entry.usedBy,
      });
    }
  }

  return { patterns };
}

/**
 * Find which patterns a set of parameters matches
 * Returns the matching pattern keys and any remaining unmatched parameters
 */
export function findMatchingPatterns(
  params: ParameterObject[],
  patterns: Map<string, DetectedPattern>
): {
  matchedPatternKeys: string[];
  remainingParams: ParameterObject[];
} {
  const matchedPatternKeys: string[] = [];
  const remainingParams: ParameterObject[] = [];

  for (const param of params) {
    const key = generatePatternKey(param);
    if (patterns.has(key)) {
      matchedPatternKeys.push(key);
    } else {
      remainingParams.push(param);
    }
  }

  return { matchedPatternKeys, remainingParams };
}
