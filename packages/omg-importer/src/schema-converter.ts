/**
 * Schema Converter
 *
 * Converts OpenAPI schemas to OMG type representations.
 */

import type {
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
import type { SchemaObject, ReferenceObject } from './types.js';
import { isReferenceObject } from './types.js';

/**
 * Context for schema conversion
 */
export interface ConversionContext {
  /** Component schemas for resolving references */
  schemas: Record<string, SchemaObject | ReferenceObject>;
  /** Track which refs we're currently resolving (for cycle detection) */
  resolving: Set<string>;
  /** Whether to inline referenced schemas or use references */
  inlineRefs: boolean;
}

/**
 * Create a default conversion context
 */
export function createConversionContext(
  schemas: Record<string, SchemaObject | ReferenceObject> = {},
  options: { inlineRefs?: boolean } = {}
): ConversionContext {
  return {
    schemas,
    resolving: new Set(),
    inlineRefs: options.inlineRefs ?? false,
  };
}

/**
 * Convert an OpenAPI schema to an OMG type
 */
export function convertSchema(
  schema: SchemaObject | ReferenceObject,
  ctx: ConversionContext
): OmgType {
  // Handle reference
  if (isReferenceObject(schema)) {
    return convertReference(schema, ctx);
  }

  // Handle inline $ref (some tools put $ref directly in SchemaObject)
  if (schema.$ref) {
    return convertReference({ $ref: schema.$ref }, ctx);
  }

  // Handle composition first (allOf, oneOf, anyOf)
  if (schema.allOf) {
    return convertAllOf(schema, ctx);
  }
  if (schema.oneOf) {
    return convertOneOf(schema, ctx);
  }
  if (schema.anyOf) {
    return convertAnyOf(schema, ctx);
  }

  // Handle enum
  if (schema.enum) {
    return convertEnum(schema);
  }

  // Handle type-based conversion
  const type = normalizeType(schema);

  switch (type) {
    case 'object':
      return convertObject(schema, ctx);
    case 'array':
      return convertArray(schema, ctx);
    case 'string':
      return convertString(schema);
    case 'integer':
      return convertInteger(schema);
    case 'number':
      return convertNumber(schema);
    case 'boolean':
      return convertBoolean(schema);
    case 'null':
      return convertNull(schema);
    default:
      // Unknown or unspecified type - treat as any
      return createPrimitive('any', schema);
  }
}

/**
 * Normalize OpenAPI type to a single string
 * OpenAPI 3.1 allows type to be an array for nullable support
 */
function normalizeType(schema: SchemaObject): string | undefined {
  if (!schema.type) {
    // Infer type from other properties
    if (schema.properties) return 'object';
    if (schema.items) return 'array';
    return undefined;
  }

  if (Array.isArray(schema.type)) {
    // Filter out 'null' and take the first non-null type
    const nonNull = schema.type.filter((t) => t !== 'null');
    return nonNull[0];
  }

  return schema.type;
}

/**
 * Check if schema is nullable
 */
function isNullable(schema: SchemaObject): boolean {
  // OpenAPI 3.0 style
  if (schema.nullable) return true;

  // OpenAPI 3.1 style (type array includes null)
  if (Array.isArray(schema.type) && schema.type.includes('null')) return true;

  return false;
}

/**
 * Extract annotations from schema constraints
 */
function extractAnnotations(schema: SchemaObject): OmgAnnotation[] {
  const annotations: OmgAnnotation[] = [];

  // Numeric constraints
  if (schema.minimum !== undefined) {
    annotations.push({ name: 'min', args: [schema.minimum] });
  }
  if (schema.maximum !== undefined) {
    annotations.push({ name: 'max', args: [schema.maximum] });
  }

  // String constraints
  if (schema.minLength !== undefined) {
    annotations.push({ name: 'minLength', args: [schema.minLength] });
  }
  if (schema.maxLength !== undefined) {
    annotations.push({ name: 'maxLength', args: [schema.maxLength] });
  }
  if (schema.pattern !== undefined) {
    annotations.push({ name: 'pattern', args: [schema.pattern] });
  }

  // Array constraints
  if (schema.minItems !== undefined) {
    annotations.push({ name: 'minItems', args: [schema.minItems] });
  }
  if (schema.maxItems !== undefined) {
    annotations.push({ name: 'maxItems', args: [schema.maxItems] });
  }

  // Format (if not a special OMG type)
  if (schema.format && !isOmgPrimitiveFormat(schema.format)) {
    annotations.push({ name: 'format', args: [schema.format] });
  }

  // Default value
  if (schema.default !== undefined) {
    annotations.push({ name: 'default', args: [schema.default as string | number | boolean] });
  }

  return annotations;
}

/**
 * Check if format maps to an OMG primitive type
 */
function isOmgPrimitiveFormat(format: string): boolean {
  return ['uuid', 'date', 'date-time', 'decimal'].includes(format);
}

/**
 * Convert a $ref to OMG type
 */
function convertReference(ref: ReferenceObject, ctx: ConversionContext): OmgType {
  const refPath = ref.$ref;

  // Extract schema name from #/components/schemas/Name
  const match = refPath.match(/^#\/components\/schemas\/(.+)$/);
  if (!match) {
    // External or unsupported reference - return as-is
    return {
      kind: 'reference',
      name: refPath.replace('#/', '').replace(/\//g, '_'),
      annotations: [],
    } as OmgReference;
  }

  const schemaName = match[1];

  // If not inlining, return a reference
  if (!ctx.inlineRefs) {
    return {
      kind: 'reference',
      name: schemaName,
      annotations: [],
    } as OmgReference;
  }

  // Check for circular reference
  if (ctx.resolving.has(schemaName)) {
    return {
      kind: 'reference',
      name: schemaName,
      annotations: [],
    } as OmgReference;
  }

  // Look up and inline the referenced schema
  const referencedSchema = ctx.schemas[schemaName];
  if (!referencedSchema) {
    // Reference not found - return as reference
    return {
      kind: 'reference',
      name: schemaName,
      annotations: [],
    } as OmgReference;
  }

  // Mark as resolving for cycle detection
  ctx.resolving.add(schemaName);

  try {
    return convertSchema(referencedSchema, ctx);
  } finally {
    ctx.resolving.delete(schemaName);
  }
}

/**
 * Convert allOf (intersection)
 */
function convertAllOf(schema: SchemaObject, ctx: ConversionContext): OmgType {
  const types = schema.allOf!.map((s) => convertSchema(s, ctx));

  // If only one type, return it directly
  if (types.length === 1) {
    return applySchemaMetadata(types[0], schema);
  }

  const result: OmgIntersection = {
    kind: 'intersection',
    types,
    nullable: isNullable(schema),
    annotations: extractAnnotations(schema),
    description: schema.description,
  };

  return result;
}

/**
 * Convert oneOf (union)
 */
function convertOneOf(schema: SchemaObject, ctx: ConversionContext): OmgType {
  const types = schema.oneOf!.map((s) => convertSchema(s, ctx));

  // If only one type, return it directly
  if (types.length === 1) {
    return applySchemaMetadata(types[0], schema);
  }

  const result: OmgUnion = {
    kind: 'union',
    types,
    nullable: isNullable(schema),
    annotations: extractAnnotations(schema),
    description: schema.description,
  };

  return result;
}

/**
 * Convert anyOf (union - treated same as oneOf in OMG)
 */
function convertAnyOf(schema: SchemaObject, ctx: ConversionContext): OmgType {
  const types = schema.anyOf!.map((s) => convertSchema(s, ctx));

  // If only one type, return it directly
  if (types.length === 1) {
    return applySchemaMetadata(types[0], schema);
  }

  const result: OmgUnion = {
    kind: 'union',
    types,
    nullable: isNullable(schema),
    annotations: extractAnnotations(schema),
    description: schema.description,
  };

  return result;
}

/**
 * Convert enum
 */
function convertEnum(schema: SchemaObject): OmgType {
  const values = schema.enum!.filter((v) => v !== null) as (string | number | boolean)[];

  const result: OmgEnum = {
    kind: 'enum',
    values,
    nullable: isNullable(schema) || schema.enum!.includes(null),
    annotations: extractAnnotations(schema),
    description: schema.description,
  };

  return result;
}

/**
 * Convert object type
 */
function convertObject(schema: SchemaObject, ctx: ConversionContext): OmgType {
  const properties: Record<string, OmgType> = {};
  const requiredFields = new Set(schema.required || []);

  for (const [name, propSchema] of Object.entries(schema.properties || {})) {
    const converted = convertSchema(propSchema, ctx);
    // Mark as optional if not in required array
    if (!requiredFields.has(name)) {
      converted.optional = true;
    }
    properties[name] = converted;
  }

  const result: OmgObject = {
    kind: 'object',
    properties,
    nullable: isNullable(schema),
    annotations: extractAnnotations(schema),
    description: schema.description,
  };

  return result;
}

/**
 * Convert array type
 */
function convertArray(schema: SchemaObject, ctx: ConversionContext): OmgType {
  let itemsType: OmgType;

  if (schema.items) {
    itemsType = convertSchema(schema.items, ctx);
  } else {
    // No items defined - use any
    itemsType = { kind: 'primitive', type: 'any', annotations: [] } as OmgPrimitive;
  }

  const result: OmgArray = {
    kind: 'array',
    items: itemsType,
    nullable: isNullable(schema),
    annotations: extractAnnotations(schema),
    description: schema.description,
  };

  return result;
}

/**
 * Convert string type
 */
function convertString(schema: SchemaObject): OmgType {
  // Check for special formats that map to OMG primitives
  switch (schema.format) {
    case 'uuid':
      return createPrimitive('uuid', schema);
    case 'date':
      return createPrimitive('date', schema);
    case 'date-time':
      return createPrimitive('datetime', schema);
    default:
      return createPrimitive('string', schema);
  }
}

/**
 * Convert integer type
 */
function convertInteger(schema: SchemaObject): OmgType {
  return createPrimitive('integer', schema);
}

/**
 * Convert number type
 */
function convertNumber(schema: SchemaObject): OmgType {
  // Check for decimal format
  if (schema.format === 'decimal') {
    return createPrimitive('decimal', schema);
  }
  return createPrimitive('number', schema);
}

/**
 * Convert boolean type
 */
function convertBoolean(schema: SchemaObject): OmgType {
  return createPrimitive('boolean', schema);
}

/**
 * Convert null type (returns any with nullable)
 */
function convertNull(schema: SchemaObject): OmgType {
  const result: OmgPrimitive = {
    kind: 'primitive',
    type: 'any',
    nullable: true,
    annotations: [],
    description: schema.description,
  };
  return result;
}

/**
 * Create a primitive type with metadata from schema
 */
function createPrimitive(type: OmgPrimitive['type'], schema: SchemaObject): OmgPrimitive {
  return {
    kind: 'primitive',
    type,
    nullable: isNullable(schema),
    annotations: extractAnnotations(schema),
    description: schema.description,
  };
}

/**
 * Apply schema metadata to an existing type
 */
function applySchemaMetadata(type: OmgType, schema: SchemaObject): OmgType {
  if (schema.description && !type.description) {
    type.description = schema.description;
  }
  if (isNullable(schema) && !type.nullable) {
    type.nullable = true;
  }
  return type;
}

/**
 * Get all referenced schema names from a type (recursively)
 */
export function getReferencedSchemas(type: OmgType): Set<string> {
  const refs = new Set<string>();

  function collect(t: OmgType): void {
    switch (t.kind) {
      case 'reference':
        refs.add(t.name);
        break;
      case 'object':
        for (const prop of Object.values(t.properties)) {
          collect(prop);
        }
        break;
      case 'array':
        collect(t.items);
        break;
      case 'union':
      case 'intersection':
        for (const subType of t.types) {
          collect(subType);
        }
        break;
    }
  }

  collect(type);
  return refs;
}
