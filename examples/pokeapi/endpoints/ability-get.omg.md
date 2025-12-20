---
method: GET
path: /ability/{idOrName}
operationId: get-ability
tags: [Abilities]
---

# Get Ability

Returns detailed information about a specific ability, including which Pokémon can have it.

```omg.path
{
  idOrName: string  // Ability ID or lowercase hyphenated name
}
```

```omg.response
{
  id: integer,
  name: string,
  is_main_series: boolean,
  generation: {
    name: string,
    url: string
  },
  names: [{
    name: string,
    language: {
      name: string,
      url: string
    }
  }],
  effect_entries: [{
    effect: string,
    short_effect: string,
    language: {
      name: string,
      url: string
    }
  }],
  flavor_text_entries: [{
    flavor_text: string,
    language: {
      name: string,
      url: string
    },
    version_group: {
      name: string,
      url: string
    }
  }],
  pokemon: [{
    is_hidden: boolean,
    slot: integer @min(1) @max(3),
    pokemon: {
      name: string,
      url: string
    }
  }]
}
```

```omg.example
{
  "id": 9,
  "name": "static",
  "is_main_series": true,
  "generation": { "name": "generation-iii", "url": "https://pokeapi.co/api/v2/generation/3/" },
  "names": [
    { "name": "Static", "language": { "name": "en", "url": "..." } }
  ],
  "effect_entries": [
    {
      "effect": "Whenever a move makes contact with this Pokémon, the move's user has a 30% chance of being paralyzed.",
      "short_effect": "Has a 30% chance of paralyzing attacking Pokémon on contact.",
      "language": { "name": "en", "url": "..." }
    }
  ],
  "pokemon": [
    { "is_hidden": false, "slot": 1, "pokemon": { "name": "pikachu", "url": "..." } },
    { "is_hidden": false, "slot": 1, "pokemon": { "name": "electabuzz", "url": "..." } }
  ]
}
```

```omg.response.404
{
  detail: string
}
```
