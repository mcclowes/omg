#!/usr/bin/env node

/**
 * OMG Language Server
 *
 * Provides Language Server Protocol support for OMG files:
 * - Diagnostics (validation errors/warnings)
 * - Completions (type names, annotations, block types)
 * - Hover information
 */

import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  InitializeParams,
  InitializeResult,
  TextDocumentSyncKind,
  Diagnostic,
  DiagnosticSeverity,
  CompletionItem,
  CompletionItemKind,
  Hover,
  MarkupKind,
  Position,
  Definition,
  DocumentSymbol,
  SymbolKind,
  TextEdit,
  CodeAction,
  CodeActionKind,
  Range,
} from 'vscode-languageserver/node.js';

import { TextDocument } from 'vscode-languageserver-textdocument';
import { fileURLToPath, pathToFileURL } from 'url';
import * as path from 'path';

import {
  parseDocument,
  resolveDocument,
  buildTypeIndex,
  findTypeDefinition,
  formatTypeForHover,
  formatDocument,
  type TypeIndex,
  type OmgDocument,
  type OmgBlock,
} from 'omg-parser';
import { lintDocument, type Severity } from 'omg-linter';

// Create connection
const connection = createConnection(ProposedFeatures.all);

// Document manager
const documents = new TextDocuments(TextDocument);

// Workspace state
let workspaceRoot: string | null = null;
let typeIndex: TypeIndex | null = null;

/**
 * Get or build the type index for the workspace
 */
function getTypeIndex(): TypeIndex | null {
  if (!typeIndex && workspaceRoot) {
    try {
      typeIndex = buildTypeIndex(workspaceRoot);
      connection.console.log(`Built type index with ${typeIndex.types.size} types`);
    } catch (error) {
      connection.console.error(`Failed to build type index: ${error}`);
    }
  }
  return typeIndex;
}

// Initialization
connection.onInitialize((params: InitializeParams): InitializeResult => {
  connection.console.log('OMG Language Server initializing...');

  // Capture workspace root for type indexing
  if (params.rootUri) {
    try {
      workspaceRoot = fileURLToPath(params.rootUri);
      connection.console.log(`Workspace root: ${workspaceRoot}`);
    } catch {
      // Fallback for non-file URIs
    }
  }

  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      completionProvider: {
        resolveProvider: false,
        triggerCharacters: ['.', '@', '{', ':'],
      },
      hoverProvider: true,
      definitionProvider: true,
      documentFormattingProvider: true,
      documentSymbolProvider: true,
      codeActionProvider: {
        codeActionKinds: [CodeActionKind.QuickFix],
      },
    },
  };
});

connection.onInitialized(() => {
  connection.console.log('OMG Language Server initialized');
});

// Invalidate type index when files change
connection.onDidChangeWatchedFiles(() => {
  typeIndex = null;
  connection.console.log('Type index invalidated due to file changes');
});

// Validate document
async function validateDocument(textDocument: TextDocument): Promise<void> {
  const text = textDocument.getText();
  const diagnostics: Diagnostic[] = [];

  try {
    // Parse the document
    const doc = parseDocument(text, textDocument.uri);

    // Try to resolve (may fail for partials)
    let resolved;
    try {
      resolved = resolveDocument(doc, { basePath: '.' });
    } catch {
      resolved = { ...doc, resolvedBlocks: doc.blocks };
    }

    // Run linter
    const lintResults = lintDocument({ document: resolved });

    // Convert lint results to diagnostics
    for (const result of lintResults) {
      const severity = mapSeverity(result.severity);
      const line = result.line ?? 0;

      diagnostics.push({
        severity,
        range: {
          start: { line: Math.max(0, line - 1), character: 0 },
          end: { line: Math.max(0, line - 1), character: Number.MAX_VALUE },
        },
        message: result.message,
        source: 'omg',
        code: result.rule,
      });
    }
  } catch (error) {
    // Parse error
    const errorMessage = error instanceof Error ? error.message : String(error);

    // Try to extract line number from error message
    const lineMatch = errorMessage.match(/line (\d+)/i);
    const line = lineMatch ? parseInt(lineMatch[1], 10) - 1 : 0;

    diagnostics.push({
      severity: DiagnosticSeverity.Error,
      range: {
        start: { line, character: 0 },
        end: { line, character: Number.MAX_VALUE },
      },
      message: errorMessage,
      source: 'omg',
    });
  }

  connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}

function mapSeverity(severity: Severity): DiagnosticSeverity {
  switch (severity) {
    case 'error':
      return DiagnosticSeverity.Error;
    case 'warn':
      return DiagnosticSeverity.Warning;
    case 'hint':
      return DiagnosticSeverity.Hint;
    default:
      return DiagnosticSeverity.Information;
  }
}

// Document change handlers
documents.onDidChangeContent((change) => {
  validateDocument(change.document);
});

documents.onDidOpen((event) => {
  validateDocument(event.document);
});

// Completions
connection.onCompletion((params): CompletionItem[] => {
  const document = documents.get(params.textDocument.uri);
  if (!document) return [];

  const position = params.position;
  const text = document.getText();
  const offset = document.offsetAt(position);

  // Get current line up to cursor
  const lineStart = text.lastIndexOf('\n', offset - 1) + 1;
  const lineText = text.substring(lineStart, offset);

  const completions: CompletionItem[] = [];

  // Inside code block fence - suggest block types
  if (lineText.match(/^```omg\.?$/)) {
    completions.push(
      { label: 'omg.path', kind: CompletionItemKind.Keyword, detail: 'Path parameters' },
      { label: 'omg.query', kind: CompletionItemKind.Keyword, detail: 'Query parameters' },
      { label: 'omg.headers', kind: CompletionItemKind.Keyword, detail: 'Header parameters' },
      { label: 'omg.body', kind: CompletionItemKind.Keyword, detail: 'Request body schema' },
      { label: 'omg.response', kind: CompletionItemKind.Keyword, detail: 'Default (200) response' },
      { label: 'omg.response.201', kind: CompletionItemKind.Keyword, detail: 'Created response' },
      {
        label: 'omg.response.400',
        kind: CompletionItemKind.Keyword,
        detail: 'Bad request response',
      },
      {
        label: 'omg.response.401',
        kind: CompletionItemKind.Keyword,
        detail: 'Unauthorized response',
      },
      { label: 'omg.response.404', kind: CompletionItemKind.Keyword, detail: 'Not found response' },
      {
        label: 'omg.response.500',
        kind: CompletionItemKind.Keyword,
        detail: 'Server error response',
      },
      { label: 'omg.returns', kind: CompletionItemKind.Keyword, detail: 'Conditional responses' },
      { label: 'omg.type', kind: CompletionItemKind.Keyword, detail: 'Type definition' },
      { label: 'omg.example', kind: CompletionItemKind.Keyword, detail: 'Example data (JSON)' },
      { label: 'omg.errors', kind: CompletionItemKind.Keyword, detail: 'Error definitions' },
      { label: 'omg.config', kind: CompletionItemKind.Keyword, detail: 'Configuration block' }
    );
    return completions;
  }

  // Typing an annotation
  if (lineText.includes('@')) {
    completions.push(
      {
        label: '@min',
        kind: CompletionItemKind.Function,
        detail: 'Minimum value',
        insertText: '@min(${1:0})',
      },
      {
        label: '@max',
        kind: CompletionItemKind.Function,
        detail: 'Maximum value',
        insertText: '@max(${1:100})',
      },
      {
        label: '@minLength',
        kind: CompletionItemKind.Function,
        detail: 'Minimum string length',
        insertText: '@minLength(${1:1})',
      },
      {
        label: '@maxLength',
        kind: CompletionItemKind.Function,
        detail: 'Maximum string length',
        insertText: '@maxLength(${1:255})',
      },
      {
        label: '@pattern',
        kind: CompletionItemKind.Function,
        detail: 'Regex pattern',
        insertText: '@pattern("${1:.*}")',
      },
      {
        label: '@format',
        kind: CompletionItemKind.Function,
        detail: 'Format hint',
        insertText: '@format("${1:email}")',
      },
      {
        label: '@minItems',
        kind: CompletionItemKind.Function,
        detail: 'Minimum array items',
        insertText: '@minItems(${1:1})',
      },
      {
        label: '@maxItems',
        kind: CompletionItemKind.Function,
        detail: 'Maximum array items',
        insertText: '@maxItems(${1:100})',
      }
    );
    return completions;
  }

  // Inside a code block (after colon or at field type position)
  if (isInsideOmgBlock(text, offset)) {
    // Primitive types
    completions.push(
      { label: 'string', kind: CompletionItemKind.TypeParameter, detail: 'String type' },
      { label: 'integer', kind: CompletionItemKind.TypeParameter, detail: 'Integer type' },
      { label: 'number', kind: CompletionItemKind.TypeParameter, detail: 'Number (float) type' },
      { label: 'decimal', kind: CompletionItemKind.TypeParameter, detail: 'Decimal type' },
      { label: 'boolean', kind: CompletionItemKind.TypeParameter, detail: 'Boolean type' },
      { label: 'date', kind: CompletionItemKind.TypeParameter, detail: 'Date type (YYYY-MM-DD)' },
      {
        label: 'datetime',
        kind: CompletionItemKind.TypeParameter,
        detail: 'DateTime type (ISO 8601)',
      },
      { label: 'uuid', kind: CompletionItemKind.TypeParameter, detail: 'UUID type' },
      { label: 'any', kind: CompletionItemKind.TypeParameter, detail: 'Any type' }
    );

    // User-defined types from workspace
    const index = getTypeIndex();
    if (index) {
      for (const [name, def] of index.types) {
        completions.push({
          label: name,
          kind: CompletionItemKind.Class,
          detail: `Type from ${path.basename(def.filePath)}`,
        });
      }
    }

    return completions;
  }

  // In frontmatter - suggest method
  if (lineText.match(/^method:\s*$/)) {
    completions.push(
      { label: 'GET', kind: CompletionItemKind.EnumMember, detail: 'Retrieve resource(s)' },
      { label: 'POST', kind: CompletionItemKind.EnumMember, detail: 'Create resource' },
      { label: 'PUT', kind: CompletionItemKind.EnumMember, detail: 'Replace resource' },
      { label: 'PATCH', kind: CompletionItemKind.EnumMember, detail: 'Update resource' },
      { label: 'DELETE', kind: CompletionItemKind.EnumMember, detail: 'Delete resource' },
      { label: 'HEAD', kind: CompletionItemKind.EnumMember, detail: 'Get headers only' },
      { label: 'OPTIONS', kind: CompletionItemKind.EnumMember, detail: 'Get allowed methods' }
    );
    return completions;
  }

  // In frontmatter - suggest auth type
  if (lineText.match(/^auth:\s*$/)) {
    completions.push(
      {
        label: 'bearer',
        kind: CompletionItemKind.EnumMember,
        detail: 'Bearer token authentication',
      },
      { label: 'apikey', kind: CompletionItemKind.EnumMember, detail: 'API key authentication' },
      { label: 'none', kind: CompletionItemKind.EnumMember, detail: 'No authentication required' },
      { label: 'basic', kind: CompletionItemKind.EnumMember, detail: 'HTTP Basic authentication' },
      { label: 'oauth2', kind: CompletionItemKind.EnumMember, detail: 'OAuth 2.0 authentication' }
    );
    return completions;
  }

  // In frontmatter - suggest boolean for deprecated
  if (lineText.match(/^deprecated:\s*$/)) {
    completions.push(
      { label: 'true', kind: CompletionItemKind.Value },
      { label: 'false', kind: CompletionItemKind.Value }
    );
    return completions;
  }

  // Check if we're in frontmatter (between --- markers)
  const beforeCursor = text.substring(0, offset);
  const inFrontmatter = isInFrontmatter(beforeCursor);

  if (inFrontmatter) {
    // Suggest frontmatter keys at the start of a line
    if (lineText.match(/^\s*$/)) {
      completions.push(
        {
          label: 'method',
          kind: CompletionItemKind.Property,
          detail: 'HTTP method',
          insertText: 'method: ',
        },
        {
          label: 'path',
          kind: CompletionItemKind.Property,
          detail: 'API path',
          insertText: 'path: /',
        },
        {
          label: 'operationId',
          kind: CompletionItemKind.Property,
          detail: 'Unique operation identifier',
          insertText: 'operationId: ',
        },
        {
          label: 'tags',
          kind: CompletionItemKind.Property,
          detail: 'Operation tags',
          insertText: 'tags: [${1}]',
        },
        {
          label: 'summary',
          kind: CompletionItemKind.Property,
          detail: 'Short description',
          insertText: 'summary: ',
        },
        {
          label: 'deprecated',
          kind: CompletionItemKind.Property,
          detail: 'Mark as deprecated',
          insertText: 'deprecated: true',
        },
        {
          label: 'auth',
          kind: CompletionItemKind.Property,
          detail: 'Authentication type',
          insertText: 'auth: ',
        },
        {
          label: 'follows',
          kind: CompletionItemKind.Property,
          detail: 'Required prior operations',
          insertText: 'follows: [${1}]',
        },
        {
          label: 'security',
          kind: CompletionItemKind.Property,
          detail: 'Security requirements',
          insertText: 'security:\n  - ${1}: []',
        }
      );
      return completions;
    }
  }

  return completions;
});

function isInFrontmatter(text: string): boolean {
  const lines = text.split('\n');
  let dashCount = 0;

  for (const line of lines) {
    if (line.trim() === '---') {
      dashCount++;
    }
  }

  // In frontmatter if we've seen exactly one ---
  return dashCount === 1;
}

// Check if position is inside an OMG code block
function isInsideOmgBlock(text: string, offset: number): boolean {
  const before = text.substring(0, offset);
  const blockStart = before.lastIndexOf('```omg');
  if (blockStart === -1) return false;

  const blockEnd = before.indexOf('```', blockStart + 6);
  return blockEnd === -1; // If no closing ```, we're inside the block
}

// Hover
connection.onHover((params): Hover | null => {
  const document = documents.get(params.textDocument.uri);
  if (!document) return null;

  const position = params.position;
  const text = document.getText();
  const word = getWordAtPosition(document, position);

  if (!word) return null;

  // Primitive type documentation
  const typeDoc = getTypeDocumentation(word);
  if (typeDoc) {
    return {
      contents: {
        kind: MarkupKind.Markdown,
        value: typeDoc,
      },
    };
  }

  // Annotation documentation
  const annotationDoc = getAnnotationDocumentation(word);
  if (annotationDoc) {
    return {
      contents: {
        kind: MarkupKind.Markdown,
        value: annotationDoc,
      },
    };
  }

  // Check for user-defined type references (PascalCase words)
  if (/^[A-Z][a-zA-Z0-9]*$/.test(word)) {
    const index = getTypeIndex();
    if (index) {
      const typeDef = findTypeDefinition(index, word);
      if (typeDef) {
        return {
          contents: {
            kind: MarkupKind.Markdown,
            value: formatTypeForHover(typeDef.name, typeDef.schema, typeDef.filePath),
          },
        };
      }
    }
  }

  return null;
});

// Go to Definition
connection.onDefinition((params): Definition | null => {
  const document = documents.get(params.textDocument.uri);
  if (!document) return null;

  const word = getWordAtPosition(document, params.position);
  if (!word) return null;

  // Only look up PascalCase words (type references)
  if (!/^[A-Z][a-zA-Z0-9]*$/.test(word)) {
    return null;
  }

  const index = getTypeIndex();
  if (!index) return null;

  const typeDef = findTypeDefinition(index, word);
  if (!typeDef) return null;

  return {
    uri: pathToFileURL(typeDef.filePath).toString(),
    range: {
      start: { line: typeDef.line - 1, character: 0 },
      end: { line: typeDef.line - 1, character: 0 },
    },
  };
});

function getWordAtPosition(document: TextDocument, position: Position): string | null {
  const text = document.getText();
  const offset = document.offsetAt(position);

  // Find word boundaries
  let start = offset;
  let end = offset;

  while (start > 0 && /[\w@]/.test(text[start - 1])) {
    start--;
  }

  while (end < text.length && /[\w]/.test(text[end])) {
    end++;
  }

  if (start === end) return null;

  return text.substring(start, end);
}

function getTypeDocumentation(type: string): string | null {
  const docs: Record<string, string> = {
    string: '**string**\n\nA text value.\n\n```omg\nname: string\n```',
    integer: '**integer**\n\nA whole number (no decimals).\n\n```omg\ncount: integer\n```',
    number: '**number**\n\nA floating-point number.\n\n```omg\nprice: number\n```',
    decimal:
      '**decimal**\n\nA precise decimal number (for currency, etc.).\n\n```omg\namount: decimal\n```',
    boolean: '**boolean**\n\nA true/false value.\n\n```omg\nisActive: boolean\n```',
    date: '**date**\n\nA date in YYYY-MM-DD format.\n\n```omg\nbirthDate: date\n```',
    datetime: '**datetime**\n\nAn ISO 8601 date-time.\n\n```omg\ncreatedAt: datetime\n```',
    uuid: '**uuid**\n\nA UUID (universally unique identifier).\n\n```omg\nid: uuid\n```',
    any: '**any**\n\nAny JSON value (use sparingly).\n\n```omg\nmetadata: any\n```',
  };

  return docs[type] || null;
}

function getAnnotationDocumentation(annotation: string): string | null {
  const docs: Record<string, string> = {
    '@min': '**@min(value)**\n\nMinimum numeric value.\n\n```omg\nage: integer @min(0)\n```',
    '@max': '**@max(value)**\n\nMaximum numeric value.\n\n```omg\nage: integer @max(150)\n```',
    '@minLength':
      '**@minLength(value)**\n\nMinimum string length.\n\n```omg\nname: string @minLength(1)\n```',
    '@maxLength':
      '**@maxLength(value)**\n\nMaximum string length.\n\n```omg\nname: string @maxLength(100)\n```',
    '@pattern':
      '**@pattern("regex")**\n\nRegular expression pattern.\n\n```omg\nemail: string @pattern("^[^@]+@[^@]+$")\n```',
    '@format':
      '**@format("hint")**\n\nFormat hint (email, uri, etc.).\n\n```omg\nemail: string @format("email")\n```',
    '@minItems':
      '**@minItems(value)**\n\nMinimum array items.\n\n```omg\nitems: Product[] @minItems(1)\n```',
    '@maxItems':
      '**@maxItems(value)**\n\nMaximum array items.\n\n```omg\nitems: Product[] @maxItems(100)\n```',
  };

  return docs[annotation] || null;
}

// Document formatting
connection.onDocumentFormatting((params): TextEdit[] => {
  const document = documents.get(params.textDocument.uri);
  if (!document) return [];

  const text = document.getText();

  try {
    const formatted = formatDocument(text, { indent: params.options.tabSize || 2 });

    // If no changes, return empty
    if (formatted === text) return [];

    // Return single edit that replaces entire document
    return [
      TextEdit.replace(
        {
          start: { line: 0, character: 0 },
          end: document.positionAt(text.length),
        },
        formatted
      ),
    ];
  } catch (error) {
    connection.console.error(`Format error: ${error}`);
    return [];
  }
});

// Document symbols (outline)
connection.onDocumentSymbol((params): DocumentSymbol[] => {
  const document = documents.get(params.textDocument.uri);
  if (!document) return [];

  const text = document.getText();
  const symbols: DocumentSymbol[] = [];

  try {
    const doc = parseDocument(text, document.uri);

    // Add title as the main symbol
    if (doc.title) {
      const titleLine = findTitleLine(text);
      symbols.push({
        name: doc.title,
        kind: SymbolKind.Module,
        range: {
          start: { line: titleLine, character: 0 },
          end: { line: titleLine, character: doc.title.length + 2 },
        },
        selectionRange: {
          start: { line: titleLine, character: 0 },
          end: { line: titleLine, character: doc.title.length + 2 },
        },
        children: [],
      });
    }

    // Add frontmatter info
    if (doc.frontMatter && 'method' in doc.frontMatter) {
      const fm = doc.frontMatter;
      symbols.push({
        name: `${fm.method} ${fm.path}`,
        detail: fm.operationId,
        kind: SymbolKind.Method,
        range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
        selectionRange: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
      });
    }

    // Add blocks as symbols
    for (const block of doc.blocks) {
      const symbol = blockToSymbol(block, text);
      if (symbol) {
        symbols.push(symbol);
      }
    }

    // Add type definitions
    for (const block of doc.blocks) {
      if (block.type === 'omg.type' && block.parsed) {
        const typeName = extractTypeName(block.content);
        if (typeName) {
          symbols.push({
            name: typeName,
            kind: SymbolKind.Class,
            detail: 'Type definition',
            range: {
              start: { line: block.line - 1, character: 0 },
              end: { line: block.line - 1, character: 0 },
            },
            selectionRange: {
              start: { line: block.line - 1, character: 0 },
              end: { line: block.line - 1, character: 0 },
            },
          });
        }
      }
    }
  } catch (error) {
    connection.console.error(`Symbol error: ${error}`);
  }

  return symbols;
});

function findTitleLine(text: string): number {
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('# ')) {
      return i;
    }
  }
  return 0;
}

function blockToSymbol(block: OmgBlock, text: string): DocumentSymbol | null {
  const blockTypeLabels: Record<string, { name: string; kind: SymbolKind }> = {
    'omg.path': { name: 'Path Parameters', kind: SymbolKind.Variable },
    'omg.query': { name: 'Query Parameters', kind: SymbolKind.Variable },
    'omg.headers': { name: 'Headers', kind: SymbolKind.Variable },
    'omg.body': { name: 'Request Body', kind: SymbolKind.Struct },
    'omg.response': { name: 'Response', kind: SymbolKind.Struct },
    'omg.returns': { name: 'Returns', kind: SymbolKind.Struct },
    'omg.example': { name: 'Example', kind: SymbolKind.Constant },
    'omg.errors': { name: 'Errors', kind: SymbolKind.Enum },
    'omg.config': { name: 'Config', kind: SymbolKind.Property },
    http: { name: 'HTTP', kind: SymbolKind.Method },
  };

  let name: string;
  let kind: SymbolKind;

  if (block.type === 'omg.response' && block.statusCode) {
    name = `Response ${block.statusCode}`;
    kind = SymbolKind.Struct;
  } else if (block.type in blockTypeLabels) {
    name = blockTypeLabels[block.type].name;
    kind = blockTypeLabels[block.type].kind;
  } else {
    name = block.type;
    kind = SymbolKind.Object;
  }

  return {
    name,
    kind,
    range: {
      start: { line: block.line - 1, character: 0 },
      end: { line: block.line - 1, character: 0 },
    },
    selectionRange: {
      start: { line: block.line - 1, character: 0 },
      end: { line: block.line - 1, character: 0 },
    },
  };
}

function extractTypeName(content: string): string | null {
  // Look for "TypeName = {" pattern or just first PascalCase word
  const match = content.match(/^\s*([A-Z][a-zA-Z0-9]*)\s*=/);
  if (match) return match[1];

  // Try to extract from object with PascalCase key at start
  const pascalMatch = content.match(/^[A-Z][a-zA-Z0-9]*/);
  return pascalMatch ? pascalMatch[0] : null;
}

// Code actions (quick fixes)
connection.onCodeAction((params): CodeAction[] => {
  const document = documents.get(params.textDocument.uri);
  if (!document) return [];

  const actions: CodeAction[] = [];
  const diagnostics = params.context.diagnostics;

  for (const diagnostic of diagnostics) {
    // Offer fixes based on diagnostic codes/messages
    if (diagnostic.message.includes('optional')) {
      // Suggest adding ? for optional field
      actions.push({
        title: 'Make field optional with ?',
        kind: CodeActionKind.QuickFix,
        diagnostics: [diagnostic],
        edit: {
          changes: {
            [params.textDocument.uri]: [
              TextEdit.insert(
                { line: diagnostic.range.end.line, character: diagnostic.range.end.character },
                '?'
              ),
            ],
          },
        },
      });
    }

    if (diagnostic.message.includes('missing operationId')) {
      // Suggest adding operationId
      const text = document.getText();
      const lines = text.split('\n');

      // Find end of frontmatter
      let insertLine = 1;
      for (let i = 1; i < lines.length; i++) {
        if (lines[i] === '---') {
          insertLine = i;
          break;
        }
      }

      // Generate operationId from method/path
      let suggestedId = 'my-operation';
      try {
        const doc = parseDocument(text, document.uri);
        if (doc.frontMatter && 'method' in doc.frontMatter) {
          const method = doc.frontMatter.method.toLowerCase();
          const pathParts = doc.frontMatter.path
            .split('/')
            .filter((p: string) => p && !p.startsWith('{'));
          suggestedId = `${method}-${pathParts.join('-') || 'resource'}`;
        }
      } catch {
        // Use default
      }

      actions.push({
        title: `Add operationId: ${suggestedId}`,
        kind: CodeActionKind.QuickFix,
        diagnostics: [diagnostic],
        edit: {
          changes: {
            [params.textDocument.uri]: [
              TextEdit.insert({ line: insertLine, character: 0 }, `operationId: ${suggestedId}\n`),
            ],
          },
        },
      });
    }

    if (diagnostic.message.includes('missing tags')) {
      // Suggest adding tags
      const text = document.getText();
      const lines = text.split('\n');

      let insertLine = 1;
      for (let i = 1; i < lines.length; i++) {
        if (lines[i] === '---') {
          insertLine = i;
          break;
        }
      }

      // Generate tag from path
      let suggestedTag = 'General';
      try {
        const doc = parseDocument(text, document.uri);
        if (doc.frontMatter && 'path' in doc.frontMatter) {
          const pathParts = doc.frontMatter.path
            .split('/')
            .filter((p: string) => p && !p.startsWith('{'));
          if (pathParts.length > 0) {
            // Capitalize first path segment
            suggestedTag = pathParts[0].charAt(0).toUpperCase() + pathParts[0].slice(1);
          }
        }
      } catch {
        // Use default
      }

      actions.push({
        title: `Add tags: [${suggestedTag}]`,
        kind: CodeActionKind.QuickFix,
        diagnostics: [diagnostic],
        edit: {
          changes: {
            [params.textDocument.uri]: [
              TextEdit.insert({ line: insertLine, character: 0 }, `tags: [${suggestedTag}]\n`),
            ],
          },
        },
      });
    }
  }

  return actions;
});

// Start listening
documents.listen(connection);
connection.listen();
