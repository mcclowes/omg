```omg.type
type NamedAPIResource {
  name: string   // Resource name
  url: string    // Full URL to the resource
}
```

```omg.type
type Name {
  name: string,
  language: NamedAPIResource
}
```

```omg.type
type Description {
  description: string,
  language: NamedAPIResource
}
```

```omg.type
type Effect {
  effect: string,
  language: NamedAPIResource
}
```

```omg.type
type VerboseEffect {
  effect: string,
  short_effect: string,
  language: NamedAPIResource
}
```

```omg.type
type FlavorText {
  flavor_text: string,
  language: NamedAPIResource,
  version: NamedAPIResource?
}
```

```omg.type
type VersionGameIndex {
  game_index: integer,
  version: NamedAPIResource
}
```

```omg.type
type GenerationGameIndex {
  game_index: integer,
  generation: NamedAPIResource
}
```
