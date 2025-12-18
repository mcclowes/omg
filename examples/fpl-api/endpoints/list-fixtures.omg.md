---
method: GET
path: /fixtures/
operationId: list-fixtures
tags: [Fixtures]
---

# List Fixtures

Returns all fixtures for the current season, including completed matches with scores and upcoming fixtures.

```omg.query
{
  event: integer?  // Filter by gameweek ID
}
```

```omg.response
[{
  code: integer,
  event: integer?,
  finished: boolean,
  finished_provisional: boolean,
  id: integer,
  kickoff_time: datetime?,
  minutes: integer,
  provisional_start_time: boolean,
  started: boolean?,
  team_a: integer,
  team_a_score: integer?,
  team_h: integer,
  team_h_score: integer?,
  stats: [{
    identifier: string,
    a: [{
      value: integer,
      element: integer
    }],
    h: [{
      value: integer,
      element: integer
    }]
  }],
  team_h_difficulty: integer,
  team_a_difficulty: integer,
  pulse_id: integer
}]
```

```omg.example
[
  {
    "code": 2480052,
    "event": 1,
    "finished": true,
    "finished_provisional": true,
    "id": 1,
    "kickoff_time": "2024-08-16T19:00:00Z",
    "minutes": 90,
    "provisional_start_time": false,
    "started": true,
    "team_a": 3,
    "team_a_score": 1,
    "team_h": 1,
    "team_h_score": 2,
    "stats": [
      {
        "identifier": "goals_scored",
        "a": [{"value": 1, "element": 123}],
        "h": [{"value": 1, "element": 351}, {"value": 1, "element": 352}]
      },
      {
        "identifier": "assists",
        "a": [{"value": 1, "element": 124}],
        "h": [{"value": 1, "element": 353}]
      },
      {
        "identifier": "bonus",
        "a": [],
        "h": [{"value": 3, "element": 351}, {"value": 2, "element": 352}]
      }
    ],
    "team_h_difficulty": 3,
    "team_a_difficulty": 4,
    "pulse_id": 93034
  },
  {
    "code": 2480053,
    "event": 2,
    "finished": false,
    "finished_provisional": false,
    "id": 11,
    "kickoff_time": "2024-08-24T14:00:00Z",
    "minutes": 0,
    "provisional_start_time": false,
    "started": false,
    "team_a": 5,
    "team_a_score": null,
    "team_h": 8,
    "team_h_score": null,
    "stats": [],
    "team_h_difficulty": 2,
    "team_a_difficulty": 3,
    "pulse_id": 93044
  }
]
```
