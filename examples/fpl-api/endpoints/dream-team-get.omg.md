---
method: GET
path: /dream-team/{eventId}/
operationId: get-dream-team
tags: [Events]
---

# Get Dream Team

Returns the dream team (best XI) for a specific gameweek based on points scored.

```omg.path
{
  eventId: integer  // Gameweek number (1-38)
}
```

```omg.response
{
  top_player: {
    id: integer,
    points: integer
  },
  team: [{
    element: integer,
    points: integer,
    position: integer
  }]
}
```

```omg.example
{
  "top_player": {
    "id": 351,
    "points": 17
  },
  "team": [
    {"element": 401, "points": 9, "position": 1},
    {"element": 245, "points": 12, "position": 2},
    {"element": 267, "points": 11, "position": 3},
    {"element": 289, "points": 10, "position": 4},
    {"element": 156, "points": 15, "position": 5},
    {"element": 178, "points": 12, "position": 6},
    {"element": 189, "points": 11, "position": 7},
    {"element": 201, "points": 14, "position": 8},
    {"element": 351, "points": 17, "position": 9},
    {"element": 367, "points": 13, "position": 10},
    {"element": 380, "points": 12, "position": 11}
  ]
}
```

```omg.response.404
{
  detail: string
}
```
