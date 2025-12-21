/**
 * Document Parser
 *
 * Parses .omg.md files into an OmgDocument structure:
 * - Extracts front matter (YAML between ---)
 * - Extracts title (first # heading)
 * - Extracts description (prose content)
 * - Extracts code blocks by language tag
 * - Extracts partial references ({{> path }} or @path)
 */

import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import type { Root, Code, Heading, Text } from 'mdast';
import type {
  OmgDocument,
  OmgBlock,
  OmgBlockType,
  PartialRef,
  EndpointFrontMatter,
  WhenCondition,
} from './types.js';

// Block type patterns
// Matches: omg.body, omg.response.201
const OMG_BLOCK_PATTERN =
  /^omg\.(path|query|headers|body|response|returns|example|type|errors|config)(\.(\d+))?$/;
// Extended pattern for example blocks with optional name
// Matches: omg.example, omg.example.201, omg.example.success, omg.example.201.success
const EXAMPLE_BLOCK_PATTERN = /^omg\.example(?:\.(\d+))?(?:\.([a-zA-Z][a-zA-Z0-9_-]*))?$/;
// Matches: @when(fieldName = "value") in code block meta
const WHEN_PATTERN = /@when\((\w+)\s*=\s*"([^"]+)"\)/;
// Partial patterns - two syntaxes supported:
// - Handlebars style: {{> path/to/partial }}
// - OMG style: @path/to/partial
const PARTIAL_PATTERN = /\{\{>\s*([^}\s]+)\s*\}\}/g;
const AT_PARTIAL_PATTERN = /(?:^|\s)@([a-zA-Z][a-zA-Z0-9_/-]*)(?:\s|$)/g;

/**
 * Parse a .omg.md file into an OmgDocument
 */
export function parseDocument(content: string, filePath: string): OmgDocument {
  // Extract front matter
  const { data: frontMatter, content: markdownContent } = matter(content);

  // Parse Markdown
  const tree = unified().use(remarkParse).parse(markdownContent) as Root;

  // Extract components
  const title = extractTitle(tree);
  const description = extractDescription(tree, markdownContent);
  const blocks = extractCodeBlocks(tree, markdownContent);
  const partials = extractPartials(markdownContent);

  return {
    filePath,
    frontMatter: Object.keys(frontMatter).length > 0 ? (frontMatter as EndpointFrontMatter) : null,
    title,
    description,
    blocks,
    partials,
  };
}

/**
 * Extract the first # heading as the title
 */
function extractTitle(tree: Root): string | null {
  let title: string | null = null;

  visit(tree, 'heading', (node: Heading) => {
    if (node.depth === 1 && !title) {
      title = node.children
        .filter((child): child is Text => child.type === 'text')
        .map((child) => child.value)
        .join('');
    }
  });

  return title;
}

/**
 * Extract prose content as description (excluding code blocks and title)
 */
function extractDescription(tree: Root, rawContent: string): string {
  const descriptionParts: string[] = [];
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

    // Skip partial references ({{> ... }} or @path)
    if (node.type === 'paragraph') {
      const text = extractTextFromNode(node);
      // Reset lastIndex for global regex patterns
      PARTIAL_PATTERN.lastIndex = 0;
      AT_PARTIAL_PATTERN.lastIndex = 0;
      if (PARTIAL_PATTERN.test(text) || AT_PARTIAL_PATTERN.test(text)) {
        continue;
      }
    }

    // Get the raw text for this node
    if (node.position) {
      const start = node.position.start.offset!;
      const end = node.position.end.offset!;
      descriptionParts.push(rawContent.slice(start, end));
    }
  }

  return descriptionParts.join('\n\n').trim();
}

/**
 * Extract text content from any node
 */
function extractTextFromNode(node: any): string {
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
function extractCodeBlocks(tree: Root, rawContent: string): OmgBlock[] {
  const blocks: OmgBlock[] = [];

  // Build a map of code block start lines to preceding paragraph content
  // for capturing example descriptions
  const precedingContent = buildPrecedingContentMap(tree, rawContent);

  visit(tree, 'code', (node: Code) => {
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

    // Check for omg.example blocks with extended syntax first
    const exampleMatch = lang.match(EXAMPLE_BLOCK_PATTERN);
    if (exampleMatch) {
      // Parse status code and name from extended pattern
      // Groups: [1] = status code (optional), [2] = name (optional)
      const statusCode = exampleMatch[1] ? parseInt(exampleMatch[1], 10) : undefined;
      const exampleName = exampleMatch[2] || undefined;

      // Get the preceding markdown content as description
      const exampleDescription = precedingContent.get(line);

      // Parse the JSON value
      let exampleValue: unknown;
      try {
        exampleValue = JSON.parse(node.value);
      } catch {
        // If not valid JSON, store as-is (will be handled by resolver)
        exampleValue = undefined;
      }

      blocks.push({
        type: 'omg.example',
        statusCode,
        content: node.value,
        line,
        exampleName,
        exampleDescription,
        exampleValue,
      });
      return;
    }

    // Check for other omg.* blocks
    const match = lang.match(OMG_BLOCK_PATTERN);
    if (match) {
      const blockType = `omg.${match[1]}` as OmgBlockType;
      const statusCode = match[3] ? parseInt(match[3], 10) : undefined;

      // Parse @when condition from meta if present
      // remark-parse puts everything after the language tag in node.meta
      let whenCondition: WhenCondition | undefined;
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
 * Build a map from code block start lines to preceding paragraph content.
 * This captures markdown context before example blocks.
 */
function buildPrecedingContentMap(tree: Root, rawContent: string): Map<number, string> {
  const precedingMap = new Map<number, string>();
  const children = tree.children;

  for (let i = 0; i < children.length; i++) {
    const node = children[i];
    if (node.type !== 'code') continue;

    const codeNode = node as Code;
    const lang = codeNode.lang || '';

    // Only capture context for example blocks
    if (!lang.startsWith('omg.example')) continue;

    const codeLine = node.position?.start.line || 0;

    // Collect preceding paragraph(s) until we hit another code block or heading
    const descriptionParts: string[] = [];
    for (let j = i - 1; j >= 0; j--) {
      const prevNode = children[j];

      // Stop at headings (they define sections, not example descriptions)
      if (prevNode.type === 'heading') break;

      // Stop at code blocks (examples shouldn't inherit descriptions from before other code)
      if (prevNode.type === 'code') break;

      // Collect paragraph content
      if (prevNode.type === 'paragraph' && prevNode.position) {
        const start = prevNode.position.start.offset!;
        const end = prevNode.position.end.offset!;
        const text = rawContent.slice(start, end).trim();

        // Skip partial references
        PARTIAL_PATTERN.lastIndex = 0;
        AT_PARTIAL_PATTERN.lastIndex = 0;
        if (PARTIAL_PATTERN.test(text) || AT_PARTIAL_PATTERN.test(text)) {
          continue;
        }

        descriptionParts.unshift(text);
      }
    }

    if (descriptionParts.length > 0) {
      precedingMap.set(codeLine, descriptionParts.join('\n\n'));
    }
  }

  return precedingMap;
}

/**
 * Extract partial references from both syntaxes:
 * - Handlebars style: {{> path/to/partial }}
 * - OMG style: @path/to/partial
 */
function extractPartials(content: string): PartialRef[] {
  const partials: PartialRef[] = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    let match;

    // Check Handlebars-style partials: {{> path }}
    PARTIAL_PATTERN.lastIndex = 0;
    while ((match = PARTIAL_PATTERN.exec(line)) !== null) {
      partials.push({
        path: match[1],
        line: index + 1,
      });
    }

    // Check OMG-style partials: @path
    AT_PARTIAL_PATTERN.lastIndex = 0;
    while ((match = AT_PARTIAL_PATTERN.exec(line)) !== null) {
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
export function parseHttpBlock(content: string): { method: string; path: string } | null {
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
