---
method: GET
path: /pokemon-species/{idOrName}
operationId: get-pokemon-species
tags: [Pokemon Species]
---

# Get Pokemon Species

Returns species information including evolution data, breeding info, Pokédex entries, and varieties.

```omg.path
{
  idOrName: string  // National Pokédex number or lowercase name
}
```

```omg.response
{
  id: integer,
  name: string,
  order: integer,
  gender_rate: integer @min(-1) @max(8),
  capture_rate: integer @min(0) @max(255),
  base_happiness: integer @min(0) @max(255),
  is_baby: boolean,
  is_legendary: boolean,
  is_mythical: boolean,
  hatch_counter: integer @min(0),
  has_gender_differences: boolean,
  forms_switchable: boolean,
  growth_rate: {
    name: string,
    url: string
  },
  generation: {
    name: string,
    url: string
  },
  habitat: {
    name: string,
    url: string
  }?,
  color: {
    name: string,
    url: string
  },
  shape: {
    name: string,
    url: string
  }?,
  egg_groups: [{
    name: string,
    url: string
  }],
  evolves_from_species: {
    name: string,
    url: string
  }?,
  evolution_chain: {
    url: string
  },
  names: [{
    name: string,
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
    version: {
      name: string,
      url: string
    }
  }],
  genera: [{
    genus: string,
    language: {
      name: string,
      url: string
    }
  }],
  varieties: [{
    is_default: boolean,
    pokemon: {
      name: string,
      url: string
    }
  }]
}
```

```omg.example
{
  "id": 25,
  "name": "pikachu",
  "order": 35,
  "gender_rate": 4,
  "capture_rate": 190,
  "base_happiness": 50,
  "is_baby": false,
  "is_legendary": false,
  "is_mythical": false,
  "hatch_counter": 10,
  "has_gender_differences": true,
  "forms_switchable": false,
  "growth_rate": { "name": "medium", "url": "..." },
  "generation": { "name": "generation-i", "url": "..." },
  "habitat": { "name": "forest", "url": "..." },
  "color": { "name": "yellow", "url": "..." },
  "shape": { "name": "quadruped", "url": "..." },
  "egg_groups": [
    { "name": "ground", "url": "..." },
    { "name": "fairy", "url": "..." }
  ],
  "evolves_from_species": { "name": "pichu", "url": "..." },
  "evolution_chain": { "url": "https://pokeapi.co/api/v2/evolution-chain/10/" },
  "genera": [
    { "genus": "Mouse Pokémon", "language": { "name": "en", "url": "..." } }
  ],
  "flavor_text_entries": [
    {
      "flavor_text": "When several of these POKéMON gather, their electricity could build and cause lightning storms.",
      "language": { "name": "en", "url": "..." },
      "version": { "name": "red", "url": "..." }
    }
  ],
  "varieties": [
    { "is_default": true, "pokemon": { "name": "pikachu", "url": "..." } },
    { "is_default": false, "pokemon": { "name": "pikachu-gmax", "url": "..." } }
  ]
}
```

```omg.response.404
{
  detail: string
}
```
