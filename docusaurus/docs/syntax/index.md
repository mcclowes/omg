---
sidebar_position: 1
---

# Syntax Overview

OMG files (`.omg.md`) are Markdown documents with YAML frontmatter and special code blocks that define API endpoints.

## File Structure

Every OMG endpoint file has three main parts:

1. **YAML Frontmatter** — Method, path, and metadata
2. **Markdown Prose** — Human-readable descriptions
3. **Code Blocks** — Parameters and schemas

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
\```

```omg.response
{
  id: uuid,
  name: string,
  email: string
}
\```
```

## Code Block Types

| Block Type | Purpose |
|------------|---------|
| `omg.path` | Path parameters |
| `omg.query` | Query parameters |
| `omg.headers` | Header parameters |
| `omg.body` | Request body schema |
| `omg.response` | Default (200) response |
| `omg.response.[code]` | Specific status code response |
| `omg.returns` | Conditional responses |
| `omg.example` | Example data |
| `omg.type` | Reusable type definitions |
| `omg.errors` | Error response definitions |
| `omg.config` | Configuration block |

## Learn More

- [Frontmatter](/docs/syntax/frontmatter) — YAML metadata options
- [Code Blocks](/docs/syntax/code-blocks) — Block types and usage
- [Types](/docs/syntax/types) — Type system reference
- [Annotations](/docs/syntax/annotations) — Constraints and modifiers
- [Partials](/docs/syntax/partials) — Reusable content
