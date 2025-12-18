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
} from './types.js';

// Block type patterns
const OMG_BLOCK_PATTERN =
  /^omg\.(path|query|headers|body|response|returns|example|type|errors|config)(\.(\d+))?$/;
const PARTIAL_PATTERN = /\{\{>\s*([^}\s]+)\s*\}\}/g;

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
  const blocks = extractCodeBlocks(tree);
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

    // Skip partial references (lines with {{> ... }})
    if (node.type === 'paragraph') {
      const text = extractTextFromNode(node);
      if (PARTIAL_PATTERN.test(text)) {
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
function extractCodeBlocks(tree: Root): OmgBlock[] {
  const blocks: OmgBlock[] = [];

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

    // Check for omg.* blocks
    const match = lang.match(OMG_BLOCK_PATTERN);
    if (match) {
      const blockType = `omg.${match[1]}` as OmgBlockType;
      const statusCode = match[3] ? parseInt(match[3], 10) : undefined;

      blocks.push({
        type: blockType,
        statusCode,
        content: node.value,
        line,
      });
    }
  });

  return blocks;
}

/**
 * Extract partial references ({{> path }})
 */
function extractPartials(content: string): PartialRef[] {
  const partials: PartialRef[] = [];
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
