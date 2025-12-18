"use strict";
/**
 * Converts OpenAPI JSON Schema to OMG type syntax
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaToOmg = schemaToOmg;
exports.parametersToOmg = parametersToOmg;
/**
 * Convert an OpenAPI schema to OMG type syntax string
 */
function schemaToOmg(schema, ctx = {}) {
    const indent = ctx.indent ?? 0;
    // Handle $ref
    if (schema.$ref) {
        const refName = extractRefName(schema.$ref);
        if (ctx.inlineRefs && ctx.components?.schemas?.[refName]) {
            return schemaToOmg(ctx.components.schemas[refName], ctx);
        }
        return refName;
    }
    // Handle allOf (intersection)
    if (schema.allOf && schema.allOf.length > 0) {
        const types = schema.allOf.map((s) => schemaToOmg(s, ctx));
        return types.join(' & ');
    }
    // Handle oneOf/anyOf (union)
    if (schema.oneOf && schema.oneOf.length > 0) {
        const types = schema.oneOf.map((s) => schemaToOmg(s, ctx));
        return types.join(' | ');
    }
    if (schema.anyOf && schema.anyOf.length > 0) {
        const types = schema.anyOf.map((s) => schemaToOmg(s, ctx));
        return types.join(' | ');
    }
    // Handle enum
    if (schema.enum) {
        return schema.enum.map((v) => (typeof v === 'string' ? `"${v}"` : String(v))).join(' | ');
    }
    // Handle type
    switch (schema.type) {
        case 'object':
            return objectToOmg(schema, ctx);
        case 'array':
            return arrayToOmg(schema, ctx);
        case 'string':
            return stringToOmg(schema);
        case 'integer':
            return integerToOmg(schema);
        case 'number':
            return numberToOmg(schema);
        case 'boolean':
            return 'boolean';
        case 'null':
            return 'null';
        default:
            // No type specified, try to infer
            if (schema.properties) {
                return objectToOmg(schema, ctx);
            }
            if (schema.items) {
                return arrayToOmg(schema, ctx);
            }
            return 'any';
    }
}
/**
 * Convert object schema to OMG syntax
 */
function objectToOmg(schema, ctx) {
    const indent = ctx.indent ?? 0;
    const indentStr = '  '.repeat(indent);
    const propIndent = '  '.repeat(indent + 1);
    if (!schema.properties || Object.keys(schema.properties).length === 0) {
        return '{}';
    }
    const requiredSet = new Set(schema.required || []);
    const lines = ['{'];
    const props = Object.entries(schema.properties);
    props.forEach(([name, propSchema], index) => {
        const isRequired = requiredSet.has(name);
        const isLast = index === props.length - 1;
        const propType = schemaToOmg(propSchema, { ...ctx, indent: indent + 1 });
        // Build annotations
        const annotations = buildAnnotations(propSchema);
        const annotationStr = annotations.length > 0 ? ' ' + annotations.join(' ') : '';
        // Build comment
        const comment = propSchema.description ? `  // ${propSchema.description}` : '';
        // Nullable handling
        const nullableSuffix = propSchema.nullable ? '?' : '';
        const optionalSuffix = isRequired ? '' : '?';
        const comma = isLast ? '' : ',';
        lines.push(`${propIndent}${name}${optionalSuffix}: ${propType}${nullableSuffix}${annotationStr}${comma}${comment}`);
    });
    lines.push(`${indentStr}}`);
    return lines.join('\n');
}
/**
 * Convert array schema to OMG syntax
 */
function arrayToOmg(schema, ctx) {
    if (!schema.items) {
        return 'any[]';
    }
    const itemType = schemaToOmg(schema.items, ctx);
    // Wrap complex types in parentheses
    if (itemType.includes('|') || itemType.includes('&') || itemType.includes('\n')) {
        return `(${itemType})[]`;
    }
    return `${itemType}[]`;
}
/**
 * Convert string schema to OMG type
 */
function stringToOmg(schema) {
    // Map common formats to OMG types
    switch (schema.format) {
        case 'date':
            return 'date';
        case 'date-time':
            return 'datetime';
        case 'uuid':
            return 'uuid';
        case 'email':
        case 'uri':
        case 'hostname':
        case 'ipv4':
        case 'ipv6':
            // These remain strings but could use @format annotation
            return 'string';
        default:
            return 'string';
    }
}
/**
 * Convert integer schema to OMG type
 */
function integerToOmg(_schema) {
    return 'integer';
}
/**
 * Convert number schema to OMG type
 */
function numberToOmg(schema) {
    // Use decimal for currency/precise values
    if (schema.format === 'double' || schema.format === 'float') {
        return 'number';
    }
    return 'number';
}
/**
 * Build annotation strings from schema constraints
 */
function buildAnnotations(schema) {
    const annotations = [];
    if (schema.minimum !== undefined) {
        annotations.push(`@min(${schema.minimum})`);
    }
    if (schema.maximum !== undefined) {
        annotations.push(`@max(${schema.maximum})`);
    }
    if (schema.minLength !== undefined) {
        annotations.push(`@minLength(${schema.minLength})`);
    }
    if (schema.maxLength !== undefined) {
        annotations.push(`@maxLength(${schema.maxLength})`);
    }
    if (schema.pattern) {
        annotations.push(`@pattern("${escapeString(schema.pattern)}")`);
    }
    if (schema.format && !['date', 'date-time', 'uuid'].includes(schema.format)) {
        annotations.push(`@format("${schema.format}")`);
    }
    return annotations;
}
/**
 * Extract reference name from $ref string
 */
function extractRefName(ref) {
    // Handle "#/components/schemas/MyType" format
    const match = ref.match(/#\/components\/schemas\/(.+)$/);
    if (match) {
        return match[1];
    }
    // Return as-is if not matching expected pattern
    return ref.split('/').pop() || ref;
}
/**
 * Escape special characters in strings
 */
function escapeString(str) {
    return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}
/**
 * Convert parameters to OMG block content
 */
function parametersToOmg(parameters, ctx = {}) {
    if (parameters.length === 0) {
        return '{}';
    }
    const lines = ['{'];
    parameters.forEach((param, index) => {
        const isLast = index === parameters.length - 1;
        const paramType = param.schema ? schemaToOmg(param.schema, { ...ctx, indent: 1 }) : 'string';
        const optionalSuffix = param.required ? '' : '?';
        const comment = param.description ? `  // ${param.description}` : '';
        const comma = isLast ? '' : ',';
        // Build annotations from schema
        const annotations = param.schema ? buildAnnotations(param.schema) : [];
        const annotationStr = annotations.length > 0 ? ' ' + annotations.join(' ') : '';
        lines.push(`  ${param.name}${optionalSuffix}: ${paramType}${annotationStr}${comma}${comment}`);
    });
    lines.push('}');
    return lines.join('\n');
}
//# sourceMappingURL=schema-converter.js.map