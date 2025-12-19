---
sidebar_position: 1
slug: /
---

# Introduction

**OMG (OpenAPI Markdown Grammar)** is a human-first domain-specific language for API specification. It compiles Markdown-based API definitions to OpenAPI 3.1, making API documentation accessible to technical writers while remaining useful for developers.

## Why OMG?

- **~6x reduction in lines** — A typical 30,000 line OpenAPI spec becomes ~5,000 lines in OMG
- **Single source of truth** — One endpoint per file, not scattered across 5-8 YAML files
- **DRY by design** — Define errors, pagination, and auth once, reuse everywhere
- **Writer-friendly** — Technical writers can understand and edit specs
- **Full OpenAPI compatibility** — Compiles to standard OpenAPI 3.1

## Quick example

Create a file `get-invoices.omg.md`:

````markdown
---
method: GET
path: /companies/{companyId}/data/invoices
operationId: list-invoices
tags: [Invoices]
---

# List Invoices

Returns a paginated list of invoices for a company.

```omg.path
{
  companyId: uuid
}
```

```omg.query
{
  page: integer? @min(1),
  pageSize: integer? @min(1) @max(100)
}
```

```omg.response
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
```
```

This compiles to a complete OpenAPI 3.1 specification with proper schemas, error responses, and all the boilerplate handled automatically.

## Project status

OMG is in the **MVP Implementation** phase. The core toolchain (parser, compiler, CLI) is functional.

## Next steps

- [Getting started](/docs/getting-started) — Install and run your first build
- [Syntax reference](/docs/syntax) — Full syntax documentation
- [Examples](/docs/examples) — Real-world API examples
