"use strict";
/**
 * Resolver
 *
 * Resolves partials and builds the complete API from multiple .omg.md files.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDocument = resolveDocument;
exports.extractTypeName = extractTypeName;
exports.buildEndpoint = buildEndpoint;
exports.loadApi = loadApi;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const document_parser_js_1 = require("./document-parser.js");
const schema_parser_js_1 = require("./schema-parser.js");
const returns_parser_js_1 = require("./returns-parser.js");
/**
 * Resolve a single document, loading and inlining partials
 */
function resolveDocument(doc, options, visited = new Set()) {
    const docPath = path.resolve(options.basePath, doc.filePath);
    const warnings = [];
    // Prevent circular references
    if (visited.has(docPath)) {
        throw new Error(`Circular partial reference detected: ${docPath}`);
    }
    visited.add(docPath);
    const resolvedBlocks = [...doc.blocks];
    // Resolve each partial
    for (const partial of doc.partials) {
        const partialPath = resolvePartialPath(partial.path, options.basePath);
        if (!fs.existsSync(partialPath)) {
            throw new Error(`Partial not found: ${partial.path} (resolved to ${partialPath})`);
        }
        const partialContent = fs.readFileSync(partialPath, 'utf-8');
        const partialDoc = (0, document_parser_js_1.parseDocument)(partialContent, partial.path);
        // Recursively resolve the partial
        const resolvedPartial = resolveDocument(partialDoc, options, visited);
        // Add the partial's blocks and warnings
        resolvedBlocks.push(...resolvedPartial.resolvedBlocks);
        warnings.push(...resolvedPartial.warnings);
    }
    // Parse schemas in blocks
    for (const block of resolvedBlocks) {
        if (block.type === 'http') {
            continue;
        }
        // Handle omg.returns blocks specially
        if (block.type === 'omg.returns') {
            try {
                const result = (0, returns_parser_js_1.parseReturnsBlock)(block.content);
                block.parsedResponses = result.block;
                // Add warnings with block context
                for (const warning of result.warnings) {
                    warnings.push({
                        ...warning,
                        message: `[${block.type} at line ${block.line}] ${warning.message}`,
                    });
                }
            }
            catch (error) {
                throw new Error(`Failed to parse returns block at line ${block.line}: ${error.message}`);
            }
            continue;
        }
        // Parse other blocks as schemas
        if (!block.parsed) {
            try {
                block.parsed = (0, schema_parser_js_1.parseSchema)(block.content);
            }
            catch (error) {
                // If schema parsing fails, might be pure JSON - try to parse as JSON
                try {
                    const json = JSON.parse(block.content);
                    block.parsed = (0, schema_parser_js_1.inferSchemaFromJson)(json);
                }
                catch {
                    // Re-throw original error with context
                    throw new Error(`Failed to parse ${block.type} block at line ${block.line}: ${error.message}`);
                }
            }
        }
    }
    return {
        ...doc,
        resolvedBlocks,
        warnings,
    };
}
/**
 * Resolve partial path - supports multiple conventions
 * Searches up the directory tree to find partials folder
 */
function resolvePartialPath(partialPath, basePath) {
    // Walk up directory tree to find partials folder
    let searchPath = basePath;
    const root = path.parse(searchPath).root;
    while (searchPath !== root) {
        const candidates = [
            path.join(searchPath, 'partials', `${partialPath}.omg.md`),
            path.join(searchPath, 'partials', partialPath, 'index.omg.md'),
        ];
        for (const candidate of candidates) {
            if (fs.existsSync(candidate)) {
                return candidate;
            }
        }
        // Also check if partials folder exists at this level
        const partialsDir = path.join(searchPath, 'partials');
        if (fs.existsSync(partialsDir)) {
            // Found partials dir but not the specific partial
            return candidates[0]; // Return for error message
        }
        searchPath = path.dirname(searchPath);
    }
    // Fallback to original path for error message
    return path.join(basePath, 'partials', `${partialPath}.omg.md`);
}
/**
 * Extract type name from omg.type block content
 *
 * Supports:
 * - type TypeName { ... }
 * - type TypeName = ...
 */
function extractTypeName(content) {
    // Match "type" keyword followed by an identifier
    const match = content.match(/^\s*type\s+([A-Z][a-zA-Z0-9_]*)/);
    return match ? match[1] : null;
}
/**
 * Build a ParsedEndpoint from a resolved document
 */
function buildEndpoint(doc) {
    const frontMatter = doc.frontMatter;
    // Get method and path from front matter or http block
    let method = null;
    let urlPath = null;
    if (frontMatter?.method && frontMatter?.path) {
        method = frontMatter.method;
        urlPath = frontMatter.path;
    }
    else {
        // Look for http block
        const httpBlock = doc.resolvedBlocks.find((b) => b.type === 'http');
        if (httpBlock) {
            const parsed = (0, document_parser_js_1.parseHttpBlock)(httpBlock.content);
            if (parsed) {
                method = parsed.method;
                urlPath = parsed.path;
            }
        }
    }
    if (!method || !urlPath) {
        return null; // Not an endpoint document
    }
    // Build operation ID
    const operationId = frontMatter?.operationId ||
        `${method.toLowerCase()}-${urlPath
            .replace(/[{}\/]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')}`;
    // Collect blocks by type
    const pathBlock = doc.resolvedBlocks.find((b) => b.type === 'omg.path');
    const queryBlock = doc.resolvedBlocks.find((b) => b.type === 'omg.query');
    const headersBlock = doc.resolvedBlocks.find((b) => b.type === 'omg.headers');
    const bodyBlock = doc.resolvedBlocks.find((b) => b.type === 'omg.body');
    const returnsBlocks = doc.resolvedBlocks.filter((b) => b.type === 'omg.returns');
    const responseBlocks = doc.resolvedBlocks.filter((b) => b.type === 'omg.response' || b.type.startsWith('omg.response.'));
    // Build responses map with conditions and descriptions
    const responses = {};
    // First, process omg.returns blocks (new conditional syntax)
    for (const returnsBlock of returnsBlocks) {
        if (returnsBlock.parsedResponses) {
            for (const entry of returnsBlock.parsedResponses.responses) {
                responses[entry.statusCode] = {
                    schema: entry.schema,
                    condition: entry.condition,
                    description: entry.description,
                };
            }
        }
    }
    // Then, process legacy omg.response.XXX blocks (without conditions)
    for (const block of responseBlocks) {
        const statusCode = block.statusCode || 200;
        if (block.parsed) {
            // Only add if not already defined by omg.returns block
            if (!responses[statusCode]) {
                responses[statusCode] = {
                    schema: block.parsed,
                };
            }
        }
    }
    return {
        method,
        path: urlPath,
        operationId,
        tags: frontMatter?.tags || [],
        summary: frontMatter?.summary || doc.title || '',
        description: doc.description,
        deprecated: frontMatter?.deprecated || false,
        follows: frontMatter?.follows || [],
        webhooks: frontMatter?.webhooks || {},
        parameters: {
            path: pathBlock?.parsed || null,
            query: queryBlock?.parsed || null,
            headers: headersBlock?.parsed || null,
        },
        requestBody: bodyBlock?.parsed || null,
        responses,
    };
}
/**
 * Load and parse an entire API from a directory
 */
function loadApi(rootPath) {
    const basePath = path.dirname(rootPath);
    // Load root API document
    const rootContent = fs.readFileSync(rootPath, 'utf-8');
    const rootDoc = (0, document_parser_js_1.parseDocument)(rootContent, path.basename(rootPath));
    const rootFrontMatter = rootDoc.frontMatter;
    // Find all endpoint files
    const endpointFiles = findEndpointFiles(basePath);
    const endpoints = [];
    const types = {};
    for (const file of endpointFiles) {
        const content = fs.readFileSync(file, 'utf-8');
        const doc = (0, document_parser_js_1.parseDocument)(content, path.relative(basePath, file));
        const resolved = resolveDocument(doc, { basePath });
        // Check for type definitions
        const typeBlocks = resolved.resolvedBlocks.filter((b) => b.type === 'omg.type');
        for (const block of typeBlocks) {
            const typeName = extractTypeName(block.content);
            if (typeName && block.parsed) {
                types[typeName] = block.parsed;
            }
        }
        // Build endpoint
        const endpoint = buildEndpoint(resolved);
        if (endpoint) {
            endpoints.push(endpoint);
        }
    }
    return {
        name: rootFrontMatter?.name || 'API',
        version: rootFrontMatter?.version || '1.0.0',
        baseUrl: rootFrontMatter?.baseUrl || '',
        description: rootDoc.description,
        endpoints,
        types,
    };
}
/**
 * Find all .omg.md files in a directory
 */
function findEndpointFiles(dir) {
    const files = [];
    function walk(currentDir) {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);
            if (entry.isDirectory()) {
                // Skip partials directory
                if (entry.name !== 'partials' && entry.name !== 'node_modules') {
                    walk(fullPath);
                }
            }
            else if (entry.name.endsWith('.omg.md')) {
                files.push(fullPath);
            }
        }
    }
    walk(dir);
    return files;
}
//# sourceMappingURL=resolver.js.map