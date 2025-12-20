---
sidebar_position: 5
description: Annotation reference for adding constraints like @min, @max, @minLength, @pattern, and default values.
---

# Annotations

Annotations add constraints and metadata to fields using the `@` prefix.

## Numeric constraints

```
{
  age: integer @min(0) @max(150),
  price: decimal @min(0),
  quantity: integer @min(1) @max(1000)
}
```

| Annotation | Description |
|------------|-------------|
| `@min(n)` | Minimum value (inclusive) |
| `@max(n)` | Maximum value (inclusive) |

## String constraints

```
{
  name: string @minLength(1) @maxLength(200),
  code: string @pattern("[A-Z]{3}-[0-9]{4}"),
  email: string @format("email")
}
```

| Annotation | Description |
|------------|-------------|
| `@minLength(n)` | Minimum string length |
| `@maxLength(n)` | Maximum string length |
| `@pattern("regex")` | Regex pattern |
| `@format("fmt")` | Format hint (email, uri, etc.) |

## Array constraints

```
{
  tags: string[] @minItems(1) @maxItems(10),
  items: Item[] @minItems(1)
}
```

| Annotation | Description |
|------------|-------------|
| `@minItems(n)` | Minimum array length |
| `@maxItems(n)` | Maximum array length |

## Default values

Use `= value` syntax for defaults:

```
{
  page: integer? @min(1) = 1,
  pageSize: integer? @min(1) @max(100) = 20,
  status: string = "active"
}
```

## Multiple annotations

Combine annotations on a single field:

```
{
  sku: string @minLength(3) @maxLength(20) @pattern("[A-Z0-9-]+"),
  price: decimal @min(0) @max(999999.99)
}
```

## Common patterns

### Pagination parameters

```omg.query
{
  page: integer? @min(1) = 1,
  pageSize: integer? @min(1) @max(100) = 20
}
```

### Email field

```
{
  email: string @format("email") @maxLength(254)
}
```

### Money field

```
{
  amount: decimal @min(0),
  currency: string @minLength(3) @maxLength(3)   // ISO 4217
}
```
