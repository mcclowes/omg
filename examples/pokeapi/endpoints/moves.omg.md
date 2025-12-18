# Moves

Moves are the skills Pokémon use in battle. A Pokémon can have up to four moves at a time, each with properties like power, accuracy, type, and PP (power points).

{{> partials/common-types }}

```omg.type
type Move {
  id: integer                           // Unique identifier
  name: string                          // Lowercase hyphenated name
  accuracy: integer? @min(0) @max(100)  // Accuracy percentage (null for status moves)
  effect_chance: integer?               // Chance of additional effect occurring
  pp: integer @min(1)                   // Base power points
  priority: integer @min(-7) @max(5)    // Move priority (-7 to +5)
  power: integer? @min(0)               // Base power (null for status moves)

  type: NamedAPIResource                // Elemental type
  damage_class: NamedAPIResource        // physical, special, or status
  target: NamedAPIResource              // What the move targets
  generation: NamedAPIResource          // Generation introduced

  contest_type: NamedAPIResource?       // Contest category
  contest_effect: {                     // Contest effect details
    url: string
  }?
  super_contest_effect: {
    url: string
  }?

  names: Name[]
  effect_entries: VerboseEffect[]       // Effect descriptions
  effect_changes: MoveEffectChange[]?   // Historical effect changes
  flavor_text_entries: MoveFlavorText[]

  meta: MoveMeta?                       // Battle metadata
  machines: MoveVersionMachine[]        // TM/HM info by version
  learned_by_pokemon: NamedAPIResource[] // Pokémon that can learn this move

  stat_changes: MoveStatChange[]?       // Stat modifications
  past_values: MovePastValues[]?        // Historical move values
}
```

```omg.type
type MoveMeta {
  ailment: NamedAPIResource             // Status condition caused
  category: NamedAPIResource            // Move category (damage, ailment, etc.)
  min_hits: integer?                    // Minimum hits for multi-hit moves
  max_hits: integer?                    // Maximum hits for multi-hit moves
  min_turns: integer?                   // Minimum turns for multi-turn moves
  max_turns: integer?                   // Maximum turns for multi-turn moves
  drain: integer                        // HP drain percentage (-100 to 100)
  healing: integer                      // HP healing percentage
  crit_rate: integer @min(0)            // Critical hit stage bonus
  flinch_chance: integer @min(0) @max(100)
  stat_chance: integer @min(0) @max(100)
}
```

```omg.type
type MoveStatChange {
  change: integer @min(-6) @max(6)      // Stat stage change
  stat: NamedAPIResource
}
```

```omg.type
type MoveEffectChange {
  effect_entries: Effect[]
  version_group: NamedAPIResource
}
```

```omg.type
type MoveFlavorText {
  flavor_text: string,
  language: NamedAPIResource,
  version_group: NamedAPIResource
}
```

```omg.type
type MoveVersionMachine {
  machine: { url: string },
  version_group: NamedAPIResource
}
```

```omg.type
type MovePastValues {
  accuracy: integer?,
  effect_chance: integer?,
  power: integer?,
  pp: integer?,
  effect_entries: VerboseEffect[],
  type: NamedAPIResource?,
  version_group: NamedAPIResource
}
```

---

## List Moves

---
method: GET
path: /move
operationId: list-moves
tags: [Moves]
---

Returns a paginated list of all move resources.

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

## Get Move

---
method: GET
path: /move/{idOrName}
operationId: get-move
tags: [Moves]
---

Returns detailed information about a specific move.

```omg.path
{
  idOrName: string   // Move ID or lowercase hyphenated name
}
```

```omg.response
Move
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
  "damage_class": { "name": "special", "url": "https://pokeapi.co/api/v2/move-damage-class/3/" },
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
    { "name": "pikachu", "url": "https://pokeapi.co/api/v2/pokemon/25/" },
    { "name": "raichu", "url": "https://pokeapi.co/api/v2/pokemon/26/" },
    { "name": "magnemite", "url": "https://pokeapi.co/api/v2/pokemon/81/" }
  ]
}
```

```omg.response.404
{
  detail: string
}
```
