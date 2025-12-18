"use strict";
/**
 * Document Parser
 *
 * Parses .omg.md files into an OmgDocument structure:
 * - Extracts front matter (YAML between ---)
 * - Extracts title (first # heading)
 * - Extracts description (prose content)
 * - Extracts code blocks by language tag
 * - Extracts partial references ({{> path }})
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDocument = parseDocument;
exports.parseHttpBlock = parseHttpBlock;
const gray_matter_1 = __importDefault(require("gray-matter"));
const unified_1 = require("unified");
const remark_parse_1 = __importDefault(require("remark-parse"));
const unist_util_visit_1 = require("unist-util-visit");
// Block type patterns
// Matches: omg.body, omg.response.201
const OMG_BLOCK_PATTERN = /^omg\.(path|query|headers|body|response|returns|example|type|errors|config)(\.(\d+))?$/;
// Matches: @when(fieldName = "value") in code block meta
const WHEN_PATTERN = /@when\((\w+)\s*=\s*"([^"]+)"\)/;
const PARTIAL_PATTERN = /\{\{>\s*([^}\s]+)\s*\}\}/g;
/**
 * Parse a .omg.md file into an OmgDocument
 */
function parseDocument(content, filePath) {
    // Extract front matter
    const { data: frontMatter, content: markdownContent } = (0, gray_matter_1.default)(content);
    // Parse Markdown
    const tree = (0, unified_1.unified)().use(remark_parse_1.default).parse(markdownContent);
    // Extract components
    const title = extractTitle(tree);
    const description = extractDescription(tree, markdownContent);
    const blocks = extractCodeBlocks(tree);
    const partials = extractPartials(markdownContent);
    return {
        filePath,
        frontMatter: Object.keys(frontMatter).length > 0 ? frontMatter : null,
        title,
        description,
        blocks,
        partials,
    };
}
/**
 * Extract the first # heading as the title
 */
function extractTitle(tree) {
    let title = null;
    (0, unist_util_visit_1.visit)(tree, 'heading', (node) => {
        if (node.depth === 1 && !title) {
            title = node.children
                .filter((child) => child.type === 'text')
                .map((child) => child.value)
                .join('');
        }
    });
    return title;
}
/**
 * Extract prose content as description (excluding code blocks and title)
 */
function extractDescription(tree, rawContent) {
    const descriptionParts = [];
    let foundTitle = false;
    for (const node of tree.children) {
        // Skip the first h1 (title)
        if (node.type === 'heading' && node.depth === 1 && !foundTitle) {
            foundTitle = true;
            continue;
        }
        // Skip code blocks
        if (node.type === 'code') {
            continue;
        }
        // Skip partial references (lines with {{> ... }})
        if (node.type === 'paragraph') {
            const text = extractTextFromNode(node);
            if (PARTIAL_PATTERN.test(text)) {
                continue;
            }
        }
        // Get the raw text for this node
        if (node.position) {
            const start = node.position.start.offset;
            const end = node.position.end.offset;
            descriptionParts.push(rawContent.slice(start, end));
        }
    }
    return descriptionParts.join('\n\n').trim();
}
/**
 * Extract text content from any node
 */
function extractTextFromNode(node) {
    if (node.type === 'text') {
        return node.value;
    }
    if (node.children) {
        return node.children.map(extractTextFromNode).join('');
    }
    return '';
}
/**
 * Extract code blocks with OMG language tags
 */
function extractCodeBlocks(tree) {
    const blocks = [];
    (0, unist_util_visit_1.visit)(tree, 'code', (node) => {
        const lang = node.lang || '';
        const line = node.position?.start.line || 0;
        // Check for http block
        if (lang === 'http') {
            blocks.push({
                type: 'http',
                content: node.value,
                line,
            });
            return;
        }
        // Check for omg.* blocks
        const match = lang.match(OMG_BLOCK_PATTERN);
        if (match) {
            const blockType = `omg.${match[1]}`;
            const statusCode = match[3] ? parseInt(match[3], 10) : undefined;
            // Parse @when condition from meta if present
            // remark-parse puts everything after the language tag in node.meta
            let whenCondition;
            if (node.meta) {
                const whenMatch = node.meta.match(WHEN_PATTERN);
                if (whenMatch) {
                    whenCondition = {
                        field: whenMatch[1],
                        value: whenMatch[2],
                    };
                }
            }
            blocks.push({
                type: blockType,
                statusCode,
                content: node.value,
                line,
                whenCondition,
            });
        }
    });
    return blocks;
}
/**
 * Extract partial references ({{> path }})
 */
function extractPartials(content) {
    const partials = [];
    const lines = content.split('\n');
    lines.forEach((line, index) => {
        let match;
        PARTIAL_PATTERN.lastIndex = 0;
        while ((match = PARTIAL_PATTERN.exec(line)) !== null) {
            partials.push({
                path: match[1],
                line: index + 1,
            });
        }
    });
    return partials;
}
/**
 * Parse the http block to extract method and path
 * Format: "GET /path/to/resource"
 */
function parseHttpBlock(content) {
    const trimmed = content.trim();
    const match = trimmed.match(/^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\s+(.+)$/i);
    if (!match) {
        return null;
    }
    return {
        method: match[1].toUpperCase(),
        path: match[2].trim(),
    };
}
//# sourceMappingURL=document-parser.js.map