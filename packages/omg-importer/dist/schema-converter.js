/**
 * Schema Converter
 *
 * Converts OpenAPI schemas to OMG type representations.
 */
import { isReferenceObject } from './types.js';
/**
 * Create a default conversion context
 */
export function createConversionContext(schemas = {}, options = {}) {
    return {
        schemas,
        resolving: new Set(),
        inlineRefs: options.inlineRefs ?? false,
    };
}
/**
 * Convert an OpenAPI schema to an OMG type
 */
export function convertSchema(schema, ctx) {
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
function normalizeType(schema) {
    if (!schema.type) {
        // Infer type from other properties
        if (schema.properties)
            return 'object';
        if (schema.items)
            return 'array';
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
function isNullable(schema) {
    // OpenAPI 3.0 style
    if (schema.nullable)
        return true;
    // OpenAPI 3.1 style (type array includes null)
    if (Array.isArray(schema.type) && schema.type.includes('null'))
        return true;
    return false;
}
/**
 * Extract annotations from schema constraints
 */
function extractAnnotations(schema) {
    const annotations = [];
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
        annotations.push({ name: 'default', args: [schema.default] });
    }
    return annotations;
}
/**
 * Check if format maps to an OMG primitive type
 */
function isOmgPrimitiveFormat(format) {
    return ['uuid', 'date', 'date-time', 'decimal'].includes(format);
}
/**
 * Convert a $ref to OMG type
 */
function convertReference(ref, ctx) {
    const refPath = ref.$ref;
    // Extract schema name from #/components/schemas/Name
    const match = refPath.match(/^#\/components\/schemas\/(.+)$/);
    if (!match) {
        // External or unsupported reference - return as-is
        return {
            kind: 'reference',
            name: refPath.replace('#/', '').replace(/\//g, '_'),
            annotations: [],
        };
    }
    const schemaName = match[1];
    // If not inlining, return a reference
    if (!ctx.inlineRefs) {
        return {
            kind: 'reference',
            name: schemaName,
            annotations: [],
        };
    }
    // Check for circular reference
    if (ctx.resolving.has(schemaName)) {
        return {
            kind: 'reference',
            name: schemaName,
            annotations: [],
        };
    }
    // Look up and inline the referenced schema
    const referencedSchema = ctx.schemas[schemaName];
    if (!referencedSchema) {
        // Reference not found - return as reference
        return {
            kind: 'reference',
            name: schemaName,
            annotations: [],
        };
    }
    // Mark as resolving for cycle detection
    ctx.resolving.add(schemaName);
    try {
        return convertSchema(referencedSchema, ctx);
    }
    finally {
        ctx.resolving.delete(schemaName);
    }
}
/**
 * Convert allOf (intersection)
 */
function convertAllOf(schema, ctx) {
    const types = schema.allOf.map((s) => convertSchema(s, ctx));
    // If only one type, return it directly
    if (types.length === 1) {
        return applySchemaMetadata(types[0], schema);
    }
    const result = {
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
function convertOneOf(schema, ctx) {
    const types = schema.oneOf.map((s) => convertSchema(s, ctx));
    // If only one type, return it directly
    if (types.length === 1) {
        return applySchemaMetadata(types[0], schema);
    }
    const result = {
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
function convertAnyOf(schema, ctx) {
    const types = schema.anyOf.map((s) => convertSchema(s, ctx));
    // If only one type, return it directly
    if (types.length === 1) {
        return applySchemaMetadata(types[0], schema);
    }
    const result = {
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
function convertEnum(schema) {
    const values = schema.enum.filter((v) => v !== null);
    const result = {
        kind: 'enum',
        values,
        nullable: isNullable(schema) || schema.enum.includes(null),
        annotations: extractAnnotations(schema),
        description: schema.description,
    };
    return result;
}
/**
 * Convert object type
 */
function convertObject(schema, ctx) {
    const properties = {};
    const requiredFields = new Set(schema.required || []);
    for (const [name, propSchema] of Object.entries(schema.properties || {})) {
        const converted = convertSchema(propSchema, ctx);
        // Mark as optional if not in required array
        if (!requiredFields.has(name)) {
            converted.optional = true;
        }
        properties[name] = converted;
    }
    const result = {
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
function convertArray(schema, ctx) {
    let itemsType;
    if (schema.items) {
        itemsType = convertSchema(schema.items, ctx);
    }
    else {
        // No items defined - use any
        itemsType = { kind: 'primitive', type: 'any', annotations: [] };
    }
    const result = {
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
function convertString(schema) {
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
function convertInteger(schema) {
    return createPrimitive('integer', schema);
}
/**
 * Convert number type
 */
function convertNumber(schema) {
    // Check for decimal format
    if (schema.format === 'decimal') {
        return createPrimitive('decimal', schema);
    }
    return createPrimitive('number', schema);
}
/**
 * Convert boolean type
 */
function convertBoolean(schema) {
    return createPrimitive('boolean', schema);
}
/**
 * Convert null type (returns any with nullable)
 */
function convertNull(schema) {
    const result = {
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
function createPrimitive(type, schema) {
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
function applySchemaMetadata(type, schema) {
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
export function getReferencedSchemas(type) {
    const refs = new Set();
    function collect(t) {
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
//# sourceMappingURL=schema-converter.js.map