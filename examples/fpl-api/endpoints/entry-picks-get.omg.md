---
method: GET
path: /entry/{entryId}/event/{eventId}/picks/
operationId: get-entry-picks
tags: [Managers]
---

# Get Entry Picks

Returns the squad picks for a specific manager in a specific gameweek, including captain choice, bench order, automatic substitutions, and active chip.

```omg.path
{
  entryId: integer,  // Manager ID
  eventId: integer   // Gameweek number
}
```

```omg.response
{
  active_chip: string?,
  automatic_subs: [{
    entry: integer,
    element_in: integer,
    element_out: integer,
    event: integer
  }],
  entry_history: {
    event: integer,
    points: integer,
    total_points: integer,
    rank: integer?,
    rank_sort: integer?,
    overall_rank: integer,
    bank: integer,
    value: integer,
    event_transfers: integer,
    event_transfers_cost: integer,
    points_on_bench: integer
  },
  picks: [{
    element: integer,
    position: integer,
    multiplier: integer,
    is_captain: boolean,
    is_vice_captain: boolean
  }]
}
```

```omg.example
{
  "active_chip": null,
  "automatic_subs": [
    {
      "entry": 1234567,
      "element_in": 245,
      "element_out": 312,
      "event": 5
    }
  ],
  "entry_history": {
    "event": 5,
    "points": 58,
    "total_points": 315,
    "rank": 1500000,
    "rank_sort": 1500001,
    "overall_rank": 200000,
    "bank": 10,
    "value": 1008,
    "event_transfers": 1,
    "event_transfers_cost": 0,
    "points_on_bench": 6
  },
  "picks": [
    {"element": 401, "position": 1, "multiplier": 1, "is_captain": false, "is_vice_captain": false},
    {"element": 245, "position": 2, "multiplier": 1, "is_captain": false, "is_vice_captain": false},
    {"element": 267, "position": 3, "multiplier": 1, "is_captain": false, "is_vice_captain": false},
    {"element": 289, "position": 4, "multiplier": 1, "is_captain": false, "is_vice_captain": false},
    {"element": 312, "position": 5, "multiplier": 1, "is_captain": false, "is_vice_captain": false},
    {"element": 156, "position": 6, "multiplier": 1, "is_captain": false, "is_vice_captain": false},
    {"element": 178, "position": 7, "multiplier": 1, "is_captain": false, "is_vice_captain": false},
    {"element": 189, "position": 8, "multiplier": 1, "is_captain": false, "is_vice_captain": false},
    {"element": 201, "position": 9, "multiplier": 1, "is_captain": false, "is_vice_captain": true},
    {"element": 351, "position": 10, "multiplier": 2, "is_captain": true, "is_vice_captain": false},
    {"element": 367, "position": 11, "multiplier": 1, "is_captain": false, "is_vice_captain": false},
    {"element": 402, "position": 12, "multiplier": 0, "is_captain": false, "is_vice_captain": false},
    {"element": 290, "position": 13, "multiplier": 0, "is_captain": false, "is_vice_captain": false},
    {"element": 157, "position": 14, "multiplier": 0, "is_captain": false, "is_vice_captain": false},
    {"element": 368, "position": 15, "multiplier": 0, "is_captain": false, "is_vice_captain": false}
  ]
}
```

```omg.response.404
{
  detail: string
}
```
