# Types

Types are properties for Pokémon and their moves. Each type has three properties: which types of Pokémon it's super effective against, which types resist it, and which types are immune to it.

{{> partials/common-types }}

```omg.type
type Type {
  id: integer                           // Unique identifier (1-18 for standard types)
  name: string                          // Lowercase name (fire, water, grass, etc.)
  generation: NamedAPIResource          // Generation this type was introduced
  damage_relations: TypeRelations       // Type effectiveness
  past_damage_relations: TypeRelationsPast[]?  // Historical type relations
  game_indices: GenerationGameIndex[]
  names: Name[]                         // Localized names
  pokemon: TypePokemon[]                // Pokémon with this type
  moves: NamedAPIResource[]             // Moves of this type
}
```

```omg.type
type TypeRelations {
  no_damage_to: NamedAPIResource[]      // Types this type does 0x damage to
  half_damage_to: NamedAPIResource[]    // Types this type does 0.5x damage to
  double_damage_to: NamedAPIResource[]  // Types this type does 2x damage to
  no_damage_from: NamedAPIResource[]    // Types that do 0x damage to this type
  half_damage_from: NamedAPIResource[]  // Types that do 0.5x damage to this type
  double_damage_from: NamedAPIResource[] // Types that do 2x damage to this type
}
```

```omg.type
type TypeRelationsPast {
  generation: NamedAPIResource          // Generation these relations were used
  damage_relations: TypeRelations
}
```

```omg.type
type TypePokemon {
  slot: integer @min(1) @max(2)         // Type slot (primary or secondary)
  pokemon: NamedAPIResource
}
```

---

## List Types

---
method: GET
path: /type
operationId: list-types
tags: [Types]
---

Returns a paginated list of all type resources.

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
  results: NamedAPIResource[]
}
```

```omg.example
{
  "count": 20,
  "next": null,
  "previous": null,
  "results": [
    { "name": "normal", "url": "https://pokeapi.co/api/v2/type/1/" },
    { "name": "fighting", "url": "https://pokeapi.co/api/v2/type/2/" },
    { "name": "flying", "url": "https://pokeapi.co/api/v2/type/3/" },
    { "name": "poison", "url": "https://pokeapi.co/api/v2/type/4/" },
    { "name": "ground", "url": "https://pokeapi.co/api/v2/type/5/" },
    { "name": "rock", "url": "https://pokeapi.co/api/v2/type/6/" },
    { "name": "bug", "url": "https://pokeapi.co/api/v2/type/7/" },
    { "name": "ghost", "url": "https://pokeapi.co/api/v2/type/8/" },
    { "name": "steel", "url": "https://pokeapi.co/api/v2/type/9/" },
    { "name": "fire", "url": "https://pokeapi.co/api/v2/type/10/" },
    { "name": "water", "url": "https://pokeapi.co/api/v2/type/11/" },
    { "name": "grass", "url": "https://pokeapi.co/api/v2/type/12/" },
    { "name": "electric", "url": "https://pokeapi.co/api/v2/type/13/" },
    { "name": "psychic", "url": "https://pokeapi.co/api/v2/type/14/" },
    { "name": "ice", "url": "https://pokeapi.co/api/v2/type/15/" },
    { "name": "dragon", "url": "https://pokeapi.co/api/v2/type/16/" },
    { "name": "dark", "url": "https://pokeapi.co/api/v2/type/17/" },
    { "name": "fairy", "url": "https://pokeapi.co/api/v2/type/18/" }
  ]
}
```

---

## Get Type

---
method: GET
path: /type/{idOrName}
operationId: get-type
tags: [Types]
---

Returns detailed information about a specific type, including damage relations.

```omg.path
{
  idOrName: string   // Type ID (1-18) or lowercase name
}
```

```omg.response
Type
```

```omg.example
{
  "id": 10,
  "name": "fire",
  "generation": { "name": "generation-i", "url": "https://pokeapi.co/api/v2/generation/1/" },
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
    { "slot": 1, "pokemon": { "name": "charmeleon", "url": "..." } },
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
