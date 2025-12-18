---
method: GET
path: /leagues-classic/{leagueId}/standings/
operationId: get-league-classic-standings
tags: [Leagues]
---

# Get Classic League Standings

Returns standings for a classic league including manager rankings and points.

```omg.path
{
  leagueId: integer  // League ID
}
```

```omg.query
{
  page_new_entries: integer?,   // Page for new entries
  page_standings: integer?,     // Page for standings (50 per page)
  phase: integer?               // Phase ID (1 = overall, 2+ = monthly)
}
```

```omg.response
{
  new_entries: {
    has_next: boolean,
    page: integer,
    results: [{
      entry: integer,
      entry_name: string,
      joined_time: datetime,
      player_first_name: string,
      player_last_name: string
    }]
  },
  last_updated_data: datetime,
  league: {
    id: integer,
    name: string,
    created: datetime,
    closed: boolean,
    max_entries: integer?,
    league_type: string,
    scoring: string,
    admin_entry: integer?,
    start_event: integer,
    code_privacy: string,
    has_cup: boolean,
    cup_league: integer?,
    rank: integer?
  },
  standings: {
    has_next: boolean,
    page: integer,
    results: [{
      id: integer,
      event_total: integer,
      player_name: string,
      rank: integer,
      last_rank: integer,
      rank_sort: integer,
      total: integer,
      entry: integer,
      entry_name: string
    }]
  }
}
```

```omg.example
{
  "new_entries": {
    "has_next": false,
    "page": 1,
    "results": []
  },
  "last_updated_data": "2024-11-10T18:00:00Z",
  "league": {
    "id": 12345,
    "name": "Work League",
    "created": "2024-07-20T12:00:00Z",
    "closed": false,
    "max_entries": null,
    "league_type": "x",
    "scoring": "c",
    "admin_entry": 1234567,
    "start_event": 1,
    "code_privacy": "p",
    "has_cup": true,
    "cup_league": 12346,
    "rank": null
  },
  "standings": {
    "has_next": false,
    "page": 1,
    "results": [
      {
        "id": 9876543,
        "event_total": 72,
        "player_name": "John Smith",
        "rank": 1,
        "last_rank": 1,
        "rank_sort": 1,
        "total": 750,
        "entry": 1234567,
        "entry_name": "FC Champions"
      },
      {
        "id": 9876544,
        "event_total": 65,
        "player_name": "Jane Doe",
        "rank": 2,
        "last_rank": 3,
        "rank_sort": 2,
        "total": 720,
        "entry": 2345678,
        "entry_name": "The Invincibles"
      }
    ]
  }
}
```

```omg.response.404
{
  detail: string
}
```
