---
method: GET
path: /move
operationId: list-moves
tags: [Moves]
---

# List Moves

Returns a paginated list of all move resources.

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
