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
  /**
   * Structural fingerprint -> named-schema name. Used to detect when an
   * inline schema has the same shape as a named component (the case when
   * the input OpenAPI spec has been fully dereferenced) so we can emit a
   * reference instead of an inlined copy.
   */
  fingerprintMap: Map<string, string>;
}

/** Options for a single convertSchema call. */
export interface ConvertSchemaOptions {
  /**
   * Suppress dedup matches against this named schema only, used at the
   * top level of `components.schemas/<name>` conversion so a type
   * definition doesn't collapse into a self-reference. Nested calls
   * inside the conversion don't propagate this, so child schemas are
   * still deduped normally.
   */
  skipNamedSchema?: string;
}

/**
 * Create a default conversion context
 */
export function createConversionContext(
  schemas: Record<string, SchemaObject | ReferenceObject> = {},
  options: { inlineRefs?: boolean } = {}
): ConversionContext {
  const inlineRefs = options.inlineRefs ?? false;
  return {
    schemas,
    resolving: new Set(),
    inlineRefs,
    // Skip the fingerprint pass entirely when the caller has asked us to
    // inline everything — building a reference map would then defeat the
    // intent of inlining.
    fingerprintMap: inlineRefs ? new Map() : buildFingerprintMap(schemas),
  };
}

/**
 * Build a structural-fingerprint map from named component schemas. Names are
 * processed in sorted order so the choice between two named schemas with
 * identical structure is deterministic.
 */
function buildFingerprintMap(
  schemas: Record<string, SchemaObject | ReferenceObject>
): Map<string, string> {
  const map = new Map<string, string>();
  for (const name of Object.keys(schemas).sort()) {
    const schema = schemas[name];
    if (isReferenceObject(schema)) continue;
    if (!isStructurallyNamed(schema)) continue;
    const fp = computeSchemaFingerprint(schema);
    if (!map.has(fp)) {
      map.set(fp, name);
    }
  }
  return map;
}

/**
 * A schema is "structurally named" if it has enough shape to be worth
 * matching against. Bare primitives without constraints (e.g., `type:
 * string`) are excluded so we don't replace every string field with a
 * reference to some `String` component.
 */
export function isStructurallyNamed(schema: SchemaObject): boolean {
  if (schema.allOf || schema.oneOf || schema.anyOf || schema.not) return true;
  if (schema.properties && Object.keys(schema.properties).length > 0) return true;
  if (schema.items) return true;
  if (schema.enum && schema.enum.length > 0) return true;
  if (schema.const !== undefined) return true;
  return false;
}

/**
 * Compute a canonical fingerprint for a schema's structural shape. Two
 * schemas with the same shape produce the same fingerprint regardless of
 * property ordering or non-structural metadata (descriptions, examples,
 * titles, vendor extensions, etc).
 */
export function computeSchemaFingerprint(schema: SchemaObject | ReferenceObject): string {
  return JSON.stringify(normalizeForFingerprint(schema));
}

function normalizeForFingerprint(schema: SchemaObject | ReferenceObject): unknown {
  if (isReferenceObject(schema)) {
    return { $ref: schema.$ref };
  }

  const norm: Record<string, unknown> = {};

  if (schema.$ref !== undefined) norm.$ref = schema.$ref;

  // Core type
  if (schema.type !== undefined) {
    norm.type = Array.isArray(schema.type) ? [...schema.type].sort() : schema.type;
  }
  if (schema.format !== undefined) norm.format = schema.format;
  if (schema.nullable !== undefined) norm.nullable = schema.nullable;

  // Numeric constraints
  if (schema.minimum !== undefined) norm.minimum = schema.minimum;
  if (schema.maximum !== undefined) norm.maximum = schema.maximum;
  if (schema.exclusiveMinimum !== undefined) norm.exclusiveMinimum = schema.exclusiveMinimum;
  if (schema.exclusiveMaximum !== undefined) norm.exclusiveMaximum = schema.exclusiveMaximum;
  if (schema.multipleOf !== undefined) norm.multipleOf = schema.multipleOf;

  // String constraints
  if (schema.minLength !== undefined) norm.minLength = schema.minLength;
  if (schema.maxLength !== undefined) norm.maxLength = schema.maxLength;
  if (schema.pattern !== undefined) norm.pattern = schema.pattern;

  // Array constraints
  if (schema.minItems !== undefined) norm.minItems = schema.minItems;
  if (schema.maxItems !== undefined) norm.maxItems = schema.maxItems;
  if (schema.uniqueItems !== undefined) norm.uniqueItems = schema.uniqueItems;

  // Object constraints
  if (schema.minProperties !== undefined) norm.minProperties = schema.minProperties;
  if (schema.maxProperties !== undefined) norm.maxProperties = schema.maxProperties;

  // Enum: sort canonically so order doesn't affect matching
  if (schema.enum !== undefined) {
    norm.enum = sortByJson(schema.enum);
  }
  if (schema.const !== undefined) norm.const = schema.const;

  // Items
  if (schema.items !== undefined) {
    norm.items = normalizeForFingerprint(schema.items);
  }

  // Properties: sort keys for canonical order
  if (schema.properties !== undefined) {
    const props: Record<string, unknown> = {};
    for (const key of Object.keys(schema.properties).sort()) {
      props[key] = normalizeForFingerprint(schema.properties[key]);
    }
    norm.properties = props;
  }

  // additionalProperties
  if (schema.additionalProperties !== undefined) {
    if (typeof schema.additionalProperties === 'boolean') {
      norm.additionalProperties = schema.additionalProperties;
    } else {
      norm.additionalProperties = normalizeForFingerprint(schema.additionalProperties);
    }
  }

  // required: sort canonically
  if (schema.required !== undefined) {
    norm.required = [...schema.required].sort();
  }

  // Compositions: oneOf / anyOf / allOf are unordered semantically, so sort
  // by the canonicalized child JSON to make the fingerprint order-invariant.
  if (schema.allOf !== undefined) norm.allOf = sortChildren(schema.allOf);
  if (schema.oneOf !== undefined) norm.oneOf = sortChildren(schema.oneOf);
  if (schema.anyOf !== undefined) norm.anyOf = sortChildren(schema.anyOf);
  if (schema.not !== undefined) norm.not = normalizeForFingerprint(schema.not);

  // Discriminator
  if (schema.discriminator !== undefined) norm.discriminator = schema.discriminator;

  return norm;
}

function sortChildren(children: (SchemaObject | ReferenceObject)[]): unknown[] {
  const normalized = children.map((c) => normalizeForFingerprint(c));
  const withKeys = normalized.map((n) => ({ key: JSON.stringify(n), value: n }));
  withKeys.sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0));
  return withKeys.map((w) => w.value);
}

function sortByJson<T>(values: T[]): T[] {
  return [...values].sort((a, b) => {
    const aStr = JSON.stringify(a);
    const bStr = JSON.stringify(b);
    return aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
  });
}

/**
 * Convert an OpenAPI schema to an OMG type
 */
export function convertSchema(
  schema: SchemaObject | ReferenceObject,
  ctx: ConversionContext,
  options: ConvertSchemaOptions = {}
): OmgType {
  // Handle reference
  if (isReferenceObject(schema)) {
    return convertReference(schema, ctx);
  }

  // Handle inline $ref (some tools put $ref directly in SchemaObject)
  if (schema.$ref) {
    return convertReference({ $ref: schema.$ref }, ctx);
  }

  // Structural-dedup: if this inline schema has the same shape as a named
  // component, emit a reference. This recovers ref relationships when the
  // input spec was fully dereferenced (e.g., `swagger-cli bundle -r` or
  // `redocly bundle --dereferenced`) but `components.schemas` is still
  // populated. The top-level call from `convertNamedTypes` passes
  // `skipNamedSchema` so a named type's own definition doesn't collapse
  // into a self-reference; nested calls don't propagate that, so sub-
  // schemas inside the named type are still deduped against other named
  // components.
  if (ctx.fingerprintMap.size > 0 && isStructurallyNamed(schema)) {
    const fp = computeSchemaFingerprint(schema);
    const matchedName = ctx.fingerprintMap.get(fp);
    if (matchedName && matchedName !== options.skipNamedSchema) {
      return {
        kind: 'reference',
        name: matchedName,
        annotations: [],
      } as OmgReference;
    }
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

  // Add OAS metadata
  applyOasMetadata(result, schema);

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

  // Add OAS metadata
  applyOasMetadata(result, schema);

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

  // Add OAS metadata
  applyOasMetadata(result, schema);

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

  // Add OAS metadata
  applyOasMetadata(result, schema);

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

  // Add OAS metadata
  applyOasMetadata(result, schema);

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

  // Add OAS metadata
  applyOasMetadata(result, schema);

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
  const result: OmgPrimitive = {
    kind: 'primitive',
    type,
    nullable: isNullable(schema),
    annotations: extractAnnotations(schema),
    description: schema.description,
  };

  // Add OAS metadata for round-trip preservation
  applyOasMetadata(result, schema);

  return result;
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
  // Add OAS metadata for round-trip preservation
  applyOasMetadata(type, schema);
  return type;
}

/**
 * Apply OpenAPI metadata fields to a type for round-trip preservation
 */
function applyOasMetadata(type: OmgType, schema: SchemaObject): void {
  // Example value
  if (schema.example !== undefined) {
    type.example = schema.example;
  }

  // Read/write only flags
  if (schema.readOnly) {
    type.readOnly = true;
  }
  if (schema.writeOnly) {
    type.writeOnly = true;
  }

  // Deprecated flag
  if (schema.deprecated) {
    type.deprecated = true;
  }

  // Title
  if (schema.title) {
    type.title = schema.title;
  }

  // Vendor extensions
  const extensions = extractSchemaExtensions(schema);
  if (extensions) {
    type.extensions = extensions;
  }
}

/**
 * Extract vendor extensions (x-*) from a schema
 */
function extractSchemaExtensions(schema: SchemaObject): Record<string, unknown> | undefined {
  const extensions: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(schema)) {
    if (key.startsWith('x-')) {
      extensions[key] = value;
    }
  }
  return Object.keys(extensions).length > 0 ? extensions : undefined;
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
