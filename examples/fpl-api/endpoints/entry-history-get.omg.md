---
method: GET
path: /entry/{entryId}/history/
operationId: get-entry-history
tags: [Managers]
---

# Get Entry History

Returns the historical performance data for a specific FPL manager including gameweek-by-gameweek stats, past seasons summary, and chips used.

```omg.path
{
  entryId: integer  // Manager ID
}
```

```omg.response
{
  current: [{
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
  }],
  past: [{
    season_name: string,
    total_points: integer,
    rank: integer
  }],
  chips: [{
    name: string,
    time: datetime,
    event: integer
  }]
}
```

```omg.example
{
  "current": [
    {
      "event": 1,
      "points": 65,
      "total_points": 65,
      "rank": 2500000,
      "rank_sort": 2500001,
      "overall_rank": 2500000,
      "bank": 0,
      "value": 1000,
      "event_transfers": 0,
      "event_transfers_cost": 0,
      "points_on_bench": 12
    },
    {
      "event": 2,
      "points": 72,
      "total_points": 137,
      "rank": 1800000,
      "rank_sort": 1800001,
      "overall_rank": 1200000,
      "bank": 5,
      "value": 1003,
      "event_transfers": 1,
      "event_transfers_cost": 0,
      "points_on_bench": 8
    }
  ],
  "past": [
    {
      "season_name": "2023/24",
      "total_points": 2345,
      "rank": 85000
    },
    {
      "season_name": "2022/23",
      "total_points": 2156,
      "rank": 250000
    }
  ],
  "chips": [
    {
      "name": "wildcard",
      "time": "2024-09-15T14:30:00Z",
      "event": 4
    }
  ]
}
```

```omg.response.404
{
  detail: string
}
```
