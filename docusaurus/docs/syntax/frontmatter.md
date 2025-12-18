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
