---
method: GET
path: /type/{idOrName}
operationId: get-type
tags: [Types]
---

# Get Type

Returns detailed information about a specific type, including damage relations to other types.

```omg.path
{
  idOrName: string  // Type ID (1-18) or lowercase name
}
```

```omg.response
{
  id: integer,
  name: string,
  generation: {
    name: string,
    url: string
  },
  damage_relations: {
    no_damage_to: [{
      name: string,
      url: string
    }],
    half_damage_to: [{
      name: string,
      url: string
    }],
    double_damage_to: [{
      name: string,
      url: string
    }],
    no_damage_from: [{
      name: string,
      url: string
    }],
    half_damage_from: [{
      name: string,
      url: string
    }],
    double_damage_from: [{
      name: string,
      url: string
    }]
  },
  names: [{
    name: string,
    language: {
      name: string,
      url: string
    }
  }],
  pokemon: [{
    slot: integer @min(1) @max(2),
    pokemon: {
      name: string,
      url: string
    }
  }],
  moves: [{
    name: string,
    url: string
  }]
}
```

```omg.example
{
  "id": 10,
  "name": "fire",
  "generation": { "name": "generation-i", "url": "..." },
  "damage_relations": {
    "no_damage_to": [],
    "half_damage_to": [
      { "name": "fire", "url": "..." },
      { "name": "water", "url": "..." },
      { "name": "rock", "url": "..." },
      { "name": "dragon", "url": "..." }
    ],
    "double_damage_to": [
      { "name": "grass", "url": "..." },
      { "name": "ice", "url": "..." },
      { "name": "bug", "url": "..." },
      { "name": "steel", "url": "..." }
    ],
    "no_damage_from": [],
    "half_damage_from": [
      { "name": "fire", "url": "..." },
      { "name": "grass", "url": "..." },
      { "name": "ice", "url": "..." },
      { "name": "bug", "url": "..." },
      { "name": "steel", "url": "..." },
      { "name": "fairy", "url": "..." }
    ],
    "double_damage_from": [
      { "name": "water", "url": "..." },
      { "name": "ground", "url": "..." },
      { "name": "rock", "url": "..." }
    ]
  },
  "pokemon": [
    { "slot": 1, "pokemon": { "name": "charmander", "url": "..." } },
    { "slot": 1, "pokemon": { "name": "charizard", "url": "..." } }
  ],
  "moves": [
    { "name": "fire-punch", "url": "..." },
    { "name": "ember", "url": "..." },
    { "name": "flamethrower", "url": "..." }
  ]
}
```

```omg.response.404
{
  detail: string
}
```
