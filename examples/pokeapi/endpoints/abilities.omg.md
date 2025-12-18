# Abilities

Abilities provide passive effects for Pokémon in battle or in the overworld. Pokémon have multiple possible abilities but can have only one ability at a time.

{{> partials/common-types }}

```omg.type
type Ability {
  id: integer                           // Unique identifier
  name: string                          // Lowercase hyphenated name
  is_main_series: boolean               // Whether this is a main series ability
  generation: NamedAPIResource          // Generation this ability was introduced
  names: Name[]                         // Localized names
  effect_entries: VerboseEffect[]       // Effect descriptions
  effect_changes: AbilityEffectChange[] // Changes across versions
  flavor_text_entries: AbilityFlavorText[]
  pokemon: AbilityPokemon[]             // Pokémon with this ability
}
```

```omg.type
type AbilityEffectChange {
  effect_entries: Effect[]              // Effect in this version
  version_group: NamedAPIResource       // Version group
}
```

```omg.type
type AbilityFlavorText {
  flavor_text: string                   // Localized flavor text
  language: NamedAPIResource
  version_group: NamedAPIResource
}
```

```omg.type
type AbilityPokemon {
  is_hidden: boolean                    // Whether this is a hidden ability for this Pokémon
  slot: integer @min(1) @max(3)         // Ability slot
  pokemon: NamedAPIResource             // The Pokémon
}
```

---

## List Abilities

---
method: GET
path: /ability
operationId: list-abilities
tags: [Abilities]
---

Returns a paginated list of all ability resources.

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

---

## Get Ability

---
method: GET
path: /ability/{idOrName}
operationId: get-ability
tags: [Abilities]
---

Returns detailed information about a specific ability.

```omg.path
{
  idOrName: string   // Ability ID or lowercase hyphenated name
}
```

```omg.response
Ability
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
      "effect": "Whenever a move makes contact with this Pokémon, the move's user has a 30% chance of being paralyzed...",
      "short_effect": "Has a 30% chance of paralyzing attacking Pokémon on contact.",
      "language": { "name": "en", "url": "..." }
    }
  ],
  "pokemon": [
    {
      "is_hidden": false,
      "slot": 1,
      "pokemon": { "name": "pikachu", "url": "https://pokeapi.co/api/v2/pokemon/25/" }
    },
    {
      "is_hidden": false,
      "slot": 1,
      "pokemon": { "name": "electabuzz", "url": "https://pokeapi.co/api/v2/pokemon/125/" }
    }
  ]
}
```

```omg.response.404
{
  detail: string
}
```
