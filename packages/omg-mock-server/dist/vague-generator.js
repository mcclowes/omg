"use strict";
/**
 * Vague Mock Generator
 *
 * Generates realistic mock data using Vague DSL
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWithVague = generateWithVague;
exports.generateArrayWithVague = generateArrayWithVague;
exports.createVagueGenerator = createVagueGenerator;
const vague_lang_1 = require("vague-lang");
// Register Vague plugins once at module load
let pluginsRegistered = false;
function ensurePluginsRegistered() {
    if (!pluginsRegistered) {
        (0, vague_lang_1.registerPlugin)(vague_lang_1.fakerPlugin);
        (0, vague_lang_1.registerPlugin)(vague_lang_1.fakerShorthandPlugin);
        (0, vague_lang_1.registerPlugin)(vague_lang_1.datePlugin);
        (0, vague_lang_1.registerPlugin)(vague_lang_1.dateShorthandPlugin);
        pluginsRegistered = true;
    }
}
/**
 * Generate mock data for a schema using Vague
 */
async function generateWithVague(schema, options = {}) {
    if (!schema)
        return null;
    ensurePluginsRegistered();
    if (options.seed !== undefined) {
        (0, vague_lang_1.setSeed)(options.seed);
    }
    // Convert schema to Vague syntax
    const vagueSchema = schemaToVague(schema, 'Response', options.types || {});
    // Build Vague source
    const source = `
${vagueSchema.typeDefs}

schema Response {
${vagueSchema.fields}
}

dataset Mock {
  result: 1 of Response
}
`;
    try {
        const data = await (0, vague_lang_1.compile)(source);
        // Return the first (and only) result
        return data.result?.[0] ?? null;
    }
    catch (error) {
        // Fallback to simpler generation if Vague fails
        console.error('Vague generation failed, using fallback:', error);
        return generateFallback(schema);
    }
}
/**
 * Generate mock array data using Vague
 */
async function generateArrayWithVague(itemSchema, count, options = {}) {
    ensurePluginsRegistered();
    if (options.seed !== undefined) {
        (0, vague_lang_1.setSeed)(options.seed);
    }
    const vagueSchema = schemaToVague(itemSchema, 'Item', options.types || {});
    const source = `
${vagueSchema.typeDefs}

schema Item {
${vagueSchema.fields}
}

dataset Mock {
  items: ${count} of Item
}
`;
    try {
        const data = await (0, vague_lang_1.compile)(source);
        return data.items ?? [];
    }
    catch (error) {
        console.error('Vague array generation failed, using fallback:', error);
        return Array.from({ length: count }, () => generateFallback(itemSchema));
    }
}
/**
 * Convert OmgSchema to Vague schema syntax
 */
function schemaToVague(schema, name, types, indent = '  ') {
    const typeDefs = [];
    const fields = [];
    if (schema.kind === 'object') {
        for (const [key, propSchema] of Object.entries(schema.properties)) {
            const fieldDef = fieldToVague(key, propSchema, types, typeDefs);
            fields.push(`${indent}${fieldDef}`);
        }
    }
    else {
        // Wrap non-object schemas
        const fieldDef = fieldToVague('value', schema, types, typeDefs);
        fields.push(`${indent}${fieldDef}`);
    }
    return {
        typeDefs: typeDefs.join('\n'),
        fields: fields.join(',\n'),
    };
}
/**
 * Convert a single field to Vague syntax
 */
function fieldToVague(name, schema, types, typeDefs) {
    const isOptional = schema.optional;
    const isNullable = schema.nullable;
    let vagueType = typeToVague(schema, types, typeDefs, name);
    // Handle nullable
    if (isNullable) {
        vagueType = `${vagueType}?`;
    }
    // Handle optional (in Vague, optional means sometimes null)
    if (isOptional && !isNullable) {
        vagueType = `0.8: ${vagueType} | 0.2: null`;
    }
    return `${name}: ${vagueType}`;
}
/**
 * Convert OmgSchema type to Vague type expression
 */
function typeToVague(schema, types, typeDefs, fieldName = 'field') {
    const constraints = parseAnnotations(schema.annotations);
    switch (schema.kind) {
        case 'primitive':
            return primitiveToVague(schema.type, constraints, fieldName);
        case 'object': {
            // Create inline object or reference a type def
            const schemaName = toPascalCase(fieldName) + 'Type';
            const result = schemaToVague(schema, schemaName, types, '    ');
            if (result.fields) {
                typeDefs.push(`schema ${schemaName} {\n${result.fields}\n}`);
            }
            return schemaName;
        }
        case 'array': {
            const minItems = constraints.minItems ?? 1;
            const maxItems = constraints.maxItems ?? 3;
            const itemType = typeToVague(schema.items, types, typeDefs, fieldName + 'Item');
            return `${minItems}..${maxItems} of ${itemType}`;
        }
        case 'enum': {
            const values = schema.values.map((v) => typeof v === 'string' ? `"${v}"` : String(v));
            return values.join(' | ');
        }
        case 'union': {
            const unionTypes = schema.types.map((t) => typeToVague(t, types, typeDefs, fieldName));
            return unionTypes.join(' | ');
        }
        case 'intersection': {
            // For intersections, we'll merge the first object type
            const firstObj = schema.types.find((t) => t.kind === 'object');
            if (firstObj) {
                return typeToVague(firstObj, types, typeDefs, fieldName);
            }
            return 'string';
        }
        case 'reference': {
            const refSchema = types[schema.name];
            if (refSchema) {
                return typeToVague(refSchema, types, typeDefs, schema.name);
            }
            return 'string'; // Fallback
        }
        default:
            return 'string';
    }
}
/**
 * Convert primitive type to Vague expression with faker functions
 */
function primitiveToVague(type, constraints, fieldName) {
    const nameLower = fieldName.toLowerCase();
    switch (type) {
        case 'string':
            // Try to infer better generators from field name
            if (nameLower.includes('email'))
                return 'email()';
            if (nameLower.includes('phone'))
                return 'phone()';
            if (nameLower.includes('name') && !nameLower.includes('file')) {
                if (nameLower.includes('first'))
                    return 'firstName()';
                if (nameLower.includes('last'))
                    return 'lastName()';
                if (nameLower.includes('full'))
                    return 'fullName()';
                if (nameLower.includes('company'))
                    return 'companyName()';
                return 'fullName()';
            }
            if (nameLower.includes('title'))
                return 'sentence()';
            if (nameLower.includes('description') || nameLower.includes('body')) {
                return 'sentence()';
            }
            if (nameLower.includes('address') || nameLower.includes('street')) {
                return 'streetAddress()';
            }
            if (nameLower.includes('city'))
                return 'city()';
            if (nameLower.includes('country'))
                return '"USA" | "UK" | "Canada" | "Australia"';
            if (nameLower.includes('url') || nameLower.includes('link')) {
                return '"https://example.com/path"';
            }
            // Use format constraints
            if (constraints.format === 'email')
                return 'email()';
            if (constraints.format === 'uri')
                return '"https://example.com/resource"';
            // Default to sentence for reasonable strings
            return 'sentence()';
        case 'integer': {
            const min = constraints.min ?? 0;
            const max = constraints.max ?? 1000;
            return `int in ${min}..${max}`;
        }
        case 'number':
        case 'decimal': {
            const min = constraints.min ?? 0;
            const max = constraints.max ?? 1000;
            return `decimal in ${min}..${max}`;
        }
        case 'boolean':
            return 'boolean';
        case 'date':
            return 'date in 2020..2025';
        case 'datetime':
            return '"2024-01-15T10:30:00Z"';
        case 'uuid':
            return 'uuid()';
        case 'any':
            return '"value1" | "value2" | 123 | true';
        default:
            return 'string';
    }
}
/**
 * Parse annotations into constraints
 */
function parseAnnotations(annotations) {
    const constraints = {};
    for (const ann of annotations) {
        switch (ann.name) {
            case 'min':
                constraints.min = Number(ann.args[0]);
                break;
            case 'max':
                constraints.max = Number(ann.args[0]);
                break;
            case 'minLength':
                constraints.minLength = Number(ann.args[0]);
                break;
            case 'maxLength':
                constraints.maxLength = Number(ann.args[0]);
                break;
            case 'minItems':
                constraints.minItems = Number(ann.args[0]);
                break;
            case 'maxItems':
                constraints.maxItems = Number(ann.args[0]);
                break;
            case 'pattern':
                constraints.pattern = String(ann.args[0]);
                break;
            case 'format':
                constraints.format = String(ann.args[0]);
                break;
        }
    }
    return constraints;
}
/**
 * Convert string to PascalCase
 */
function toPascalCase(str) {
    return str
        .replace(/[-_](.)/g, (_, c) => c.toUpperCase())
        .replace(/^./, (c) => c.toUpperCase());
}
/**
 * Simple fallback generator for when Vague fails
 */
function generateFallback(schema) {
    switch (schema.kind) {
        case 'primitive':
            switch (schema.type) {
                case 'string':
                    return 'sample text';
                case 'integer':
                    return 42;
                case 'number':
                case 'decimal':
                    return 99.99;
                case 'boolean':
                    return true;
                case 'date':
                    return '2024-01-15';
                case 'datetime':
                    return '2024-01-15T10:30:00Z';
                case 'uuid':
                    return '550e8400-e29b-41d4-a716-446655440000';
                default:
                    return null;
            }
        case 'object': {
            const obj = {};
            for (const [key, prop] of Object.entries(schema.properties)) {
                obj[key] = generateFallback(prop);
            }
            return obj;
        }
        case 'array':
            return [generateFallback(schema.items)];
        case 'enum':
            return schema.values[0];
        case 'union':
            return generateFallback(schema.types[0]);
        case 'intersection':
            return schema.types[0] ? generateFallback(schema.types[0]) : {};
        default:
            return null;
    }
}
/**
 * Create a Vague generator for an API
 */
function createVagueGenerator(api, seed) {
    return {
        generate: (schema) => generateWithVague(schema, { seed, types: api.types }),
        generateArray: (schema, count) => generateArrayWithVague(schema, count, { seed, types: api.types }),
    };
}
//# sourceMappingURL=vague-generator.js.map