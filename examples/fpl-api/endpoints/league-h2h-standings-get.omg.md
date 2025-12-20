---
method: GET
path: /leagues-h2h/{leagueId}/standings/
operationId: get-league-h2h-standings
tags: [Leagues]
---

# Get H2H League Standings

Returns standings for a head-to-head league including wins, draws, losses, and points.

```omg.path
{
  leagueId: integer  // League ID
}
```

```omg.query
{
  page_new_entries: integer?,
  page_standings: integer?
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
    rank: integer?,
    ko_rounds: integer?
  },
  standings: {
    has_next: boolean,
    page: integer,
    results: [{
      id: integer,
      division: integer,
      entry: integer,
      player_name: string,
      rank: integer,
      last_rank: integer,
      rank_sort: integer,
      total: integer,
      entry_name: string,
      matches_played: integer,
      matches_won: integer,
      matches_drawn: integer,
      matches_lost: integer,
      points_for: integer
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
    "id": 54321,
    "name": "H2H Battle",
    "created": "2024-07-20T12:00:00Z",
    "closed": false,
    "league_type": "x",
    "scoring": "h",
    "admin_entry": 1234567,
    "start_event": 1,
    "code_privacy": "p",
    "has_cup": false,
    "ko_rounds": 0
  },
  "standings": {
    "has_next": false,
    "page": 1,
    "results": [
      {
        "id": 111222,
        "division": 1,
        "entry": 1234567,
        "player_name": "John Smith",
        "rank": 1,
        "last_rank": 1,
        "rank_sort": 1,
        "total": 27,
        "entry_name": "FC Champions",
        "matches_played": 11,
        "matches_won": 8,
        "matches_drawn": 3,
        "matches_lost": 0,
        "points_for": 650
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
