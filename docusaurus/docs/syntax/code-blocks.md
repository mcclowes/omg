---
sidebar_position: 3
description: Reference for OMG code block types including path, query, body, response, and type definitions.
---

# Code blocks

OMG uses fenced code blocks with special language identifiers to define API parameters and schemas.

## Parameter blocks

### omg.path

Path parameters embedded in the URL:

```omg.path
{
  companyId: uuid,     // Required UUID parameter
  accountId: string    // Required string parameter
}
```

### omg.query

Query string parameters:

```omg.query
{
  page: integer? @min(1),           // Optional with constraint
  pageSize: integer? @min(1) @max(100),
  status: "active" | "archived"?    // Optional enum
}
```

### omg.headers

Custom request headers:

```omg.headers
{
  X-Request-Id: uuid?,
  X-Idempotency-Key: string
}
```

## Request body

### omg.body

Request body schema:

```omg.body
{
  name: string @minLength(1) @maxLength(200),
  email: string,
  role: "admin" | "user" | "guest"
}
```

## Response blocks

### omg.response

Default success response (200 for GET, 201 for POST):

```omg.response
{
  id: uuid,
  name: string,
  createdAt: datetime
}
```

### omg.response.[code]

Specific status code response (replace `[code]` with status code):

```omg.response.201
{
  id: uuid,
  status: "created"
}
```

```omg.response.204
// Empty response
```

### omg.returns

Conditional responses with status codes:

```omg.returns
204: void
  when exists(invoiceId) && status in [Draft, Void]
  "Invoice successfully deleted"

404: NotFoundError
  when !exists(invoiceId)
  "Invoice not found"

409: ConflictError
  when status in [Sent, Paid]
  "Cannot delete sent or paid invoice"
```

## Type definitions

### omg.type

Define reusable types:

```omg.type
type Address {
  street: string,
  city: string,
  country: string,
  postalCode: string?
}
```

### omg.errors

Define error responses:

```omg.errors
400: {
  type: string,
  title: string,
  detail: string,
  instance: string?
}

404: NotFoundError

500: InternalError
```

## Examples

### omg.example

Provide example data:

```omg.example
{
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "Acme Corp",
  status: "active"
}
```

## Partials

Include shared content using Handlebars-style syntax:

```markdown
\{\{> partials/errors \}\}
\{\{> partials/pagination \}\}
```

## Variant conditions

### @when annotation

The `@when` annotation allows you to define variant-specific blocks that are used with the `expandVariants` frontmatter option. This enables a single OMG file to generate multiple OpenAPI operations with different schemas.

**Syntax:**

````markdown
```omg.body @when(fieldName = "value")
{
  // Schema for this variant
}
```
````

**Example:**

Define different request bodies for different pet types:

````markdown
```omg.body @when(petType = "cat")
{
  name: string,
  meowVolume: integer @min(0) @max(11)
}
```

```omg.body @when(petType = "dog")
{
  name: string,
  barkVolume: integer,
  breed: string?
}
```

```omg.response
{
  id: uuid,
  createdAt: datetime
}
```
````

When combined with `expandVariants: petType` in the frontmatter, this generates:

- `POST /pets#cat` — Uses the cat-specific body schema
- `POST /pets#dog` — Uses the dog-specific body schema

Both endpoints share the same response schema (blocks without `@when` are included in all variants).

**Supported block types:**

The `@when` annotation can be used with any code block type:

- `omg.body` — Variant-specific request bodies
- `omg.response` — Variant-specific responses
- `omg.query` — Variant-specific query parameters
- `omg.headers` — Variant-specific headers

See [Frontmatter - expandVariants](./frontmatter#expandvariants) for the full documentation.
