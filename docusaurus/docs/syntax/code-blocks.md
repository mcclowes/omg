---
sidebar_position: 3
---

# Code Blocks

OMG uses fenced code blocks with special language identifiers to define API parameters and schemas.

## Parameter Blocks

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

## Request Body

### omg.body

Request body schema:

```omg.body
{
  name: string @minLength(1) @maxLength(200),
  email: string,
  role: "admin" | "user" | "guest"
}
```

## Response Blocks

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

## Type Definitions

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
