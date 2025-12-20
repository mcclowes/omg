---
method: GET
path: /pokemon/{idOrName}
operationId: get-pokemon
tags: [Pokemon]
---

# Get Pokemon

Returns detailed information about a specific Pokémon including its abilities, types, stats, sprites, moves, and more.

```omg.path
{
  idOrName: string  // Pokémon ID (1-1302) or lowercase name
}
```

```omg.response
{
  id: integer,
  name: string,
  base_experience: integer?,
  height: integer,
  weight: integer,
  is_default: boolean,
  order: integer,
  abilities: [{
    is_hidden: boolean,
    slot: integer @min(1) @max(3),
    ability: {
      name: string,
      url: string
    }
  }],
  types: [{
    slot: integer @min(1) @max(2),
    type: {
      name: string,
      url: string
    }
  }],
  stats: [{
    base_stat: integer @min(1),
    effort: integer @min(0) @max(3),
    stat: {
      name: string,
      url: string
    }
  }],
  sprites: {
    front_default: string?,
    front_shiny: string?,
    front_female: string?,
    back_default: string?,
    back_shiny: string?,
    back_female: string?
  },
  species: {
    name: string,
    url: string
  },
  moves: [{
    move: {
      name: string,
      url: string
    },
    version_group_details: [{
      level_learned_at: integer @min(0),
      move_learn_method: {
        name: string,
        url: string
      },
      version_group: {
        name: string,
        url: string
      }
    }]
  }],
  held_items: [{
    item: {
      name: string,
      url: string
    },
    version_details: [{
      rarity: integer @min(1) @max(100),
      version: {
        name: string,
        url: string
      }
    }]
  }],
  forms: [{
    name: string,
    url: string
  }],
  game_indices: [{
    game_index: integer,
    version: {
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
  "base_experience": 112,
  "height": 4,
  "weight": 60,
  "is_default": true,
  "order": 35,
  "abilities": [
    {
      "is_hidden": false,
      "slot": 1,
      "ability": { "name": "static", "url": "https://pokeapi.co/api/v2/ability/9/" }
    },
    {
      "is_hidden": true,
      "slot": 3,
      "ability": { "name": "lightning-rod", "url": "https://pokeapi.co/api/v2/ability/31/" }
    }
  ],
  "types": [
    {
      "slot": 1,
      "type": { "name": "electric", "url": "https://pokeapi.co/api/v2/type/13/" }
    }
  ],
  "stats": [
    { "base_stat": 35, "effort": 0, "stat": { "name": "hp", "url": "..." } },
    { "base_stat": 55, "effort": 0, "stat": { "name": "attack", "url": "..." } },
    { "base_stat": 40, "effort": 0, "stat": { "name": "defense", "url": "..." } },
    { "base_stat": 50, "effort": 0, "stat": { "name": "special-attack", "url": "..." } },
    { "base_stat": 50, "effort": 0, "stat": { "name": "special-defense", "url": "..." } },
    { "base_stat": 90, "effort": 2, "stat": { "name": "speed", "url": "..." } }
  ],
  "sprites": {
    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png"
  },
  "species": { "name": "pikachu", "url": "https://pokeapi.co/api/v2/pokemon-species/25/" }
}
```

```omg.response.404
{
  detail: string
}
```
