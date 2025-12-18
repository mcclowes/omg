/**
 * Resolver
 *
 * Resolves partials and builds the complete API from multiple .omg.md files.
 */

import * as fs from 'fs';
import * as path from 'path';
import { parseDocument, parseHttpBlock } from './document-parser.js';
import { parseSchema, inferSchemaFromJson } from './schema-parser.js';
import { parseReturnsBlock } from './returns-parser.js';
import type {
  OmgDocument,
  OmgBlock,
  ParsedEndpoint,
  ParsedApi,
  ParsedResponse,
  OmgSchema,
  HttpMethod,
  EndpointFrontMatter,
  ApiFrontMatter,
  ParseWarning,
} from './types.js';

interface ResolverOptions {
  basePath: string;
}

export interface ResolvedDocument extends OmgDocument {
  resolvedBlocks: OmgBlock[];
  warnings: ParseWarning[];
}

/**
 * Resolve a single document, loading and inlining partials
 */
export function resolveDocument(
  doc: OmgDocument,
  options: ResolverOptions,
  visited: Set<string> = new Set()
): ResolvedDocument {
  const docPath = path.resolve(options.basePath, doc.filePath);
  const warnings: ParseWarning[] = [];

  // Prevent circular references
  if (visited.has(docPath)) {
    throw new Error(`Circular partial reference detected: ${docPath}`);
  }
  visited.add(docPath);

  const resolvedBlocks: OmgBlock[] = [...doc.blocks];

  // Resolve each partial
  for (const partial of doc.partials) {
    const partialPath = resolvePartialPath(partial.path, options.basePath);

    if (!fs.existsSync(partialPath)) {
      throw new Error(`Partial not found: ${partial.path} (resolved to ${partialPath})`);
    }

    const partialContent = fs.readFileSync(partialPath, 'utf-8');
    const partialDoc = parseDocument(partialContent, partial.path);

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
        const result = parseReturnsBlock(block.content);
        block.parsedResponses = result.block;
        // Add warnings with block context
        for (const warning of result.warnings) {
          warnings.push({
            ...warning,
            message: `[${block.type} at line ${block.line}] ${warning.message}`,
          });
        }
      } catch (error) {
        throw new Error(
          `Failed to parse returns block at line ${block.line}: ${(error as Error).message}`
        );
      }
      continue;
    }

    // Parse other blocks as schemas
    if (!block.parsed) {
      try {
        block.parsed = parseSchema(block.content);
      } catch (error) {
        // If schema parsing fails, might be pure JSON - try to parse as JSON
        try {
          const json = JSON.parse(block.content);
          block.parsed = inferSchemaFromJson(json);
        } catch {
          // Re-throw original error with context
          throw new Error(
            `Failed to parse ${block.type} block at line ${block.line}: ${(error as Error).message}`
          );
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
function resolvePartialPath(partialPath: string, basePath: string): string {
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
export function extractTypeName(content: string): string | null {
  // Match "type" keyword followed by an identifier
  const match = content.match(/^\s*type\s+([A-Z][a-zA-Z0-9_]*)/);
  return match ? match[1] : null;
}

/**
 * Build a ParsedEndpoint from a resolved document
 */
export function buildEndpoint(doc: ResolvedDocument): ParsedEndpoint | null {
  const endpoints = buildEndpoints(doc);
  return endpoints.length > 0 ? endpoints[0] : null;
}

/**
 * Build ParsedEndpoints from a resolved document.
 * When expandVariants is set, expands into multiple endpoints based on @when conditions.
 */
export function buildEndpoints(doc: ResolvedDocument): ParsedEndpoint[] {
  const frontMatter = doc.frontMatter as EndpointFrontMatter | null;

  // Get method and path from front matter or http block
  let method: HttpMethod | null = null;
  let urlPath: string | null = null;

  if (frontMatter?.method && frontMatter?.path) {
    method = frontMatter.method;
    urlPath = frontMatter.path;
  } else {
    // Look for http block
    const httpBlock = doc.resolvedBlocks.find((b) => b.type === 'http');
    if (httpBlock) {
      const parsed = parseHttpBlock(httpBlock.content);
      if (parsed) {
        method = parsed.method as HttpMethod;
        urlPath = parsed.path;
      }
    }
  }

  if (!method || !urlPath) {
    return []; // Not an endpoint document
  }

  // Check for variant expansion
  const expandVariantsField = frontMatter?.expandVariants;

  if (expandVariantsField) {
    return buildExpandedEndpoints(doc, method, urlPath, expandVariantsField, frontMatter);
  }

  // Standard single endpoint
  return [buildSingleEndpoint(doc, method, urlPath, frontMatter)];
}

/**
 * Build expanded endpoints when expandVariants is set
 */
function buildExpandedEndpoints(
  doc: ResolvedDocument,
  method: HttpMethod,
  basePath: string,
  expandField: string,
  frontMatter: EndpointFrontMatter | null
): ParsedEndpoint[] {
  // Find all unique variant values from @when conditions matching the expand field
  const variantValues = new Set<string>();
  for (const block of doc.resolvedBlocks) {
    if (block.whenCondition && block.whenCondition.field === expandField) {
      variantValues.add(block.whenCondition.value);
    }
  }

  if (variantValues.size === 0) {
    // No variants found, return empty (or could warn)
    return [];
  }

  const endpoints: ParsedEndpoint[] = [];

  for (const variantValue of variantValues) {
    // Filter blocks for this variant:
    // - Include blocks with matching @when condition
    // - Include blocks without any @when condition (shared)
    const variantBlocks = doc.resolvedBlocks.filter((block) => {
      if (!block.whenCondition) {
        return true; // No condition = shared across all variants
      }
      return (
        block.whenCondition.field === expandField && block.whenCondition.value === variantValue
      );
    });

    // Build operation ID with variant suffix
    const baseOperationId =
      frontMatter?.operationId ||
      `${method.toLowerCase()}-${basePath
        .replace(/[{}\/]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')}`;
    const operationId = `${baseOperationId}-${variantValue}`;

    // Build path with #variant suffix
    const variantPath = `${basePath}#${variantValue}`;

    // Build summary with variant
    const baseSummary = frontMatter?.summary || doc.title || '';
    const summary = baseSummary ? `${baseSummary} (${variantValue})` : variantValue;

    // Collect blocks by type (from filtered variant blocks)
    const pathBlock = variantBlocks.find((b) => b.type === 'omg.path');
    const queryBlock = variantBlocks.find((b) => b.type === 'omg.query');
    const headersBlock = variantBlocks.find((b) => b.type === 'omg.headers');
    const bodyBlock = variantBlocks.find((b) => b.type === 'omg.body');
    const returnsBlocks = variantBlocks.filter((b) => b.type === 'omg.returns');
    const responseBlocks = variantBlocks.filter(
      (b) => b.type === 'omg.response' || b.type.startsWith('omg.response.')
    );

    // Build responses map
    const responses: Record<number, ParsedResponse> = {};

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

    for (const block of responseBlocks) {
      const statusCode = block.statusCode || 200;
      if (block.parsed) {
        if (!responses[statusCode]) {
          responses[statusCode] = {
            schema: block.parsed,
          };
        }
      }
    }

    endpoints.push({
      method,
      path: variantPath,
      operationId,
      tags: frontMatter?.tags || [],
      summary,
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
    });
  }

  return endpoints;
}

/**
 * Build a single endpoint (no variant expansion)
 */
function buildSingleEndpoint(
  doc: ResolvedDocument,
  method: HttpMethod,
  urlPath: string,
  frontMatter: EndpointFrontMatter | null
): ParsedEndpoint {
  // Build operation ID
  const operationId =
    frontMatter?.operationId ||
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
  const responseBlocks = doc.resolvedBlocks.filter(
    (b) => b.type === 'omg.response' || b.type.startsWith('omg.response.')
  );

  // Build responses map with conditions and descriptions
  const responses: Record<number, ParsedResponse> = {};

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
export function loadApi(rootPath: string): ParsedApi {
  const basePath = path.dirname(rootPath);

  // Load root API document
  const rootContent = fs.readFileSync(rootPath, 'utf-8');
  const rootDoc = parseDocument(rootContent, path.basename(rootPath));
  const rootFrontMatter = rootDoc.frontMatter as ApiFrontMatter | null;

  // Find all endpoint files
  const endpointFiles = findEndpointFiles(basePath);

  const endpoints: ParsedEndpoint[] = [];
  const types: Record<string, OmgSchema> = {};

  for (const file of endpointFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const doc = parseDocument(content, path.relative(basePath, file));
    const resolved = resolveDocument(doc, { basePath });

    // Check for type definitions
    const typeBlocks = resolved.resolvedBlocks.filter((b) => b.type === 'omg.type');
    for (const block of typeBlocks) {
      const typeName = extractTypeName(block.content);
      if (typeName && block.parsed) {
        types[typeName] = block.parsed;
      }
    }

    // Build endpoints (may be multiple if expandVariants is used)
    const docEndpoints = buildEndpoints(resolved);
    endpoints.push(...docEndpoints);
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
function findEndpointFiles(dir: string): string[] {
  const files: string[] = [];

  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        // Skip partials directory
        if (entry.name !== 'partials' && entry.name !== 'node_modules') {
          walk(fullPath);
        }
      } else if (entry.name.endsWith('.omg.md')) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}
