---
method: GET
path: /type
operationId: list-types
tags: [Types]
---

# List Types

Returns a list of all elemental types.

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
  results: [
    {
      name: string,
      url: string
    }
  ]
}
```

```omg.example
{
  "count": 20,
  "next": null,
  "previous": null,
  "results": [
    {
      "name": "normal",
      "url": "https://pokeapi.co/api/v2/type/1/"
    },
    {
      "name": "fighting",
      "url": "https://pokeapi.co/api/v2/type/2/"
    },
    {
      "name": "fire",
      "url": "https://pokeapi.co/api/v2/type/10/"
    },
    {
      "name": "water",
      "url": "https://pokeapi.co/api/v2/type/11/"
    },
    {
      "name": "electric",
      "url": "https://pokeapi.co/api/v2/type/13/"
    }
  ]
}
```
