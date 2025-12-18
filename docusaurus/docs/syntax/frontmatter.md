---
sidebar_position: 2
---

# Frontmatter

The YAML frontmatter at the top of each OMG file defines the endpoint's HTTP method, path, and metadata.

## Required Fields

```yaml
---
method: GET
path: /users/{userId}
operationId: get-user
---
```

| Field | Description |
|-------|-------------|
| `method` | HTTP method: `GET`, `POST`, `PUT`, `PATCH`, `DELETE` |
| `path` | URL path with parameter placeholders |
| `operationId` | Unique identifier for this operation |

## Optional Fields

```yaml
---
method: POST
path: /invoices
operationId: create-invoice
tags: [Invoices, Billing]
deprecated: true
summary: Create a new invoice
security:
  - bearerAuth: []
---
```

| Field | Description |
|-------|-------------|
| `tags` | Array of tags for grouping |
| `deprecated` | Mark endpoint as deprecated |
| `summary` | Short summary (alternative to H1) |
| `security` | Security requirements |

## Workflow Metadata

OMG supports additional metadata for documenting API workflows:

### follows

Specifies which endpoints should be called before this one:

```yaml
---
method: POST
path: /companies/{companyId}/sync/expenses
operationId: sync-expenses
follows:
  - create-company
  - create-data-connection
---
```

### webhooks

Documents webhook relationships:

```yaml
---
method: POST
path: /companies/{companyId}/sync
operationId: start-sync
webhooks:
  resulting:
    - SyncCompleted
    - SyncFailed
  listen:
    - SyncProgress
---
```

- `webhooks.resulting` — Webhooks triggered by this endpoint
- `webhooks.listen` — Webhooks to subscribe to for updates

## Variant Expansion

### expandVariants

Expands a single endpoint definition into multiple operations based on `@when` conditions. This is useful for polymorphic endpoints where different request bodies are needed for different types.

```yaml
---
method: POST
path: /pets
operationId: create-pet
expandVariants: petType
tags: [Pets]
---
```

When `expandVariants` is set, the compiler looks for `@when` annotations on code blocks and generates separate endpoints for each variant:

````markdown
```omg.body @when(petType = "cat")
{
  name: string,
  meowVolume: integer
}
```

```omg.body @when(petType = "dog")
{
  name: string,
  barkVolume: integer
}
```
````

This compiles to two separate OpenAPI operations:

- `POST /pets#cat` with operationId `create-pet-cat`
- `POST /pets#dog` with operationId `create-pet-dog`

Each endpoint gets only its variant-specific schema, eliminating the need for complex discriminator-based polymorphism. Blocks without `@when` conditions (like shared responses) are included in all variants.

See [Code Blocks - Variant Conditions](./code-blocks#variant-conditions) for more details on the `@when` annotation.
