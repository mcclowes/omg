/**
 * OMG File Generator
 *
 * Generates .omg.md file content from OmgDocument structures.
 */

import type {
  OmgDocument,
  EndpointFrontMatter,
  ApiFrontMatter,
  OmgBlock,
  OmgSchema,
  OmgType,
  OmgPrimitive,
  OmgObject,
  OmgArray,
  OmgEnum,
  OmgUnion,
  OmgIntersection,
  OmgReference,
  OmgAnnotation,
} from 'omg-parser';
import YAML from 'yaml';

/**
 * Generator options
 */
export interface GeneratorOptions {
  /** Indentation size (default: 2) */
  indent?: number;
  /** Use JSON-style syntax for schemas (default: false for cleaner OMG style) */
  jsonStyle?: boolean;
}

const DEFAULT_OPTIONS: GeneratorOptions = {
  indent: 2,
  jsonStyle: false,
};

/**
 * Generate .omg.md file content from an OmgDocument
 */
export function generateDocument(doc: OmgDocument, options: GeneratorOptions = {}): string {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const parts: string[] = [];

  // Generate front matter
  if (doc.frontMatter) {
    parts.push(generateFrontMatter(doc.frontMatter));
  }

  // Generate title
  if (doc.title) {
    parts.push(`# ${doc.title}\n`);
  }

  // Generate description
  if (doc.description) {
    parts.push(`${doc.description}\n`);
  }

  // Generate code blocks
  for (const block of doc.blocks) {
    parts.push(generateBlock(block, opts));
  }

  // Generate partial references
  for (const partial of doc.partials) {
    parts.push(`{{> ${partial.path} }}\n`);
  }

  return parts.join('\n').trim() + '\n';
}

/**
 * Generate YAML front matter
 */
function generateFrontMatter(fm: EndpointFrontMatter | ApiFrontMatter): string {
  // Clean up undefined values
  const cleaned = JSON.parse(JSON.stringify(fm));

  const yaml = YAML.stringify(cleaned, {
    indent: 2,
    lineWidth: 0, // Don't wrap lines
  }).trim();

  return `---\n${yaml}\n---\n`;
}

/**
 * Generate a code block
 */
function generateBlock(block: OmgBlock, opts: GeneratorOptions): string {
  const lang = getBlockLanguage(block);
  let content = '';

  if (block.parsed) {
    if (block.type === 'omg.type') {
      // For type blocks, include the type name
      const typeName = extractTypeName(block);
      content = generateTypeDefinition(typeName, block.parsed, opts);
    } else {
      content = generateSchema(block.parsed, opts, 0);
    }
  } else if (block.content) {
    content = block.content;
  }

  return '```' + lang + '\n' + content + '\n```\n';
}

/**
 * Get the code block language tag
 */
function getBlockLanguage(block: OmgBlock): string {
  if (block.statusCode !== undefined) {
    return `omg.response.${block.statusCode}`;
  }
  return block.type;
}

/**
 * Extract type name from block (for omg.type blocks)
 */
function extractTypeName(block: OmgBlock): string | null {
  // Try to extract from content if it has "type Name = ..."
  if (block.content) {
    const match = block.content.match(/^type\s+(\w+)\s*=/);
    if (match) return match[1];
  }
  return null;
}

/**
 * Generate a type definition (type Name = Schema)
 */
function generateTypeDefinition(
  name: string | null,
  schema: OmgSchema,
  opts: GeneratorOptions
): string {
  const schemaStr = generateSchema(schema, opts, 0);
  if (name) {
    return `type ${name} = ${schemaStr}`;
  }
  return schemaStr;
}

/**
 * Generate OMG schema syntax from an OmgType
 */
export function generateSchema(type: OmgType, opts: GeneratorOptions, depth: number): string {
  const indent = ' '.repeat(opts.indent || 2);
  const baseIndent = indent.repeat(depth);
  const innerIndent = indent.repeat(depth + 1);

  switch (type.kind) {
    case 'primitive':
      return generatePrimitive(type);

    case 'object':
      return generateObject(type, opts, depth);

    case 'array':
      return generateArray(type, opts, depth);

    case 'enum':
      return generateEnum(type);

    case 'union':
      return generateUnion(type, opts, depth);

    case 'intersection':
      return generateIntersection(type, opts, depth);

    case 'reference':
      return generateReference(type);

    default:
      return 'any';
  }
}

/**
 * Generate primitive type
 */
function generatePrimitive(type: OmgPrimitive): string {
  let result = type.type;

  // Add annotations
  result += generateAnnotations(type.annotations);

  // Handle nullable
  if (type.nullable) {
    result += ' | null';
  }

  return result;
}

/**
 * Check if a property name needs to be quoted
 */
function needsQuoting(name: string): boolean {
  // Quote if contains non-identifier characters or starts with a digit
  return !/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name);
}

/**
 * Quote a property name if needed
 */
function quoteName(name: string): string {
  if (needsQuoting(name)) {
    return `"${name}"`;
  }
  return name;
}

/**
 * Generate object type
 */
function generateObject(type: OmgObject, opts: GeneratorOptions, depth: number): string {
  const entries = Object.entries(type.properties);

  if (entries.length === 0) {
    return '{}';
  }

  const indent = ' '.repeat(opts.indent || 2);
  const baseIndent = indent.repeat(depth);
  const innerIndent = indent.repeat(depth + 1);

  const lines: string[] = ['{'];

  for (const [name, propType] of entries) {
    const quotedName = quoteName(name);
    const optional = propType.optional ? '?' : '';
    const value = generateSchema(propType, opts, depth + 1);
    const comment = propType.description ? `  // ${propType.description}` : '';

    // For simple types, put on one line
    if (isSimpleType(propType)) {
      lines.push(`${innerIndent}${quotedName}${optional}: ${value}${comment}`);
    } else {
      // For complex types, format appropriately
      lines.push(`${innerIndent}${quotedName}${optional}: ${value}${comment}`);
    }
  }

  lines.push(`${baseIndent}}`);

  // Add nullable
  let result = lines.join('\n');
  if (type.nullable) {
    result += ' | null';
  }

  return result;
}

/**
 * Generate array type
 */
function generateArray(type: OmgArray, opts: GeneratorOptions, depth: number): string {
  const itemsStr = generateSchema(type.items, opts, depth);

  // For simple item types, use suffix notation
  if (isSimpleType(type.items) && !itemsStr.includes('\n')) {
    let result = `${itemsStr}[]`;
    result += generateAnnotations(type.annotations);
    if (type.nullable) {
      result += ' | null';
    }
    return result;
  }

  // For complex types, use array literal with single item
  const indent = ' '.repeat(opts.indent || 2);
  const baseIndent = indent.repeat(depth);
  const innerIndent = indent.repeat(depth + 1);

  let result = `[${itemsStr}]`;
  result += generateAnnotations(type.annotations);
  if (type.nullable) {
    result += ' | null';
  }

  return result;
}

/**
 * Generate enum type
 */
function generateEnum(type: OmgEnum): string {
  const values = type.values.map((v) => {
    if (typeof v === 'string') return `"${v}"`;
    return String(v);
  });

  let result = values.join(' | ');

  result += generateAnnotations(type.annotations);

  if (type.nullable) {
    result += ' | null';
  }

  return result;
}

/**
 * Generate union type
 */
function generateUnion(type: OmgUnion, opts: GeneratorOptions, depth: number): string {
  const parts = type.types.map((t) => generateSchema(t, opts, depth));

  let result: string;
  if (parts.every((p) => !p.includes('\n'))) {
    result = parts.join(' | ');
  } else {
    result = parts.join(' | ');
  }

  result += generateAnnotations(type.annotations);

  if (type.nullable && !result.includes('null')) {
    result += ' | null';
  }

  return result;
}

/**
 * Generate intersection type
 */
function generateIntersection(
  type: OmgIntersection,
  opts: GeneratorOptions,
  depth: number
): string {
  const parts = type.types.map((t) => generateSchema(t, opts, depth));

  let result = parts.join(' & ');
  result += generateAnnotations(type.annotations);

  if (type.nullable) {
    result = `(${result}) | null`;
  }

  return result;
}

/**
 * Generate reference type
 */
function generateReference(type: OmgReference): string {
  let result = type.name;
  result += generateAnnotations(type.annotations);

  if (type.nullable) {
    result += ' | null';
  }

  return result;
}

/**
 * Generate annotations string
 */
function generateAnnotations(annotations: OmgAnnotation[]): string {
  if (!annotations || annotations.length === 0) {
    return '';
  }

  const parts = annotations.map((ann) => {
    if (ann.args.length === 0) {
      return `@${ann.name}`;
    }

    const args = ann.args.map((arg) => {
      if (typeof arg === 'string') {
        // Check if it's a regex pattern
        if (ann.name === 'pattern') {
          return `"${arg}"`;
        }
        return `"${arg}"`;
      }
      return String(arg);
    });

    return `@${ann.name}(${args.join(', ')})`;
  });

  return ' ' + parts.join(' ');
}

/**
 * Check if a type is simple (single line)
 */
function isSimpleType(type: OmgType): boolean {
  switch (type.kind) {
    case 'primitive':
    case 'reference':
      return true;
    case 'enum':
      return type.values.length <= 4;
    case 'array':
      return isSimpleType(type.items);
    case 'union':
    case 'intersection':
      return type.types.length <= 2 && type.types.every(isSimpleType);
    case 'object':
      return Object.keys(type.properties).length === 0;
    default:
      return false;
  }
}

/**
 * Generate multiple documents with proper file structure
 */
export interface GeneratedFiles {
  path: string;
  content: string;
}

/**
 * Generate all files from an import result
 */
export function generateFiles(
  api: OmgDocument,
  endpoints: OmgDocument[],
  types: Map<string, { schema: OmgSchema; document: OmgDocument }>,
  options: GeneratorOptions = {}
): GeneratedFiles[] {
  const files: GeneratedFiles[] = [];

  // Generate API root
  files.push({
    path: api.filePath,
    content: generateDocument(api, options),
  });

  // Generate endpoints
  for (const endpoint of endpoints) {
    files.push({
      path: endpoint.filePath,
      content: generateDocument(endpoint, options),
    });
  }

  // Generate individual type files
  if (types.size > 0) {
    // Derive base directory from API file path
    const baseDir = api.filePath.replace(/\/api\.omg\.md$/, '').replace(/api\.omg\.md$/, '') || '.';

    for (const [name, { schema }] of types) {
      const fileName = toKebabCase(name) + '.omg.md';
      const content = generateSingleTypeFile(name, schema, options);
      files.push({
        path: `${baseDir}/types/${fileName}`,
        content,
      });
    }
  }

  return files;
}

/**
 * Generate a single type definition file
 */
function generateSingleTypeFile(
  name: string,
  schema: OmgSchema,
  options: GeneratorOptions
): string {
  const parts: string[] = [];

  // Title
  parts.push(`# ${name}\n`);

  // Type definition
  const schemaStr = generateSchema(schema, options, 0);
  parts.push('```omg.type');
  parts.push(`type ${name} = ${schemaStr}`);
  parts.push('```\n');

  return parts.join('\n').trim() + '\n';
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
