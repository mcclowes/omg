---
sidebar_position: 4
description: Type system reference including primitives, objects, arrays, enums, unions, and nullable fields.
---

# Types

OMG has a rich type system that compiles to OpenAPI 3.1 schemas.

## Primitive types

| Type | Description | OpenAPI Mapping |
|------|-------------|-----------------|
| `string` | Text | `type: string` |
| `integer` | Whole number | `type: integer` |
| `number` | Float/double | `type: number` |
| `decimal` | Precise decimal | `type: number, format: decimal` |
| `boolean` | True/false | `type: boolean` |
| `date` | Date only | `type: string, format: date` |
| `datetime` | Date and time | `type: string, format: date-time` |
| `uuid` | UUID string | `type: string, format: uuid` |
| `any` | Any type | `{}` |

## Objects

Define object schemas with typed fields:

```
{
  id: uuid,
  name: string,
  email: string,
  age: integer?    // Optional field
}
```

### Nested objects

```
{
  user: {
    id: uuid,
    profile: {
      name: string,
      bio: string?
    }
  }
}
```

## Arrays

Use `[]` suffix for arrays:

```
{
  tags: string[],           // Array of strings
  items: {                  // Array of objects
    id: uuid,
    name: string
  }[]
}
```

## Enums

Define fixed value sets using union syntax:

```
{
  status: "draft" | "sent" | "paid",
  priority: "low" | "medium" | "high"
}
```

## Union types

Combine types with `|`:

```
{
  value: string | integer,
  result: Success | Error
}
```

## Optional fields

Mark fields as optional with `?`:

```
{
  name: string,       // Required
  nickname: string?,  // Optional
  bio: string?        // Optional
}
```

## Nullable fields

Allow null values with `| null`:

```
{
  deletedAt: datetime | null    // Required, can be null
}
```

## Type references

Reference other defined types:

```omg.type
type Address {
  street: string,
  city: string,
  country: string
}
```

```omg.response
{
  id: uuid,
  name: string,
  address: Address    // Reference to Address type
}
```

## Comments

Add descriptions with `//` comments:

```
{
  id: uuid,              // Unique identifier
  status: string,        // Current status
  amount: decimal        // Total amount in cents
}
```
