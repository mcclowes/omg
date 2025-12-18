# Pokemon

Pokémon are the creatures that inhabit the world of the Pokémon games. They can be caught using Pokéballs and trained by battling with other Pokémon.

{{> partials/common-types }}

```omg.type
type Pokemon {
  id: integer                        // Unique identifier
  name: string                       // Lowercase name
  base_experience: integer?          // Base XP gained for defeating this Pokémon
  height: integer                    // Height in decimetres
  weight: integer                    // Weight in hectograms
  is_default: boolean                // True for default form
  order: integer                     // Order for sorting (almost national dex order)

  abilities: PokemonAbility[]        // Abilities this Pokémon can have
  forms: NamedAPIResource[]          // Alternative forms
  game_indices: VersionGameIndex[]   // Game indices by version
  held_items: PokemonHeldItem[]      // Items this Pokémon may hold
  moves: PokemonMove[]               // Moves this Pokémon can learn
  sprites: PokemonSprites            // Visual representations
  species: NamedAPIResource          // Species this Pokémon belongs to
  stats: PokemonStat[]               // Base stats
  types: PokemonType[]               // Elemental types
  past_types: PokemonTypePast[]?     // Types in previous generations
}
```

```omg.type
type PokemonAbility {
  is_hidden: boolean                 // Whether this is a hidden ability
  slot: integer @min(1) @max(3)      // Ability slot (1-3)
  ability: NamedAPIResource          // The ability details
}
```

```omg.type
type PokemonType {
  slot: integer @min(1) @max(2)      // Type slot (1 = primary, 2 = secondary)
  type: NamedAPIResource             // The type details
}
```

```omg.type
type PokemonTypePast {
  generation: NamedAPIResource       // Generation this type config was used
  types: PokemonType[]               // Types in that generation
}
```

```omg.type
type PokemonStat {
  stat: NamedAPIResource             // The stat (hp, attack, defense, etc.)
  effort: integer @min(0) @max(3)    // Effort points gained
  base_stat: integer @min(1)         // Base value of the stat
}
```

```omg.type
type PokemonMove {
  move: NamedAPIResource             // The move
  version_group_details: PokemonMoveVersion[]
}
```

```omg.type
type PokemonMoveVersion {
  move_learn_method: NamedAPIResource   // How the move is learned
  version_group: NamedAPIResource       // Version group
  level_learned_at: integer @min(0)     // Level learned (0 if not level-up)
}
```

```omg.type
type PokemonHeldItem {
  item: NamedAPIResource             // The item
  version_details: PokemonHeldItemVersion[]
}
```

```omg.type
type PokemonHeldItemVersion {
  version: NamedAPIResource          // Game version
  rarity: integer @min(1) @max(100)  // Chance of holding (percentage)
}
```

```omg.type
type PokemonSprites {
  front_default: string?             // Default front sprite URL
  front_shiny: string?               // Shiny front sprite URL
  front_female: string?              // Female front sprite URL
  front_shiny_female: string?        // Shiny female front sprite URL
  back_default: string?              // Default back sprite URL
  back_shiny: string?                // Shiny back sprite URL
  back_female: string?               // Female back sprite URL
  back_shiny_female: string?         // Shiny female back sprite URL
  other: {
    dream_world: {
      front_default: string?,
      front_female: string?
    }?,
    home: {
      front_default: string?,
      front_female: string?,
      front_shiny: string?,
      front_shiny_female: string?
    }?,
    official-artwork: {
      front_default: string?,
      front_shiny: string?
    }?
  }?
}
```

---

## List Pokemon

---
method: GET
path: /pokemon
operationId: list-pokemon
tags: [Pokemon]
---

Returns a paginated list of all Pokémon resources.

```omg.query
{
  limit: integer? @min(1) @max(100)   // Results per page (default: 20)
  offset: integer? @min(0)            // Number of results to skip
}
```

```omg.response
{
  count: integer,                     // Total number of Pokémon
  next: string?,                      // URL for next page
  previous: string?,                  // URL for previous page
  results: NamedAPIResource[]         // Pokémon in this page
}
```

```omg.example
{
  "count": 1302,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  "previous": null,
  "results": [
    { "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" },
    { "name": "ivysaur", "url": "https://pokeapi.co/api/v2/pokemon/2/" },
    { "name": "venusaur", "url": "https://pokeapi.co/api/v2/pokemon/3/" }
  ]
}
```

---

## Get Pokemon

---
method: GET
path: /pokemon/{idOrName}
operationId: get-pokemon
tags: [Pokemon]
---

Returns detailed information about a specific Pokémon.

```omg.path
{
  idOrName: string   // Pokémon ID (1-1302) or lowercase name
}
```

```omg.response
Pokemon
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
    "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png",
    "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
    "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/25.png"
  },
  "species": { "name": "pikachu", "url": "https://pokeapi.co/api/v2/pokemon-species/25/" }
}
```

```omg.response.404
{
  detail: string   // "Not found."
}
```
