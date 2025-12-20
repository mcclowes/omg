# omg-lsp

Language Server Protocol (LSP) server for OMG (OpenAPI Markdown Grammar) files.

## Installation

```bash
npm install omg-lsp
```

## Features

- **Diagnostics** - Real-time validation and linting
- **Completions** - Autocomplete for types, annotations, block types
- **Hover** - Documentation on hover for types and annotations
- **Go to Definition** - Navigate to type definitions
- **Document Formatting** - Format OMG files
- **Document Symbols** - Outline view of document structure
- **Code Actions** - Quick fixes for common issues

## Usage with VS Code

The LSP server is used by the [OMG VS Code extension](../omg-vscode/README.md).

## Running Standalone

```bash
npx omg-lsp --stdio
```

Or programmatically:

```typescript
import { createConnection, ProposedFeatures } from 'vscode-languageserver/node.js';

// The server is started via the bin entry point
// See packages/omg-lsp/src/server.ts for implementation
```

## Capabilities

### Completions

Triggered on: `.` `@` `{` `:`

**Block types:**
```
```omg.|
  í omg.path, omg.query, omg.body, omg.response, etc.
```

**Annotations:**
```
age: integer @|
  í @min, @max, @minLength, @maxLength, @pattern, @format
```

**Types:**
```
name: |
  í string, integer, number, boolean, date, datetime, uuid
  í User, Product (workspace types)
```

**Frontmatter:**
```
method: |
  í GET, POST, PUT, PATCH, DELETE
```

### Hover

Provides documentation for:
- Primitive types (`string`, `integer`, etc.)
- Annotations (`@min`, `@format`, etc.)
- User-defined types (shows schema structure)

### Go to Definition

Jump to type definition for PascalCase references:
```
response: User  ê Ctrl+Click to jump to User definition
```

### Code Actions

Quick fixes for common issues:
- Add missing `operationId`
- Add missing `tags`
- Make field optional with `?`

## Configuration

The server respects workspace settings and `.spectral-omg.yaml` for linting configuration.

## License

MIT
