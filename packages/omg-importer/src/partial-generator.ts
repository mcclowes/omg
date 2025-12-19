/**
 * Partial Generator
 *
 * Generates partial .omg.md documents from detected patterns.
 */

import type { OmgDocument, OmgBlock, OmgBlockType, OmgSchema } from 'omg-parser';
import type { DetectedPattern, ParameterCategory } from './pattern-detector.js';
import { convertSchema, type ConversionContext } from './schema-converter.js';

/**
 * A generated partial with its metadata
 */
export interface GeneratedPartial {
  /** Relative path for partial reference (e.g., 'headers/xero-tenant-id') */
  path: string;
  /** The partial document */
  document: OmgDocument;
  /** The pattern key this partial represents */
  patternKey: string;
}

/**
 * Options for partial generation
 */
export interface PartialGeneratorOptions {
  /** Base directory for output */
  baseDir: string;
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
 * Convert a kebab-case string to title case
 */
function toTitleCase(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get the directory for a parameter category
 */
function getCategoryDir(category: ParameterCategory): string {
  switch (category) {
    case 'header':
      return 'headers';
    case 'query':
      return 'query';
    case 'path':
      return 'path';
    case 'cookie':
      return 'cookies';
    default:
      return 'params';
  }
}

/**
 * Get the OMG block type for a parameter category
 */
function getBlockType(category: ParameterCategory): OmgBlockType {
  switch (category) {
    case 'header':
      return 'omg.headers';
    case 'query':
      return 'omg.query';
    case 'path':
      return 'omg.path';
    default:
      return 'omg.query';
  }
}

/**
 * Convert a single parameter to an OmgSchema (object with one property)
 */
function parameterToSchema(pattern: DetectedPattern, ctx: ConversionContext): OmgSchema {
  const param = pattern.parameter;
  let paramSchema: OmgSchema;

  if (param.schema) {
    paramSchema = convertSchema(param.schema, ctx);
  } else {
    paramSchema = {
      kind: 'primitive',
      type: 'string',
      annotations: [],
    };
  }

  // Mark as optional if not required
  if (!param.required) {
    paramSchema.optional = true;
  }

  // Add description
  if (param.description) {
    paramSchema.description = param.description;
  }

  // Wrap in object
  return {
    kind: 'object',
    properties: {
      [param.name]: paramSchema,
    },
    annotations: [],
  };
}

/**
 * Ensure a name is unique by adding a suffix if needed
 */
function ensureUniqueName(name: string, usedNames: Set<string>): string {
  if (!usedNames.has(name)) {
    return name;
  }

  let counter = 2;
  while (usedNames.has(`${name}-${counter}`)) {
    counter++;
  }
  return `${name}-${counter}`;
}

/**
 * Generate partial documents from detected patterns
 */
export function generatePartials(
  patterns: Map<string, DetectedPattern>,
  ctx: ConversionContext,
  options: PartialGeneratorOptions
): GeneratedPartial[] {
  const partials: GeneratedPartial[] = [];
  const usedNames = new Set<string>();

  for (const [key, pattern] of patterns) {
    // Generate unique name
    let name = pattern.suggestedName;
    name = ensureUniqueName(name, usedNames);
    usedNames.add(name);

    // Determine partial path based on category
    const categoryDir = getCategoryDir(pattern.category);
    const partialPath = `${categoryDir}/${name}`;

    // Generate the schema
    const schema = parameterToSchema(pattern, ctx);

    // Generate the block
    const blockType = getBlockType(pattern.category);
    const block: OmgBlock = {
      type: blockType,
      content: '',
      parsed: schema,
      line: 0,
    };

    // Generate title from pattern name
    const title = toTitleCase(name);

    // Create the document
    const document: OmgDocument = {
      filePath: `${options.baseDir}/partials/${partialPath}.omg.md`,
      frontMatter: null,
      title,
      description: `Common ${pattern.category} parameter used by ${pattern.occurrences} endpoints.`,
      blocks: [block],
      partials: [],
    };

    partials.push({
      path: partialPath,
      document,
      patternKey: key,
    });
  }

  return partials;
}

/**
 * Build a mapping from pattern key to partial path
 */
export function buildPatternToPartialMap(partials: GeneratedPartial[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const partial of partials) {
    map.set(partial.patternKey, partial.path);
  }
  return map;
}
