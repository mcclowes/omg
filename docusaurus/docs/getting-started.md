---
sidebar_position: 2
description: Install OMG and compile your first API specification to OpenAPI 3.1 in under 5 minutes.
---

# Getting started

Get up and running with OMG in under 5 minutes.

## Installation

```bash
npm install -g omg-md-cli
```

Or use directly with npx (no installation required):

```bash
npx omg-md-cli <command>
```

### From source

For development or contributing:

```bash
git clone https://github.com/mcclowes/omg.git
cd omg
npm install
npm run build
```

## Initialize a project

Create a new OMG API project:

```bash
omg init my-api
```

This creates a directory structure:

```
my-api/
├── api.omg.md           # Root API definition
├── endpoints/
│   └── health.omg.md    # Example endpoint
└── partials/
    └── errors.omg.md    # Shared error definitions
```

## Build to OpenAPI

Compile your OMG files to OpenAPI 3.1:

```bash
omg build my-api/api.omg.md -o openapi.yaml
```

## File structure

OMG files use the `.omg.md` extension and are standard Markdown with:

1. **YAML frontmatter** — Defines method, path, and metadata
2. **Markdown prose** — Becomes the operation description
3. **Code blocks** — Define parameters, request/response schemas

```markdown
---
method: GET
path: /users/{userId}
operationId: get-user
tags: [Users]
---

# Get User

Returns a user by ID.

```omg.path
{
  userId: uuid
}
```

```omg.response
{
  id: uuid,
  name: string,
  email: string
}
```
```

## Next steps

- Read the [Syntax Reference](/docs/syntax) for full documentation
- Explore the [CLI Commands](/docs/cli) for all available operations
- Check out [Examples](/docs/examples) for real-world usage patterns
