/**
 * Resolver
 *
 * Resolves partials and builds the complete API from multiple .omg.md files.
 */

import * as crypto from 'crypto';
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

/**
 * Document cache entry with content hash for invalidation
 */
interface CacheEntry {
  hash: string;
  document: OmgDocument;
}

/**
 * Document cache for parsed OMG files.
 * Uses content hashing to detect changes and avoid re-parsing unchanged files.
 */
class DocumentCache {
  private cache = new Map<string, CacheEntry>();
  private maxSize: number;

  constructor(maxSize = 100) {
    this.maxSize = maxSize;
  }

  /**
   * Get a cached document if it exists and content hasn't changed
   */
  get(filePath: string, content: string): OmgDocument | null {
    const entry = this.cache.get(filePath);
    if (!entry) return null;

    const hash = this.computeHash(content);
    if (entry.hash !== hash) {
      // Content changed, invalidate cache
      this.cache.delete(filePath);
      return null;
    }

    return entry.document;
  }

  /**
   * Store a parsed document in the cache
   */
  set(filePath: string, content: string, document: OmgDocument): void {
    // Evict oldest entries if at capacity (simple LRU-like behavior)
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    const hash = this.computeHash(content);
    this.cache.set(filePath, { hash, document });
  }

  /**
   * Clear all cached documents
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get the number of cached documents
   */
  get size(): number {
    return this.cache.size;
  }

  private computeHash(content: string): string {
    return crypto.createHash('md5').update(content).digest('hex');
  }
}

// Global document cache instance
const documentCache = new DocumentCache();

/**
 * Clear the document cache. Useful for testing or when files are known to have changed.
 */
export function clearDocumentCache(): void {
  documentCache.clear();
}

/**
 * Get the current document cache size. Useful for debugging and testing.
 */
export function getDocumentCacheSize(): number {
  return documentCache.size;
}

interface ResolverOptions {
  basePath: string;
  /** Disable caching for this resolution (useful for testing) */
  noCache?: boolean;
}

/**
 * Get helpful context for block parsing errors
 */
function getBlockHelp(blockType: string): string {
  const examples: Record<string, string> = {
    'omg.response': `Example:
\`\`\`omg.response
{
  id: string,
  name: string,
  createdAt: datetime
}
\`\`\``,
    'omg.body': `Example:
\`\`\`omg.body
{
  name: string,
  email: string @format("email"),
  age?: integer @min(0)
}
\`\`\``,
    'omg.path': `Example:
\`\`\`omg.path
{
  id: string  // Path parameter
}
\`\`\``,
    'omg.query': `Example:
\`\`\`omg.query
{
  page?: integer @min(1),
  limit?: integer @min(1) @max(100)
}
\`\`\``,
    'omg.type': `Example:
\`\`\`omg.type
type User = {
  id: uuid,
  name: string,
  email: string
}
\`\`\``,
  };
  return examples[blockType] || '';
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
    const chain = Array.from(visited).join(' → ') + ' → ' + docPath;
    throw new Error(
      `Circular partial reference detected.\n` +
        `Reference chain: ${chain}\n` +
        `To fix: Remove one of the circular @partial references.`
    );
  }
  visited.add(docPath);

  const resolvedBlocks: OmgBlock[] = [...doc.blocks];

  // Resolve each partial
  for (const partial of doc.partials) {
    const partialPath = resolvePartialPath(partial.path, options.basePath);

    if (!fs.existsSync(partialPath)) {
      throw new Error(
        `Partial not found: '${partial.path}' at line ${partial.line}.\n` +
          `Searched: ${partialPath}\n` +
          `Make sure the file exists in your partials/ directory.\n` +
          `Expected: partials/${partial.path}.omg.md`
      );
    }

    const partialContent = fs.readFileSync(partialPath, 'utf-8');

    // Try to get cached document, or parse and cache it
    let partialDoc: OmgDocument;
    if (!options.noCache) {
      const cached = documentCache.get(partialPath, partialContent);
      if (cached) {
        partialDoc = cached;
      } else {
        partialDoc = parseDocument(partialContent, partial.path);
        documentCache.set(partialPath, partialContent, partialDoc);
      }
    } else {
      partialDoc = parseDocument(partialContent, partial.path);
    }

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
          `Failed to parse omg.returns block at line ${block.line}.\n` +
            `${(error as Error).message}\n` +
            `Expected format:\n` +
            `  200: Success description\n` +
            `    { id: string }\n` +
            `  404: Not found\n` +
            `    { error: string }`
        );
      }
      continue;
    }

    // Parse other blocks as schemas
    if (!block.parsed) {
      // Skip parsing for empty content (e.g., 204 No Content responses)
      if (!block.content || block.content.trim() === '') {
        continue;
      }

      // For type blocks, strip the "type Name = " prefix before parsing
      let contentToParse = block.content;
      if (block.type === 'omg.type') {
        const typeDefMatch = contentToParse.match(/^\s*type\s+[A-Za-z_][A-Za-z0-9_]*\s*=\s*/);
        if (typeDefMatch) {
          contentToParse = contentToParse.slice(typeDefMatch[0].length);
        }
      }

      try {
        block.parsed = parseSchema(contentToParse);
      } catch (error) {
        // If schema parsing fails, might be pure JSON - try to parse as JSON
        try {
          const json = JSON.parse(contentToParse);
          block.parsed = inferSchemaFromJson(json);
        } catch {
          // Re-throw original error with context
          const blockHelp = getBlockHelp(block.type);
          throw new Error(
            `Failed to parse ${block.type} block at line ${block.line}.\n` +
              `${(error as Error).message}` +
              (blockHelp ? `\n\n${blockHelp}` : '')
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
  const exampleBlocks = doc.resolvedBlocks.filter((b) => b.type === 'omg.example');

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

  // Process example blocks and associate them with responses
  for (const exampleBlock of exampleBlocks) {
    // Default to 200 if no status code specified
    const statusCode = exampleBlock.statusCode || 200;

    // Ensure the response exists (create placeholder if needed)
    if (!responses[statusCode]) {
      responses[statusCode] = {
        schema: null,
      };
    }

    const response = responses[statusCode];
    const exampleValue = exampleBlock.exampleValue;

    if (exampleValue === undefined) {
      // Skip if we couldn't parse the JSON
      continue;
    }

    if (exampleBlock.exampleName) {
      // Named example - add to examples map
      if (!response.examples) {
        response.examples = {};
      }
      response.examples[exampleBlock.exampleName] = {
        summary: exampleBlock.exampleName, // Use name as summary
        description: exampleBlock.exampleDescription,
        value: exampleValue,
      };
    } else {
      // Unnamed example - use as the single example value
      // If there's already an example, convert to named examples
      if (response.example !== undefined) {
        // Convert existing single example to named example
        if (!response.examples) {
          response.examples = {};
        }
        response.examples['default'] = {
          value: response.example,
        };
        response.example = undefined;
        // Add new example with auto-generated name
        response.examples[`example-${Object.keys(response.examples).length + 1}`] = {
          description: exampleBlock.exampleDescription,
          value: exampleValue,
        };
      } else {
        response.example = exampleValue;
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
    // Pass through endpoint-level OAS fields
    security: frontMatter?.security,
    servers: frontMatter?.servers,
    externalDocs: frontMatter?.externalDocs,
    extensions: frontMatter?.extensions,
  };
}

export interface LoadApiOptions {
  /** Disable caching (useful for testing) */
  noCache?: boolean;
}

/**
 * Load and parse an entire API from a directory
 */
export function loadApi(rootPath: string, options: LoadApiOptions = {}): ParsedApi {
  const basePath = path.dirname(rootPath);

  // Load root API document
  const rootContent = fs.readFileSync(rootPath, 'utf-8');

  // Try to get cached root document
  let rootDoc: OmgDocument;
  if (!options.noCache) {
    const cached = documentCache.get(rootPath, rootContent);
    if (cached) {
      rootDoc = cached;
    } else {
      rootDoc = parseDocument(rootContent, path.basename(rootPath));
      documentCache.set(rootPath, rootContent, rootDoc);
    }
  } else {
    rootDoc = parseDocument(rootContent, path.basename(rootPath));
  }
  const rootFrontMatter = rootDoc.frontMatter as ApiFrontMatter | null;

  // Find all endpoint files
  const endpointFiles = findEndpointFiles(basePath);

  const endpoints: ParsedEndpoint[] = [];
  const types: Record<string, OmgSchema> = {};

  for (const file of endpointFiles) {
    const content = fs.readFileSync(file, 'utf-8');

    // Try to get cached endpoint document
    let doc: OmgDocument;
    if (!options.noCache) {
      const cached = documentCache.get(file, content);
      if (cached) {
        doc = cached;
      } else {
        doc = parseDocument(content, path.relative(basePath, file));
        documentCache.set(file, content, doc);
      }
    } else {
      doc = parseDocument(content, path.relative(basePath, file));
    }

    const resolved = resolveDocument(doc, { basePath, noCache: options.noCache });

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
    // Pass through all API-level OAS fields
    contact: rootFrontMatter?.contact,
    servers: rootFrontMatter?.servers,
    security: rootFrontMatter?.security,
    securitySchemes: rootFrontMatter?.securitySchemes,
    license: rootFrontMatter?.license,
    termsOfService: rootFrontMatter?.termsOfService,
    externalDocs: rootFrontMatter?.externalDocs,
    tags: rootFrontMatter?.tags,
    extensions: rootFrontMatter?.extensions,
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
