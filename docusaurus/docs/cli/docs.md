---
sidebar_position: 8
description: Render an OMG spec as a self-contained, browsable HTML documentation page.
---

# Docs

Render an OMG spec as a browsable HTML documentation page. `omg docs` compiles
your spec and produces a single, self-contained HTML file — no server, build
step, or network access needed to view it.

```bash
omg docs <input> [options]
```

## Options

| Option | Description |
| --- | --- |
| `-o, --output <file>` | Write the HTML to a file (default: stdout) |

## Example

```bash
omg docs my-api/api.omg.md -o api-docs.html
```

Then open `api-docs.html` in any browser.

## What it renders

The generated page preserves the Markdown prose from your spec alongside the
endpoint signatures:

- **Header** — API title, version, description, and servers.
- **Sidebar** — every endpoint, grouped by tag, plus the schema list.
- **Endpoints** — method, path, summary, description, path/query/header
  parameter tables, the request body schema, and every response with its
  status code and schema.
- **Schemas** — the reusable component schemas, cross-linked from the
  endpoints that reference them.

The page is fully static and self-contained: all styling is inlined and there
are no external scripts, so it can be committed to a repo, attached to a
release, or served from any static host.

## How it works

`omg docs` compiles the spec to OpenAPI 3.1 internally (the same path as
[`omg build`](./build.md)) and renders that. Anything that compiles to valid
OpenAPI will render — including resolved partials and extracted component
schemas.
