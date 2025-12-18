# OAL - OpenAPI Language for VS Code

Syntax highlighting for OAL (OpenAPI Language) files.

## Features

- Syntax highlighting for `.oal` files (pure OAL)
- Syntax highlighting for `.oal.md` files (OAL Markdown format)
- Highlights OAL code blocks in regular Markdown files
- YAML front matter highlighting
- HTTP method and path highlighting
- Type annotation highlighting

## Supported Code Blocks

The extension provides syntax highlighting for the following fenced code block types:

- `` ```oal `` - Generic OAL code
- `` ```oal.body `` - Request body schemas
- `` ```oal.response `` - Response schemas
- `` ```oal.response.200 ``, `` ```oal.response.201 ``, etc. - Status-specific responses
- `` ```oal.path `` - Path parameters
- `` ```oal.query `` - Query parameters
- `` ```oal.headers `` - Header parameters
- `` ```oal.example `` - JSON examples
- `` ```oal.type `` - Type definitions
- `` ```oal.errors `` - Error responses
- `` ```http `` - HTTP method and path declarations

## Installation

### From VSIX (Local Installation)

1. Package the extension:
   ```bash
   cd packages/oal-vscode
   npx vsce package
   ```

2. Install the VSIX file:
   ```bash
   code --install-extension oal-vscode-0.1.0.vsix
   ```

### Development Mode

1. Open VS Code in the extension directory
2. Press F5 to launch Extension Development Host
3. Open any `.oal.md` file to see syntax highlighting

## OAL Syntax Overview

OAL is a human-first DSL for API specification that compiles to OpenAPI 3.1.

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

`` `oal.body
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

`` `oal.response.201
{
  id: uuid,
  status: "Draft" | "Sent" | "Paid"
}
`` `
```

## License

MIT
