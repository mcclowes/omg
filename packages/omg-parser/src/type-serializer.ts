/**
 * Type Serializer
 *
 * Converts OmgSchema AST back to human-readable OMG syntax for IDE hover display.
 */

import type { OmgSchema, OmgType, OmgAnnotation } from './types.js';

/**
 * Serialize an OmgSchema to readable OMG syntax
 */
export function serializeType(schema: OmgSchema, indent: number = 0): string {
  const prefix = '  '.repeat(indent);

  switch (schema.kind) {
    case 'primitive':
      return serializePrimitive(schema.type, schema);

    case 'reference':
      return serializeWithMetadata(schema.name, schema);

    case 'array':
      return serializeWithMetadata(`${serializeType(schema.items)}[]`, schema);

    case 'enum':
      const enumValues = schema.values.map((v) => (typeof v === 'string' ? `"${v}"` : String(v)));
      return serializeWithMetadata(enumValues.join(' | '), schema);

    case 'union':
      const unionTypes = schema.types.map((t) => serializeType(t));
      return serializeWithMetadata(unionTypes.join(' | '), schema);

    case 'intersection':
      const intersectionTypes = schema.types.map((t) => serializeType(t));
      return serializeWithMetadata(intersectionTypes.join(' & '), schema);

    case 'object':
      return serializeObject(schema, indent);

    default:
      return 'unknown';
  }
}

/**
 * Serialize a primitive type with optional metadata
 */
function serializePrimitive(
  type: string,
  metadata: { optional?: boolean; nullable?: boolean; annotations: OmgAnnotation[] }
): string {
  return serializeWithMetadata(type, metadata);
}

/**
 * Add optional marker and annotations to a type string
 */
function serializeWithMetadata(
  typeStr: string,
  metadata: { optional?: boolean; nullable?: boolean; annotations: OmgAnnotation[] }
): string {
  let result = typeStr;

  if (metadata.optional) {
    // For simple types, add ? suffix; handled differently for object properties
  }

  if (metadata.annotations.length > 0) {
    const annotationStrs = metadata.annotations.map(serializeAnnotation);
    result += ' ' + annotationStrs.join(' ');
  }

  return result;
}

/**
 * Serialize an annotation
 */
function serializeAnnotation(annotation: OmgAnnotation): string {
  if (annotation.args.length === 0) {
    return `@${annotation.name}`;
  }

  const args = annotation.args.map((arg) => (typeof arg === 'string' ? `"${arg}"` : String(arg)));
  return `@${annotation.name}(${args.join(', ')})`;
}

/**
 * Serialize an object type
 */
function serializeObject(
  obj: OmgType & { kind: 'object'; properties: Record<string, OmgType> },
  indent: number
): string {
  const entries = Object.entries(obj.properties);

  if (entries.length === 0) {
    return '{}';
  }

  const prefix = '  '.repeat(indent);
  const innerPrefix = '  '.repeat(indent + 1);

  const lines = entries.map(([key, value]) => {
    const optionalMarker = value.optional ? '?' : '';
    const typeStr = serializeType(value, indent + 1);

    // Add description as comment if present
    const comment = value.description ? `  // ${value.description}` : '';

    return `${innerPrefix}${key}${optionalMarker}: ${typeStr}${comment}`;
  });

  return `{\n${lines.join(',\n')}\n${prefix}}`;
}

/**
 * Format a type definition for hover display with title and source info
 */
export function formatTypeForHover(name: string, schema: OmgSchema, filePath?: string): string {
  const parts: string[] = [`**${name}**`];

  if (filePath) {
    // Extract just the filename for brevity
    const fileName = filePath.split('/').pop() || filePath;
    parts.push(`\nDefined in \`${fileName}\``);
  }

  parts.push(`\n\`\`\`omg\n${serializeType(schema)}\n\`\`\``);

  return parts.join('');
}
