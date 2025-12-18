---
sidebar_position: 10
---

# Examples

Real-world examples of OMG API definitions.

## Complete Examples on GitHub

These fully working examples are available in our repository:

| Example | Description | Link |
|---------|-------------|------|
| **PokéAPI** | A comprehensive read-only API showing nested types, arrays, and annotations | [View on GitHub](https://github.com/mcclowes/omg/tree/main/examples/pokeapi) |
| **Payments API** | Stripe-like API demonstrating webhooks, idempotency, and async operations | [View on GitHub](https://github.com/mcclowes/omg/tree/main/examples/payments-api) |
| **Todo API** | Simple CRUD API with partials for error responses | [View on GitHub](https://github.com/mcclowes/omg/tree/main/examples/todo-api) |

---

## Basic CRUD API

### List Resources

```markdown
---
method: GET
path: /users
operationId: list-users
tags: [Users]
---

# List Users

Returns a paginated list of users.

\`\`\`omg.query
{
  page: integer? @min(1) = 1,
  pageSize: integer? @min(1) @max(100) = 20,
  status: "active" | "inactive"?
}
\`\`\`

\`\`\`omg.response
{
  results: [{
    id: uuid,
    name: string,
    email: string,
    status: "active" | "inactive",
    createdAt: datetime
  }],
  pageNumber: integer,
  pageSize: integer,
  totalResults: integer
}
\`\`\`
```

### Get Resource

```markdown
---
method: GET
path: /users/{userId}
operationId: get-user
tags: [Users]
---

# Get User

Returns a user by ID.

\`\`\`omg.path
{
  userId: uuid
}
\`\`\`

\`\`\`omg.response
{
  id: uuid,
  name: string,
  email: string,
  status: "active" | "inactive",
  createdAt: datetime,
  updatedAt: datetime
}
\`\`\`
```

### Create Resource

```markdown
---
method: POST
path: /users
operationId: create-user
tags: [Users]
---

# Create User

Creates a new user.

\`\`\`omg.body
{
  name: string @minLength(1) @maxLength(200),
  email: string @format("email"),
  role: "admin" | "user" | "guest" = "user"
}
\`\`\`

\`\`\`omg.response.201
{
  id: uuid,
  name: string,
  email: string,
  role: string,
  createdAt: datetime
}
\`\`\`
```

### Update Resource

```markdown
---
method: PUT
path: /users/{userId}
operationId: update-user
tags: [Users]
---

# Update User

Updates a user.

\`\`\`omg.path
{
  userId: uuid
}
\`\`\`

\`\`\`omg.body
{
  name: string? @maxLength(200),
  email: string? @format("email"),
  status: "active" | "inactive"?
}
\`\`\`

\`\`\`omg.response
{
  id: uuid,
  name: string,
  email: string,
  status: string,
  updatedAt: datetime
}
\`\`\`
```

### Delete Resource

```markdown
---
method: DELETE
path: /users/{userId}
operationId: delete-user
tags: [Users]
---

# Delete User

Deletes a user.

\`\`\`omg.path
{
  userId: uuid
}
\`\`\`

\`\`\`omg.response.204
// Empty response
\`\`\`
```

## Complex Types

### Nested Objects

```markdown
\`\`\`omg.response
{
  user: {
    id: uuid,
    profile: {
      name: string,
      avatar: string?,
      bio: string?
    },
    settings: {
      notifications: boolean,
      theme: "light" | "dark"
    }
  }
}
\`\`\`
```

### Arrays of Objects

```markdown
\`\`\`omg.response
{
  orders: [{
    id: uuid,
    items: [{
      productId: uuid,
      quantity: integer @min(1),
      price: decimal
    }],
    total: decimal,
    status: "pending" | "shipped" | "delivered"
  }]
}
\`\`\`
```

## Conditional Responses

```markdown
---
method: DELETE
path: /invoices/{invoiceId}
operationId: delete-invoice
tags: [Invoices]
---

# Delete Invoice

Deletes an invoice if it's in a deletable state.

\`\`\`omg.path
{
  invoiceId: uuid
}
\`\`\`

\`\`\`omg.returns
204: void
  when status in [draft, void]
  "Invoice deleted"

404: NotFoundError
  when !exists(invoiceId)
  "Invoice not found"

409: ConflictError
  when status in [sent, paid]
  "Cannot delete sent or paid invoices"
\`\`\`
```

## API Root File

```markdown
---
title: Acme API
version: 2.0.0
---

# Acme API

> Enterprise resource management API

The Acme API provides access to users, orders, and billing.

## Authentication

All endpoints require Bearer token authentication.

\{\{> endpoints/users/list-users \}\}
\{\{> endpoints/users/get-user \}\}
\{\{> endpoints/users/create-user \}\}
\{\{> endpoints/orders/list-orders \}\}
\{\{> endpoints/billing/invoices \}\}
```
