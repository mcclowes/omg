---
method: GET
path: /pokemon-species
operationId: list-pokemon-species
tags: [Pokemon Species]
---

# List Pokemon Species

Returns a paginated list of all Pokémon species.

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
