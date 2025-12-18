---
method: GET
path: /ability
operationId: list-abilities
tags: [Abilities]
---

# List Abilities

Returns a paginated list of all ability resources.

```omg.query
{
  limit: integer? @min(1) @max(100),
  offset: integer? @min(0)
}
```

```omg.response
{
  count: integer,
  next: string?,
  previous: string?,
  results: [{
    name: string,
    url: string
  }]
}
```
