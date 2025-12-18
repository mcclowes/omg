---
title: PokéAPI
version: 2.0.0
description: The RESTful Pokémon API
---

# PokéAPI

> All the Pokémon data you'll ever need in one place

PokéAPI provides a RESTful API interface to highly detailed objects built from thousands of lines of data related to Pokémon. We cover everything from Pokémon sprites to berry flavors.

## Base URL

```
https://pokeapi.co/api/v2
```

## Features

- **No authentication required** - Open and free to use
- **RESTful** - Standard HTTP methods and status codes
- **Cached** - Resources are cached for 24 hours
- **Paginated** - List endpoints return paginated results

## Resources

- [Pokemon](endpoints/pokemon.omg.md) - Core Pokémon data
- [Abilities](endpoints/abilities.omg.md) - Pokémon abilities
- [Types](endpoints/types.omg.md) - Elemental types
- [Moves](endpoints/moves.omg.md) - Battle moves
- [Species](endpoints/species.omg.md) - Species information and evolution

```omg.type
type NamedAPIResource {
  name: string,
  url: string
}
```

```omg.type
type PaginatedResponse<T> {
  count: integer,
  next: string?,
  previous: string?,
  results: T[]
}
```
