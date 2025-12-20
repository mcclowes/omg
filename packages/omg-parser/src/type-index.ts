/**
 * Type Index
 *
 * Builds and queries a workspace-wide index of type definitions.
 * Used by the LSP server for hover, go-to-definition, and completions.
 */

import * as fs from 'fs';
import * as path from 'path';
import { parseDocument } from './document-parser.js';
import { resolveDocument, extractTypeName } from './resolver.js';
import type { OmgSchema } from './types.js';

/**
 * A type definition with its location in the workspace
 */
export interface TypeDefinition {
  /** The type name (e.g., "Account", "Invoice") */
  name: string;
  /** The parsed schema for this type */
  schema: OmgSchema;
  /** Absolute path to the file containing this type */
  filePath: string;
  /** Line number where the type is defined (1-based) */
  line: number;
}

/**
 * Index of all types in a workspace
 */
export interface TypeIndex {
  /** Map of type name to definition */
  types: Map<string, TypeDefinition>;
}

/**
 * Build a type index by scanning all .omg.md files in a directory
 */
export function buildTypeIndex(rootDir: string): TypeIndex {
  const types = new Map<string, TypeDefinition>();

  const files = findOmgFiles(rootDir);

  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const doc = parseDocument(content, path.relative(rootDir, file));

      // Try to resolve the document (may fail for missing partials)
      let resolvedBlocks = doc.blocks;
      try {
        const resolved = resolveDocument(doc, { basePath: path.dirname(file) });
        resolvedBlocks = resolved.resolvedBlocks;
      } catch {
        // Continue with unresolved blocks
      }

      // Find all omg.type blocks
      for (const block of resolvedBlocks) {
        if (block.type === 'omg.type' && block.parsed) {
          const typeName = extractTypeName(block.content);
          if (typeName) {
            types.set(typeName, {
              name: typeName,
              schema: block.parsed,
              filePath: file,
              line: block.line,
            });
          }
        }
      }
    } catch {
      // Skip files that can't be parsed
    }
  }

  return { types };
}

/**
 * Find a type definition by name
 */
export function findTypeDefinition(index: TypeIndex, name: string): TypeDefinition | undefined {
  return index.types.get(name);
}

/**
 * Get all type names in the index
 */
export function getTypeNames(index: TypeIndex): string[] {
  return Array.from(index.types.keys());
}

/**
 * Find all .omg.md files in a directory (recursive)
 */
function findOmgFiles(dir: string): string[] {
  const files: string[] = [];

  function walk(currentDir: string) {
    let entries;
    try {
      entries = fs.readdirSync(currentDir, { withFileTypes: true });
    } catch {
      return; // Skip directories we can't read
    }

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        // Skip common non-source directories
        if (
          entry.name !== 'node_modules' &&
          entry.name !== '.git' &&
          entry.name !== 'dist' &&
          entry.name !== 'build'
        ) {
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
