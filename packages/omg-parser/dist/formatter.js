"use strict";
/**
 * OMG Formatter
 *
 * Formats .omg.md files for consistent style:
 * - Normalizes YAML frontmatter
 * - Formats OMG schema blocks with consistent indentation
 * - Preserves markdown prose and JSON example blocks
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDocument = formatDocument;
const gray_matter_1 = __importDefault(require("gray-matter"));
const DEFAULT_FRONTMATTER_ORDER = [
    'method',
    'path',
    'operationId',
    'tags',
    'summary',
    'deprecated',
    'auth',
    'follows',
    'webhooks',
];
/**
 * Format an OMG document
 */
function formatDocument(content, options = {}) {
    const indent = options.indent ?? 2;
    const sortFrontmatter = options.sortFrontmatter ?? true;
    const frontmatterOrder = options.frontmatterOrder ?? DEFAULT_FRONTMATTER_ORDER;
    // Parse frontmatter
    const parsed = (0, gray_matter_1.default)(content);
    const frontmatter = parsed.data;
    const body = parsed.content;
    // Format frontmatter
    const formattedFrontmatter = formatFrontmatter(frontmatter, sortFrontmatter, frontmatterOrder);
    // Format body (code blocks)
    const formattedBody = formatBody(body, indent);
    // Reconstruct document
    if (Object.keys(frontmatter).length > 0) {
        return `---\n${formattedFrontmatter}---\n${formattedBody}`;
    }
    return formattedBody;
}
/**
 * Format YAML frontmatter
 */
function formatFrontmatter(data, sort, order) {
    if (Object.keys(data).length === 0) {
        return '';
    }
    let keys = Object.keys(data);
    if (sort) {
        keys = keys.sort((a, b) => {
            const aIndex = order.indexOf(a);
            const bIndex = order.indexOf(b);
            // Keys in order list come first, in that order
            if (aIndex !== -1 && bIndex !== -1)
                return aIndex - bIndex;
            if (aIndex !== -1)
                return -1;
            if (bIndex !== -1)
                return 1;
            // Other keys alphabetically
            return a.localeCompare(b);
        });
    }
    const lines = [];
    for (const key of keys) {
        const value = data[key];
        lines.push(formatYamlValue(key, value, 0));
    }
    return lines.join('\n') + '\n';
}
/**
 * Format a YAML key-value pair
 */
function formatYamlValue(key, value, depth) {
    const indent = '  '.repeat(depth);
    if (value === null || value === undefined) {
        return `${indent}${key}:`;
    }
    if (typeof value === 'string') {
        // Quote strings that need it
        if (value.includes(':') || value.includes('#') || value.includes('\n') || value === '') {
            return `${indent}${key}: "${value.replace(/"/g, '\\"')}"`;
        }
        return `${indent}${key}: ${value}`;
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
        return `${indent}${key}: ${value}`;
    }
    if (Array.isArray(value)) {
        // Simple arrays on one line
        if (value.every((v) => typeof v === 'string' || typeof v === 'number')) {
            const items = value.map((v) => (typeof v === 'string' ? v : String(v)));
            return `${indent}${key}: [${items.join(', ')}]`;
        }
        // Complex arrays
        const items = value.map((v) => {
            if (typeof v === 'object' && v !== null) {
                const objLines = Object.entries(v).map(([k, val]) => formatYamlValue(k, val, depth + 2));
                return `${indent}  -\n${objLines.join('\n')}`;
            }
            return `${indent}  - ${v}`;
        });
        return `${indent}${key}:\n${items.join('\n')}`;
    }
    if (typeof value === 'object') {
        const objLines = Object.entries(value).map(([k, v]) => formatYamlValue(k, v, depth + 1));
        return `${indent}${key}:\n${objLines.join('\n')}`;
    }
    return `${indent}${key}: ${String(value)}`;
}
/**
 * Format the document body (markdown + code blocks)
 */
function formatBody(body, indent) {
    const lines = body.split('\n');
    const result = [];
    let inCodeBlock = false;
    let codeBlockType = '';
    let codeBlockContent = [];
    for (const line of lines) {
        // Check for code block start
        const codeBlockStart = line.match(/^```(\S*)/);
        if (codeBlockStart && !inCodeBlock) {
            inCodeBlock = true;
            codeBlockType = codeBlockStart[1];
            codeBlockContent = [];
            result.push(line);
            continue;
        }
        // Check for code block end
        if (line.trim() === '```' && inCodeBlock) {
            // Format the code block content if it's an OMG block
            if (isOmgSchemaBlock(codeBlockType)) {
                const formatted = formatOmgSchema(codeBlockContent.join('\n'), indent);
                result.push(formatted);
            }
            else if (codeBlockType === 'omg.example' || codeBlockType === 'json') {
                // Format JSON examples
                const formatted = formatJsonBlock(codeBlockContent.join('\n'), indent);
                result.push(formatted);
            }
            else {
                // Keep other blocks as-is
                result.push(...codeBlockContent);
            }
            result.push('```');
            inCodeBlock = false;
            codeBlockType = '';
            codeBlockContent = [];
            continue;
        }
        // Collect code block content or pass through
        if (inCodeBlock) {
            codeBlockContent.push(line);
        }
        else {
            result.push(line);
        }
    }
    return result.join('\n');
}
/**
 * Check if a code block type is an OMG schema block
 */
function isOmgSchemaBlock(type) {
    return (type.startsWith('omg.') &&
        type !== 'omg.example' &&
        type !== 'omg.config');
}
/**
 * Format an OMG schema block
 */
function formatOmgSchema(content, indentSize) {
    const trimmed = content.trim();
    if (!trimmed)
        return '';
    // Tokenize and reformat
    try {
        return formatSchemaContent(trimmed, indentSize);
    }
    catch {
        // If formatting fails, return original
        return content;
    }
}
/**
 * Format schema content with proper indentation
 */
function formatSchemaContent(content, indentSize) {
    const indent = ' '.repeat(indentSize);
    const lines = [];
    let depth = 0;
    let i = 0;
    let currentLine = '';
    const chars = content.split('');
    while (i < chars.length) {
        const char = chars[i];
        // Handle strings
        if (char === '"' || char === "'") {
            const quote = char;
            currentLine += char;
            i++;
            while (i < chars.length && chars[i] !== quote) {
                if (chars[i] === '\\' && i + 1 < chars.length) {
                    currentLine += chars[i] + chars[i + 1];
                    i += 2;
                }
                else {
                    currentLine += chars[i];
                    i++;
                }
            }
            if (i < chars.length) {
                currentLine += chars[i];
                i++;
            }
            continue;
        }
        // Handle comments
        if (char === '/' && chars[i + 1] === '/') {
            // Collect rest of line as comment
            while (i < chars.length && chars[i] !== '\n') {
                currentLine += chars[i];
                i++;
            }
            continue;
        }
        // Handle opening braces/brackets
        if (char === '{' || char === '[') {
            currentLine += char;
            const trimmedLine = currentLine.trim();
            if (trimmedLine) {
                lines.push(indent.repeat(depth) + trimmedLine);
            }
            depth++;
            currentLine = '';
            i++;
            continue;
        }
        // Handle closing braces/brackets
        if (char === '}' || char === ']') {
            const trimmedLine = currentLine.trim();
            if (trimmedLine) {
                lines.push(indent.repeat(depth) + trimmedLine);
            }
            depth = Math.max(0, depth - 1);
            currentLine = char;
            // Check for trailing characters (like ?, annotations, or comma)
            i++;
            while (i < chars.length) {
                const next = chars[i];
                if (next === '?' || next === '@' || next === ',') {
                    currentLine += next;
                    i++;
                    // For annotations, collect the whole annotation
                    if (next === '@') {
                        while (i < chars.length && chars[i] !== ',' && chars[i] !== '\n' && chars[i] !== '}' && chars[i] !== ']') {
                            currentLine += chars[i];
                            i++;
                        }
                    }
                }
                else if (next === ' ' || next === '\t') {
                    i++;
                }
                else {
                    break;
                }
            }
            lines.push(indent.repeat(depth) + currentLine.trim());
            currentLine = '';
            continue;
        }
        // Handle commas - end of property
        if (char === ',') {
            currentLine += char;
            const trimmedLine = currentLine.trim();
            if (trimmedLine) {
                lines.push(indent.repeat(depth) + trimmedLine);
            }
            currentLine = '';
            i++;
            continue;
        }
        // Handle newlines
        if (char === '\n') {
            const trimmedLine = currentLine.trim();
            if (trimmedLine) {
                lines.push(indent.repeat(depth) + trimmedLine);
                currentLine = '';
            }
            i++;
            continue;
        }
        // Accumulate other characters
        currentLine += char;
        i++;
    }
    // Handle remaining content
    const trimmedLine = currentLine.trim();
    if (trimmedLine) {
        lines.push(indent.repeat(depth) + trimmedLine);
    }
    return lines.join('\n');
}
/**
 * Format a JSON block
 */
function formatJsonBlock(content, indentSize) {
    const trimmed = content.trim();
    if (!trimmed)
        return '';
    try {
        const parsed = JSON.parse(trimmed);
        return JSON.stringify(parsed, null, indentSize);
    }
    catch {
        // If not valid JSON, return as-is
        return content;
    }
}
//# sourceMappingURL=formatter.js.map