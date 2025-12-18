---
sidebar_position: 5
---

# Annotations

Annotations add constraints and metadata to fields using the `@` prefix.

## Numeric Constraints

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

## String Constraints

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

## Array Constraints

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

## Default Values

Use `= value` syntax for defaults:

```
{
  page: integer? @min(1) = 1,
  pageSize: integer? @min(1) @max(100) = 20,
  status: string = "active"
}
```

## Multiple Annotations

Combine annotations on a single field:

```
{
  sku: string @minLength(3) @maxLength(20) @pattern("[A-Z0-9-]+"),
  price: decimal @min(0) @max(999999.99)
}
```

## Common Patterns

### Pagination Parameters

```omg.query
{
  page: integer? @min(1) = 1,
  pageSize: integer? @min(1) @max(100) = 20
}
```

### Email Field

```
{
  email: string @format("email") @maxLength(254)
}
```

### Money Field

```
{
  amount: decimal @min(0),
  currency: string @minLength(3) @maxLength(3)   // ISO 4217
}
```
