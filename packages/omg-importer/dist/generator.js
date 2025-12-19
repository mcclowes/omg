/**
 * OMG File Generator
 *
 * Generates .omg.md file content from OmgDocument structures.
 */
import YAML from 'yaml';
const DEFAULT_OPTIONS = {
    indent: 2,
    jsonStyle: false,
};
/**
 * Generate .omg.md file content from an OmgDocument
 */
export function generateDocument(doc, options = {}) {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const parts = [];
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
function generateFrontMatter(fm) {
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
function generateBlock(block, opts) {
    const lang = getBlockLanguage(block);
    let content = '';
    if (block.parsed) {
        if (block.type === 'omg.type') {
            // For type blocks, include the type name
            const typeName = extractTypeName(block);
            content = generateTypeDefinition(typeName, block.parsed, opts);
        }
        else {
            content = generateSchema(block.parsed, opts, 0);
        }
    }
    else if (block.content) {
        content = block.content;
    }
    return '```' + lang + '\n' + content + '\n```\n';
}
/**
 * Get the code block language tag
 */
function getBlockLanguage(block) {
    if (block.statusCode !== undefined) {
        return `omg.response.${block.statusCode}`;
    }
    return block.type;
}
/**
 * Extract type name from block (for omg.type blocks)
 */
function extractTypeName(block) {
    // Try to extract from content if it has "type Name = ..."
    if (block.content) {
        const match = block.content.match(/^type\s+(\w+)\s*=/);
        if (match)
            return match[1];
    }
    return null;
}
/**
 * Generate a type definition (type Name = Schema)
 */
function generateTypeDefinition(name, schema, opts) {
    const schemaStr = generateSchema(schema, opts, 0);
    if (name) {
        return `type ${name} = ${schemaStr}`;
    }
    return schemaStr;
}
/**
 * Generate OMG schema syntax from an OmgType
 */
export function generateSchema(type, opts, depth) {
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
function generatePrimitive(type) {
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
 * Generate object type
 */
function generateObject(type, opts, depth) {
    const entries = Object.entries(type.properties);
    if (entries.length === 0) {
        return '{}';
    }
    const indent = ' '.repeat(opts.indent || 2);
    const baseIndent = indent.repeat(depth);
    const innerIndent = indent.repeat(depth + 1);
    const lines = ['{'];
    for (const [name, propType] of entries) {
        const optional = propType.optional ? '?' : '';
        const value = generateSchema(propType, opts, depth + 1);
        const comment = propType.description ? `  // ${propType.description}` : '';
        // For simple types, put on one line
        if (isSimpleType(propType)) {
            lines.push(`${innerIndent}${name}${optional}: ${value}${comment}`);
        }
        else {
            // For complex types, format appropriately
            lines.push(`${innerIndent}${name}${optional}: ${value}${comment}`);
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
function generateArray(type, opts, depth) {
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
function generateEnum(type) {
    const values = type.values.map((v) => {
        if (typeof v === 'string')
            return `"${v}"`;
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
function generateUnion(type, opts, depth) {
    const parts = type.types.map((t) => generateSchema(t, opts, depth));
    let result;
    if (parts.every((p) => !p.includes('\n'))) {
        result = parts.join(' | ');
    }
    else {
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
function generateIntersection(type, opts, depth) {
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
function generateReference(type) {
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
function generateAnnotations(annotations) {
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
function isSimpleType(type) {
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
 * Generate all files from an import result
 */
export function generateFiles(api, endpoints, types, options = {}) {
    const files = [];
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
    // Generate type files (if there are named types)
    if (types.size > 0) {
        // Option 1: Single types file
        const typesDoc = {
            filePath: 'types/index.omg.md',
            frontMatter: null,
            title: 'Type Definitions',
            description: 'Shared type definitions for this API.',
            blocks: [],
            partials: [],
        };
        for (const [name, { schema }] of types) {
            typesDoc.blocks.push({
                type: 'omg.type',
                content: `type ${name} = `,
                parsed: schema,
                line: 0,
            });
        }
        files.push({
            path: typesDoc.filePath,
            content: generateTypesDocument(typesDoc, types, options),
        });
    }
    return files;
}
/**
 * Generate a types document with all named types
 */
function generateTypesDocument(doc, types, options) {
    const parts = [];
    // Title
    if (doc.title) {
        parts.push(`# ${doc.title}\n`);
    }
    // Description
    if (doc.description) {
        parts.push(`${doc.description}\n`);
    }
    // Generate each type block
    for (const [name, { schema }] of types) {
        const schemaStr = generateSchema(schema, options, 0);
        parts.push('```omg.type');
        parts.push(`type ${name} = ${schemaStr}`);
        parts.push('```\n');
    }
    return parts.join('\n').trim() + '\n';
}
//# sourceMappingURL=generator.js.map