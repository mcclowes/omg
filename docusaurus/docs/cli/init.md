---
sidebar_position: 5
---

# init

Initialize a new OMG project with example files.

## Usage

```bash
omg init <directory>
```

## Arguments

| Argument | Description |
|----------|-------------|
| `directory` | Directory name for the new project |

## Examples

### Create a new project

```bash
omg init my-api
```

### Initialize in current directory

```bash
omg init .
```

## Generated Structure

```
my-api/
├── api.omg.md           # Root API definition
├── endpoints/
│   └── health.omg.md    # Example health endpoint
└── partials/
    └── errors.omg.md    # Shared error definitions
```

### api.omg.md

```markdown
---
title: My API
version: 1.0.0
---

# My API

API description.

\{\{> endpoints/health \}\}
```

### endpoints/health.omg.md

```markdown
---
method: GET
path: /health
operationId: health-check
tags: [System]
---

# Health Check

Returns the health status of the API.

```omg.response
{
  status: "healthy" | "degraded" | "unhealthy",
  timestamp: datetime
}
```

\{\{> partials/errors \}\}
```

## Next Steps

After initializing:

```bash
cd my-api
omg build api.omg.md -o openapi.yaml
```
