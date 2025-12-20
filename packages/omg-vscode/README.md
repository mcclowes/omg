# OMG - OpenAPI Markdown Grammar for VS Code

Language support for OMG (OpenAPI Markdown Grammar) files with syntax highlighting, validation, completions, and more.

## Features

- **Syntax highlighting** for `.omg` files (pure OMG) and `.omg.md` files (OMG Markdown format)
- **Real-time validation** with error diagnostics
- **Intelligent completions** for types, annotations, and code blocks
- **Hover documentation** for types and annotations
- **Go to Definition** for custom type references
- **Document outline** showing API structure
- **Code snippets** for common patterns
- Highlights OMG code blocks in regular Markdown files
- YAML frontmatter highlighting
- HTTP method and path highlighting

## Supported Code Blocks

The extension provides syntax highlighting for the following fenced code block types:

- `` ```omg `` - Generic OMG code
- `` ```omg.body `` - Request body schemas
- `` ```omg.response `` - Response schemas
- `` ```omg.response.200 ``, `` ```omg.response.201 ``, etc. - Status-specific responses
- `` ```omg.path `` - Path parameters
- `` ```omg.query `` - Query parameters
- `` ```omg.headers `` - Header parameters
- `` ```omg.returns `` - Conditional responses with status codes
- `` ```omg.example `` - JSON examples
- `` ```omg.type `` - Type definitions
- `` ```omg.errors `` - Error responses
- `` ```omg.config `` - Configuration blocks
- `` ```http `` - HTTP method and path declarations

## Installation

### From VS Code Marketplace

Search for "OMG - OpenAPI Markdown Grammar" in the VS Code Extensions view.

### From VSIX (Local Installation)

1. Package the extension:
   ```bash
   cd packages/omg-vscode
   npm run vscode:prepublish
   npx vsce package
   ```

2. Install the VSIX file:
   ```bash
   code --install-extension omg-vscode-0.1.1.vsix
   ```

### Development Mode

1. Open VS Code in the extension directory
2. Press F5 to launch Extension Development Host
3. Open any `.omg.md` file to see syntax highlighting and language features

## OMG Syntax Overview

OMG is a human-first DSL for API specification that compiles to OpenAPI 3.1.

### Example

```markdown
---
method: POST
path: /invoices
operationId: create-invoice
tags: [Invoices]
---

# Create Invoice

Creates a new invoice.

`` `omg.body
{
  customerId: uuid,
  lineItems: [{
    description: string,
    quantity: integer @min(1),
    unitPrice: decimal @min(0)
  }] @minItems(1),
  dueDate: date?
}
`` `

`` `omg.response.201
{
  id: uuid,
  status: "Draft" | "Sent" | "Paid"
}
`` `
```

## Snippets

The extension includes snippets for common patterns:

| Prefix | Description |
|--------|-------------|
| `omg-endpoint` | Complete endpoint template |
| `omg-body` | Request body block |
| `omg-response` | Response block |
| `omg-type` | Type definition block |
| `omg-returns` | Conditional returns block |
| `omg-object` | Object type definition |
| `omg-array` | Array type definition |

## Commands

- **OMG: Format Document** - Format the current OMG file

## Requirements

- VS Code 1.80.0 or higher

## Related

- [OMG Documentation](https://github.com/mcclowes/omg)
- [OMG CLI](https://www.npmjs.com/package/omg-md-cli)

## License

MIT
