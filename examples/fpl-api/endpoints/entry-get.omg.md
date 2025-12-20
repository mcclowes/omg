---
method: GET
path: /entry/{entryId}/
operationId: get-entry
tags: [Managers]
---

# Get Entry

Returns information about a specific FPL manager (entry) including their team name, overall rank, and current gameweek performance.

```omg.path
{
  entryId: integer  // Manager ID (found in URL when viewing a team)
}
```

```omg.response
{
  id: integer,
  joined_time: datetime,
  started_event: integer,
  favourite_team: integer?,
  player_first_name: string,
  player_last_name: string,
  player_region_id: integer,
  player_region_name: string,
  player_region_iso_code_short: string,
  player_region_iso_code_long: string,
  summary_overall_points: integer?,
  summary_overall_rank: integer?,
  summary_event_points: integer?,
  summary_event_rank: integer?,
  current_event: integer?,
  leagues: {
    classic: [{
      id: integer,
      name: string,
      short_name: string?,
      created: datetime,
      closed: boolean,
      rank: integer?,
      max_entries: integer?,
      league_type: string,
      scoring: string,
      admin_entry: integer?,
      start_event: integer,
      entry_can_leave: boolean,
      entry_can_admin: boolean,
      entry_can_invite: boolean,
      has_cup: boolean,
      cup_league: integer?,
      cup_qualified: boolean?,
      entry_rank: integer,
      entry_last_rank: integer
    }],
    h2h: [{
      id: integer,
      name: string,
      short_name: string?,
      created: datetime,
      closed: boolean,
      rank: integer?,
      max_entries: integer?,
      league_type: string,
      scoring: string,
      admin_entry: integer?,
      start_event: integer,
      entry_can_leave: boolean,
      entry_can_admin: boolean,
      entry_can_invite: boolean,
      has_cup: boolean,
      cup_league: integer?,
      cup_qualified: boolean?,
      entry_rank: integer,
      entry_last_rank: integer
    }],
    cup: {
      matches: [{
        id: integer,
        entry_1_entry: integer,
        entry_1_name: string,
        entry_1_player_name: string,
        entry_1_points: integer,
        entry_1_win: integer,
        entry_1_draw: integer,
        entry_1_loss: integer,
        entry_1_total: integer,
        entry_2_entry: integer,
        entry_2_name: string,
        entry_2_player_name: string,
        entry_2_points: integer,
        entry_2_win: integer,
        entry_2_draw: integer,
        entry_2_loss: integer,
        entry_2_total: integer,
        is_knockout: boolean,
        winner: integer?,
        seed_value: integer?,
        event: integer,
        tiebreak: string?
      }],
      status: {
        qualification_event: integer?,
        qualification_numbers: integer?,
        qualification_rank: integer?,
        qualification_state: string?
      }
    },
    cup_matches: [{
      id: integer,
      entry_1_entry: integer,
      entry_1_name: string,
      entry_1_player_name: string,
      entry_1_points: integer,
      entry_1_win: integer,
      entry_1_draw: integer,
      entry_1_loss: integer,
      entry_1_total: integer,
      entry_2_entry: integer,
      entry_2_name: string,
      entry_2_player_name: string,
      entry_2_points: integer,
      entry_2_win: integer,
      entry_2_draw: integer,
      entry_2_loss: integer,
      entry_2_total: integer,
      is_knockout: boolean,
      winner: integer?,
      seed_value: integer?,
      event: integer,
      tiebreak: string?
    }]
  },
  name: string,
  name_change_blocked: boolean,
  kit: string?,
  last_deadline_bank: integer?,
  last_deadline_value: integer?,
  last_deadline_total_transfers: integer?
}
```

```omg.example
{
  "id": 1234567,
  "joined_time": "2024-07-15T10:30:00Z",
  "started_event": 1,
  "favourite_team": 1,
  "player_first_name": "John",
  "player_last_name": "Smith",
  "player_region_id": 225,
  "player_region_name": "England",
  "player_region_iso_code_short": "EN",
  "player_region_iso_code_long": "ENG",
  "summary_overall_points": 650,
  "summary_overall_rank": 125000,
  "summary_event_points": 58,
  "summary_event_rank": 1500000,
  "current_event": 12,
  "leagues": {
    "classic": [
      {
        "id": 314,
        "name": "Overall",
        "short_name": "overall",
        "created": "2024-07-01T00:00:00Z",
        "closed": false,
        "league_type": "s",
        "scoring": "c",
        "start_event": 1,
        "entry_rank": 125000,
        "entry_last_rank": 130000
      }
    ],
    "h2h": [],
    "cup": {
      "matches": [],
      "status": {
        "qualification_state": "NOT_QUALIFIED_NOT_CONFIRMED"
      }
    },
    "cup_matches": []
  },
  "name": "FC Champions",
  "name_change_blocked": false,
  "last_deadline_bank": 15,
  "last_deadline_value": 1015,
  "last_deadline_total_transfers": 8
}
```

```omg.response.404
{
  detail: string
}
```
