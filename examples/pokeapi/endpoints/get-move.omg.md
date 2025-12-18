---
method: GET
path: /move/{idOrName}
operationId: get-move
tags: [Moves]
---

# Get Move

Returns detailed information about a specific move, including power, accuracy, type, and which Pokémon can learn it.

```omg.path
{
  idOrName: string  // Move ID or lowercase hyphenated name
}
```

```omg.response
{
  id: integer,
  name: string,
  accuracy: integer? @min(0) @max(100),
  effect_chance: integer?,
  pp: integer @min(1),
  priority: integer @min(-7) @max(5),
  power: integer? @min(0),
  type: {
    name: string,
    url: string
  },
  damage_class: {
    name: string,
    url: string
  },
  target: {
    name: string,
    url: string
  },
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
  meta: {
    ailment: {
      name: string,
      url: string
    },
    category: {
      name: string,
      url: string
    },
    min_hits: integer?,
    max_hits: integer?,
    drain: integer,
    healing: integer,
    crit_rate: integer @min(0),
    flinch_chance: integer @min(0) @max(100),
    stat_chance: integer @min(0) @max(100)
  }?,
  learned_by_pokemon: [{
    name: string,
    url: string
  }]
}
```

```omg.example
{
  "id": 85,
  "name": "thunderbolt",
  "accuracy": 100,
  "effect_chance": 10,
  "pp": 15,
  "priority": 0,
  "power": 90,
  "type": { "name": "electric", "url": "https://pokeapi.co/api/v2/type/13/" },
  "damage_class": { "name": "special", "url": "..." },
  "target": { "name": "selected-pokemon", "url": "..." },
  "generation": { "name": "generation-i", "url": "..." },
  "effect_entries": [
    {
      "effect": "Inflicts regular damage. Has a $effect_chance% chance to paralyze the target.",
      "short_effect": "Has a $effect_chance% chance to paralyze the target.",
      "language": { "name": "en", "url": "..." }
    }
  ],
  "meta": {
    "ailment": { "name": "paralysis", "url": "..." },
    "category": { "name": "damage+ailment", "url": "..." },
    "min_hits": null,
    "max_hits": null,
    "drain": 0,
    "healing": 0,
    "crit_rate": 0,
    "flinch_chance": 0,
    "stat_chance": 0
  },
  "learned_by_pokemon": [
    { "name": "pikachu", "url": "..." },
    { "name": "raichu", "url": "..." }
  ]
}
```

```omg.response.404
{
  detail: string
}
```
