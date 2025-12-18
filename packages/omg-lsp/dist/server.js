#!/usr/bin/env node
/**
 * OMG Language Server
 *
 * Provides Language Server Protocol support for OMG files:
 * - Diagnostics (validation errors/warnings)
 * - Completions (type names, annotations, block types)
 * - Hover information
 */
import { createConnection, TextDocuments, ProposedFeatures, TextDocumentSyncKind, DiagnosticSeverity, CompletionItemKind, MarkupKind, } from 'vscode-languageserver/node.js';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { parseDocument, resolveDocument } from 'omg-parser';
import { lintDocument } from 'omg-linter';
// Create connection
const connection = createConnection(ProposedFeatures.all);
// Document manager
const documents = new TextDocuments(TextDocument);
// Initialization
connection.onInitialize((params) => {
    connection.console.log('OMG Language Server initializing...');
    return {
        capabilities: {
            textDocumentSync: TextDocumentSyncKind.Incremental,
            completionProvider: {
                resolveProvider: false,
                triggerCharacters: ['.', '@', '{', ':'],
            },
            hoverProvider: true,
        },
    };
});
connection.onInitialized(() => {
    connection.console.log('OMG Language Server initialized');
});
// Validate document
async function validateDocument(textDocument) {
    const text = textDocument.getText();
    const diagnostics = [];
    try {
        // Parse the document
        const doc = parseDocument(text, textDocument.uri);
        // Try to resolve (may fail for partials)
        let resolved;
        try {
            resolved = resolveDocument(doc, { basePath: '.' });
        }
        catch {
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
    }
    catch (error) {
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
function mapSeverity(severity) {
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
connection.onCompletion((params) => {
    const document = documents.get(params.textDocument.uri);
    if (!document)
        return [];
    const position = params.position;
    const text = document.getText();
    const offset = document.offsetAt(position);
    // Get current line up to cursor
    const lineStart = text.lastIndexOf('\n', offset - 1) + 1;
    const lineText = text.substring(lineStart, offset);
    const completions = [];
    // Inside code block fence - suggest block types
    if (lineText.match(/^```omg\.?$/)) {
        completions.push({ label: 'omg.path', kind: CompletionItemKind.Keyword, detail: 'Path parameters' }, { label: 'omg.query', kind: CompletionItemKind.Keyword, detail: 'Query parameters' }, { label: 'omg.headers', kind: CompletionItemKind.Keyword, detail: 'Header parameters' }, { label: 'omg.body', kind: CompletionItemKind.Keyword, detail: 'Request body schema' }, { label: 'omg.response', kind: CompletionItemKind.Keyword, detail: 'Default (200) response' }, { label: 'omg.response.201', kind: CompletionItemKind.Keyword, detail: 'Created response' }, { label: 'omg.response.400', kind: CompletionItemKind.Keyword, detail: 'Bad request response' }, { label: 'omg.response.401', kind: CompletionItemKind.Keyword, detail: 'Unauthorized response' }, { label: 'omg.response.404', kind: CompletionItemKind.Keyword, detail: 'Not found response' }, { label: 'omg.response.500', kind: CompletionItemKind.Keyword, detail: 'Server error response' }, { label: 'omg.returns', kind: CompletionItemKind.Keyword, detail: 'Conditional responses' }, { label: 'omg.type', kind: CompletionItemKind.Keyword, detail: 'Type definition' }, { label: 'omg.example', kind: CompletionItemKind.Keyword, detail: 'Example data (JSON)' }, { label: 'omg.errors', kind: CompletionItemKind.Keyword, detail: 'Error definitions' }, { label: 'omg.config', kind: CompletionItemKind.Keyword, detail: 'Configuration block' });
        return completions;
    }
    // Typing an annotation
    if (lineText.includes('@')) {
        completions.push({ label: '@min', kind: CompletionItemKind.Function, detail: 'Minimum value', insertText: '@min(${1:0})' }, { label: '@max', kind: CompletionItemKind.Function, detail: 'Maximum value', insertText: '@max(${1:100})' }, { label: '@minLength', kind: CompletionItemKind.Function, detail: 'Minimum string length', insertText: '@minLength(${1:1})' }, { label: '@maxLength', kind: CompletionItemKind.Function, detail: 'Maximum string length', insertText: '@maxLength(${1:255})' }, { label: '@pattern', kind: CompletionItemKind.Function, detail: 'Regex pattern', insertText: '@pattern("${1:.*}")' }, { label: '@format', kind: CompletionItemKind.Function, detail: 'Format hint', insertText: '@format("${1:email}")' }, { label: '@minItems', kind: CompletionItemKind.Function, detail: 'Minimum array items', insertText: '@minItems(${1:1})' }, { label: '@maxItems', kind: CompletionItemKind.Function, detail: 'Maximum array items', insertText: '@maxItems(${1:100})' });
        return completions;
    }
    // Inside a code block (after colon or at field type position)
    if (isInsideOmgBlock(text, offset)) {
        // Primitive types
        completions.push({ label: 'string', kind: CompletionItemKind.TypeParameter, detail: 'String type' }, { label: 'integer', kind: CompletionItemKind.TypeParameter, detail: 'Integer type' }, { label: 'number', kind: CompletionItemKind.TypeParameter, detail: 'Number (float) type' }, { label: 'decimal', kind: CompletionItemKind.TypeParameter, detail: 'Decimal type' }, { label: 'boolean', kind: CompletionItemKind.TypeParameter, detail: 'Boolean type' }, { label: 'date', kind: CompletionItemKind.TypeParameter, detail: 'Date type (YYYY-MM-DD)' }, { label: 'datetime', kind: CompletionItemKind.TypeParameter, detail: 'DateTime type (ISO 8601)' }, { label: 'uuid', kind: CompletionItemKind.TypeParameter, detail: 'UUID type' }, { label: 'any', kind: CompletionItemKind.TypeParameter, detail: 'Any type' });
        return completions;
    }
    // In frontmatter - suggest method
    if (lineText.match(/^method:\s*$/)) {
        completions.push({ label: 'GET', kind: CompletionItemKind.EnumMember }, { label: 'POST', kind: CompletionItemKind.EnumMember }, { label: 'PUT', kind: CompletionItemKind.EnumMember }, { label: 'PATCH', kind: CompletionItemKind.EnumMember }, { label: 'DELETE', kind: CompletionItemKind.EnumMember });
        return completions;
    }
    return completions;
});
// Check if position is inside an OMG code block
function isInsideOmgBlock(text, offset) {
    const before = text.substring(0, offset);
    const blockStart = before.lastIndexOf('```omg');
    if (blockStart === -1)
        return false;
    const blockEnd = before.indexOf('```', blockStart + 6);
    return blockEnd === -1; // If no closing ```, we're inside the block
}
// Hover
connection.onHover((params) => {
    const document = documents.get(params.textDocument.uri);
    if (!document)
        return null;
    const position = params.position;
    const text = document.getText();
    const word = getWordAtPosition(document, position);
    if (!word)
        return null;
    // Type documentation
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
    return null;
});
function getWordAtPosition(document, position) {
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
    if (start === end)
        return null;
    return text.substring(start, end);
}
function getTypeDocumentation(type) {
    const docs = {
        string: '**string**\n\nA text value.\n\n```omg\nname: string\n```',
        integer: '**integer**\n\nA whole number (no decimals).\n\n```omg\ncount: integer\n```',
        number: '**number**\n\nA floating-point number.\n\n```omg\nprice: number\n```',
        decimal: '**decimal**\n\nA precise decimal number (for currency, etc.).\n\n```omg\namount: decimal\n```',
        boolean: '**boolean**\n\nA true/false value.\n\n```omg\nisActive: boolean\n```',
        date: '**date**\n\nA date in YYYY-MM-DD format.\n\n```omg\nbirthDate: date\n```',
        datetime: '**datetime**\n\nAn ISO 8601 date-time.\n\n```omg\ncreatedAt: datetime\n```',
        uuid: '**uuid**\n\nA UUID (universally unique identifier).\n\n```omg\nid: uuid\n```',
        any: '**any**\n\nAny JSON value (use sparingly).\n\n```omg\nmetadata: any\n```',
    };
    return docs[type] || null;
}
function getAnnotationDocumentation(annotation) {
    const docs = {
        '@min': '**@min(value)**\n\nMinimum numeric value.\n\n```omg\nage: integer @min(0)\n```',
        '@max': '**@max(value)**\n\nMaximum numeric value.\n\n```omg\nage: integer @max(150)\n```',
        '@minLength': '**@minLength(value)**\n\nMinimum string length.\n\n```omg\nname: string @minLength(1)\n```',
        '@maxLength': '**@maxLength(value)**\n\nMaximum string length.\n\n```omg\nname: string @maxLength(100)\n```',
        '@pattern': '**@pattern("regex")**\n\nRegular expression pattern.\n\n```omg\nemail: string @pattern("^[^@]+@[^@]+$")\n```',
        '@format': '**@format("hint")**\n\nFormat hint (email, uri, etc.).\n\n```omg\nemail: string @format("email")\n```',
        '@minItems': '**@minItems(value)**\n\nMinimum array items.\n\n```omg\nitems: Product[] @minItems(1)\n```',
        '@maxItems': '**@maxItems(value)**\n\nMaximum array items.\n\n```omg\nitems: Product[] @maxItems(100)\n```',
    };
    return docs[annotation] || null;
}
// Start listening
documents.listen(connection);
connection.listen();
//# sourceMappingURL=server.js.map