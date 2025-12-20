---
method: GET
path: /element-summary/{elementId}/
operationId: get-element-summary
tags: [Players]
---

# Get Element Summary

Returns detailed information about a specific player (element) including their performance history for the current season and past seasons, as well as upcoming fixtures.

```omg.path
{
  elementId: integer  // Player ID from bootstrap-static elements
}
```

```omg.response
{
  fixtures: [{
    id: integer,
    code: integer,
    team_h: integer,
    team_h_score: integer?,
    team_a: integer,
    team_a_score: integer?,
    event: integer?,
    finished: boolean,
    minutes: integer,
    provisional_start_time: boolean,
    kickoff_time: datetime?,
    event_name: string?,
    is_home: boolean,
    difficulty: integer
  }],
  history: [{
    element: integer,
    fixture: integer,
    opponent_team: integer,
    total_points: integer,
    was_home: boolean,
    kickoff_time: datetime,
    team_h_score: integer,
    team_a_score: integer,
    round: integer,
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
    value: integer,
    transfers_balance: integer,
    selected: integer,
    transfers_in: integer,
    transfers_out: integer
  }],
  history_past: [{
    season_name: string,
    element_code: integer,
    start_cost: integer,
    end_cost: integer,
    total_points: integer,
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
    expected_goals_conceded: string
  }]
}
```

```omg.example
{
  "fixtures": [
    {
      "id": 45,
      "code": 2480096,
      "team_h": 11,
      "team_h_score": null,
      "team_a": 20,
      "team_a_score": null,
      "event": 12,
      "finished": false,
      "minutes": 0,
      "kickoff_time": "2024-11-23T15:00:00Z",
      "event_name": "Gameweek 12",
      "is_home": true,
      "difficulty": 2
    }
  ],
  "history": [
    {
      "element": 351,
      "fixture": 1,
      "opponent_team": 3,
      "total_points": 13,
      "was_home": true,
      "kickoff_time": "2024-08-16T19:00:00Z",
      "team_h_score": 2,
      "team_a_score": 1,
      "round": 1,
      "minutes": 90,
      "goals_scored": 2,
      "assists": 0,
      "clean_sheets": 0,
      "goals_conceded": 1,
      "own_goals": 0,
      "penalties_saved": 0,
      "penalties_missed": 0,
      "yellow_cards": 0,
      "red_cards": 0,
      "saves": 0,
      "bonus": 3,
      "bps": 56,
      "influence": "78.2",
      "creativity": "12.4",
      "threat": "95.0",
      "ict_index": "18.6",
      "starts": 1,
      "expected_goals": "1.85",
      "expected_assists": "0.12",
      "value": 150,
      "selected": 6500000,
      "transfers_in": 0,
      "transfers_out": 0,
      "transfers_balance": 0
    }
  ],
  "history_past": [
    {
      "season_name": "2023/24",
      "element_code": 223094,
      "start_cost": 140,
      "end_cost": 145,
      "total_points": 217,
      "minutes": 2769,
      "goals_scored": 27,
      "assists": 5,
      "clean_sheets": 0,
      "goals_conceded": 0,
      "own_goals": 0,
      "penalties_saved": 0,
      "penalties_missed": 1,
      "yellow_cards": 5,
      "red_cards": 0,
      "saves": 0,
      "bonus": 26,
      "bps": 601,
      "influence": "987.6",
      "creativity": "245.8",
      "threat": "1456.0",
      "ict_index": "268.9",
      "starts": 31,
      "expected_goals": "24.56",
      "expected_assists": "3.21"
    }
  ]
}
```

```omg.response.404
{
  detail: string
}
```
