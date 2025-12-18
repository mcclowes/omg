![OMG Logo](./omg.png)

<br/>

# OpenAPI Markdown Grammar (OMG)

> A human-first domain-specific language for API specification

OMG is a Markdown-native language for describing APIs that compiles to standard OpenAPI 3.1 specifications. It's designed to be written by technical product managers and technical writers, understood by developers at a glance, and used as both documentation and a contract testing tool.

**Files use the `.omg.md` extension** - because who doesn't love that reaction when reviewing API specs?

## Project Status

This project is in the **MVP Implementation** phase. The core toolchain (parser, compiler, CLI) is functional.

## Documentation

- [DESIGN.md](DESIGN.md) - Vision, problem statement, and design principles
- [SYNTAX.md](SYNTAX.md) - Complete syntax reference
- [COMPARISON.md](COMPARISON.md) - OMG vs OpenAPI comparison
- [BEHAVIORS.md](BEHAVIORS.md) - Behavioral conventions and defaults
- [TOOLCHAIN.md](TOOLCHAIN.md) - Compiler and tooling architecture
- [LEGIBILITY.md](LEGIBILITY.md) - Legibility analysis
- [TODO.md](TODO.md) - Project roadmap

## Repository Structure

```
├── packages/
│   ├── omg-parser/     # OMG markdown parser
│   ├── omg-compiler/   # OMG to OpenAPI compiler
│   ├── omg-cli/        # Command-line interface
│   └── omg-vscode/     # VS Code extension
└── *.md                # Design documentation
```

## Getting Started

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm test

# Initialize a new OMG project
npx omg init my-api

# Compile OMG to OpenAPI
npx omg build api.omg.md -o openapi.yaml
```

## Example

Create a file `get-invoices.omg.md`:

```markdown
---
method: GET
path: /companies/{companyId}/data/invoices
operationId: list-invoices
tags: [Invoices]
---

# List Invoices

Returns a paginated list of invoices for a company.

\`\`\`omg.path
{
  companyId: uuid
}
\`\`\`

\`\`\`omg.query
{
  page: integer? @min(1),
  pageSize: integer? @min(1) @max(100)
}
\`\`\`

\`\`\`omg.response
{
  results: [{
    id: uuid,
    customerName: string,
    totalAmount: decimal,
    status: "draft" | "sent" | "paid"
  }],
  pageNumber: integer,
  totalResults: integer
}
\`\`\`
```

This compiles to a complete OpenAPI 3.1 specification with proper schemas, error responses, and all the boilerplate handled automatically.

## Why OMG?

- **~6x reduction in lines** - A typical 30,000 line OpenAPI spec becomes ~5,000 lines in OMG
- **Single source of truth** - One endpoint per file, not scattered across 5-8 YAML files
- **DRY by design** - Define errors, pagination, and auth once, reuse everywhere
- **Writer-friendly** - Technical writers can understand and edit specs
- **Full OpenAPI compatibility** - Compiles to standard OpenAPI 3.1

## License

MIT
