---
sidebar_position: 6
description: Reuse content across OMG files using partials for errors, pagination, and shared schemas.
---

# Partials

Partials allow you to reuse content across multiple OMG files. OMG supports two syntaxes for including partials.

## Syntax options

### OMG-style (recommended)

The `@path` syntax is cleaner and more idiomatic for OMG files:

```markdown
@params/company
@responses/errors
```

### Handlebars-style

The `\{\{> path \}\}` syntax is also supported:

```markdown
\{\{> params/company \}\}
\{\{> responses/errors \}\}
```

Both syntaxes are equivalent and can be mixed in the same document.

## Basic usage

Include a partial at the end of your endpoint definition:

```markdown
# Get User

Returns a user by ID.

```omg.response
{
  id: uuid,
  name: string
}
```

@partials/errors
```

## Partial files

Partials are OMG files stored in a `partials/` directory:

```
my-api/
├── api.omg.md
├── endpoints/
│   ├── get-user.omg.md
│   └── list-users.omg.md
└── partials/
    ├── errors.omg.md
    └── pagination.omg.md
```

### partials/errors.omg.md

```markdown
```omg.errors
400: {
  type: string,
  title: string,
  detail: string
}

401: {
  message: string
}

404: {
  message: string,
  resourceType: string
}

500: {
  message: string,
  requestId: string
}
```
```

### partials/pagination.omg.md

```markdown
```omg.query
{
  page: integer? @min(1) = 1,
  pageSize: integer? @min(1) @max(100) = 20
}
```
```

## Nested partials

Partials can include other partials:

```markdown
@partials/common-errors
@partials/rate-limit-errors
```

## Path resolution

Partial paths are resolved relative to the including document:

- `@errors` — Same directory
- `@partials/errors` — `partials/` subdirectory
- `@../shared/errors` — Parent directory

## Common patterns

### Shared error responses

Define standard error schemas once, include everywhere:

```markdown
@responses/errors
```

### Pagination

Include pagination query parameters:

```markdown
@params/pagination
```

### Authentication headers

Include auth headers:

```markdown
@headers/auth
```
