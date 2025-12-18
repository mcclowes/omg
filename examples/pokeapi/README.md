# PokéAPI - OMG Example

This example demonstrates OMG (OpenAPI Markdown Grammar) by documenting a subset of [PokéAPI](https://pokeapi.co/), a free RESTful Pokémon API.

## Why PokéAPI?

- **Rich data model** - Nested relationships (Pokemon → abilities → types)
- **No authentication** - Easy to explore
- **Familiar domain** - Everyone knows what Pokémon are
- **Good documentation** - Well-documented API to compare against

## Structure

```
pokeapi/
├── api.omg.md              # API root (name, version, base URL)
└── endpoints/
    ├── list-pokemon.omg.md # GET /pokemon
    ├── get-pokemon.omg.md  # GET /pokemon/{id}
    ├── list-abilities.omg.md
    ├── get-ability.omg.md
    ├── list-types.omg.md
    ├── get-type.omg.md
    ├── list-moves.omg.md
    ├── get-move.omg.md
    ├── list-species.omg.md
    └── get-species.omg.md
```

## Usage

```bash
# Install dependencies
npm install

# Build to OpenAPI
npm run build

# Validate output
npm run validate
```

## What This Demonstrates

- **One file per endpoint** - Clean organization
- **YAML frontmatter** - Method, path, operationId, tags
- **Inline type definitions** - Nested objects and arrays
- **Type constraints** - `@min`, `@max` annotations
- **Optional fields** - Using `?` suffix
- **Examples** - JSON examples for each endpoint
- **Multiple response codes** - 200 and 404 responses

## Stats

- **845 lines of OMG** → **~1,500 lines of OpenAPI**
- 10 endpoints documented
- Validates as OpenAPI 3.1
