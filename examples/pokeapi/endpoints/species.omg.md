# Pokemon Species

A Pokémon Species forms the basis for at least one Pokémon. Attributes of a Pokémon species are shared across all varieties of that species, such as base happiness, capture rate, and genus.

{{> partials/common-types }}

```omg.type
type PokemonSpecies {
  id: integer                             // National Pokédex number
  name: string                            // Lowercase species name
  order: integer                          // Order for sorting
  gender_rate: integer @min(-1) @max(8)   // Female ratio in eighths (-1 = genderless)
  capture_rate: integer @min(0) @max(255) // Base capture rate
  base_happiness: integer @min(0) @max(255)
  is_baby: boolean                        // Whether this is a baby Pokémon
  is_legendary: boolean
  is_mythical: boolean
  hatch_counter: integer @min(0)          // Steps to hatch egg / 255

  has_gender_differences: boolean         // Whether males and females look different
  forms_switchable: boolean               // Whether forms can be switched in battle

  growth_rate: NamedAPIResource           // Experience curve
  generation: NamedAPIResource            // Generation introduced
  habitat: NamedAPIResource?              // Natural habitat
  color: NamedAPIResource                 // Pokédex color category
  shape: NamedAPIResource?                // Body shape classification

  egg_groups: NamedAPIResource[]          // Breeding groups
  pokedex_numbers: PokemonSpeciesDexEntry[]
  pal_park_encounters: PalParkEncounter[]?

  evolves_from_species: NamedAPIResource? // Pre-evolution
  evolution_chain: { url: string }        // Full evolution chain

  names: Name[]
  flavor_text_entries: FlavorText[]       // Pokédex entries
  form_descriptions: Description[]?
  genera: Genus[]                         // "Mouse Pokémon", "Seed Pokémon", etc.

  varieties: PokemonSpeciesVariety[]      // Different forms (mega, alola, etc.)
}
```

```omg.type
type Genus {
  genus: string,                          // "Mouse Pokémon"
  language: NamedAPIResource
}
```

```omg.type
type PokemonSpeciesDexEntry {
  entry_number: integer,                  // Pokédex number in this region
  pokedex: NamedAPIResource               // Regional Pokédex
}
```

```omg.type
type PalParkEncounter {
  base_score: integer,
  rate: integer,
  area: NamedAPIResource
}
```

```omg.type
type PokemonSpeciesVariety {
  is_default: boolean,                    // Whether this is the default variety
  pokemon: NamedAPIResource               // The Pokémon variety
}
```

---

## List Pokemon Species

---
method: GET
path: /pokemon-species
operationId: list-pokemon-species
tags: [Pokemon Species]
---

Returns a paginated list of all Pokémon species.

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

## Get Pokemon Species

---
method: GET
path: /pokemon-species/{idOrName}
operationId: get-pokemon-species
tags: [Pokemon Species]
---

Returns detailed species information including evolution data, breeding info, and Pokédex entries.

```omg.path
{
  idOrName: string   // National Pokédex number or lowercase name
}
```

```omg.response
PokemonSpecies
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
  "evolves_from_species": { "name": "pichu", "url": "https://pokeapi.co/api/v2/pokemon-species/172/" },
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
    { "is_default": false, "pokemon": { "name": "pikachu-rock-star", "url": "..." } },
    { "is_default": false, "pokemon": { "name": "pikachu-belle", "url": "..." } },
    { "is_default": false, "pokemon": { "name": "pikachu-gmax", "url": "..." } }
  ]
}
```

```omg.response.404
{
  detail: string
}
```
