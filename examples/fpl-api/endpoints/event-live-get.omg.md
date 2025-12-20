---
method: GET
path: /event/{eventId}/live/
operationId: get-event-live
tags: [Events]
---

# Get Event Live

Returns live data for a specific gameweek including real-time player statistics and bonus points.

```omg.path
{
  eventId: integer  // Gameweek number (1-38)
}
```

```omg.response
{
  elements: [{
    id: integer,
    stats: {
      minutes: integer,
      goals_scored: integer,
      assists: integer,
      clean_sheets: integer,
      goals_conceded: integer,
      own_goals: integer,
      penalties_saved: integer,
      penalties_missed: integer,
      yellow_cards: integer,
      red_cards: integer,
      saves: integer,
      bonus: integer,
      bps: integer,
      influence: string,
      creativity: string,
      threat: string,
      ict_index: string,
      starts: integer,
      expected_goals: string,
      expected_assists: string,
      expected_goal_involvements: string,
      expected_goals_conceded: string,
      total_points: integer,
      in_dreamteam: boolean
    },
    explain: [{
      fixture: integer,
      stats: [{
        identifier: string,
        points: integer,
        value: integer
      }]
    }]
  }]
}
```

```omg.example
{
  "elements": [
    {
      "id": 351,
      "stats": {
        "minutes": 90,
        "goals_scored": 2,
        "assists": 1,
        "clean_sheets": 0,
        "goals_conceded": 0,
        "own_goals": 0,
        "penalties_saved": 0,
        "penalties_missed": 0,
        "yellow_cards": 0,
        "red_cards": 0,
        "saves": 0,
        "bonus": 3,
        "bps": 62,
        "influence": "85.4",
        "creativity": "25.6",
        "threat": "98.0",
        "ict_index": "20.9",
        "starts": 1,
        "expected_goals": "1.65",
        "expected_assists": "0.45",
        "expected_goal_involvements": "2.10",
        "expected_goals_conceded": "0.00",
        "total_points": 17,
        "in_dreamteam": true
      },
      "explain": [
        {
          "fixture": 55,
          "stats": [
            {"identifier": "minutes", "points": 2, "value": 90},
            {"identifier": "goals_scored", "points": 8, "value": 2},
            {"identifier": "assists", "points": 3, "value": 1},
            {"identifier": "bonus", "points": 3, "value": 3}
          ]
        }
      ]
    },
    {
      "id": 245,
      "stats": {
        "minutes": 90,
        "goals_scored": 0,
        "assists": 0,
        "clean_sheets": 1,
        "goals_conceded": 0,
        "own_goals": 0,
        "penalties_saved": 0,
        "penalties_missed": 0,
        "yellow_cards": 0,
        "red_cards": 0,
        "saves": 0,
        "bonus": 1,
        "bps": 28,
        "influence": "22.0",
        "creativity": "8.4",
        "threat": "2.0",
        "ict_index": "3.2",
        "starts": 1,
        "expected_goals": "0.05",
        "expected_assists": "0.12",
        "expected_goal_involvements": "0.17",
        "expected_goals_conceded": "0.85",
        "total_points": 7,
        "in_dreamteam": false
      },
      "explain": [
        {
          "fixture": 55,
          "stats": [
            {"identifier": "minutes", "points": 2, "value": 90},
            {"identifier": "clean_sheets", "points": 4, "value": 1},
            {"identifier": "bonus", "points": 1, "value": 1}
          ]
        }
      ]
    }
  ]
}
```

```omg.response.404
{
  detail: string
}
```
