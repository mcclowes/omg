---
method: GET
path: /bootstrap-static/
operationId: get-bootstrap-static
tags: [Bootstrap]
---

# Get Bootstrap Static

Returns all static game data including players (elements), teams, gameweeks (events), player positions (element_types), game settings, and phases. This is the primary endpoint for fetching FPL data.

```omg.response
{
  events: [{
    id: integer,
    name: string,
    deadline_time: datetime,
    average_entry_score: integer?,
    finished: boolean,
    data_checked: boolean,
    highest_scoring_entry: integer?,
    deadline_time_epoch: integer,
    deadline_time_game_offset: integer,
    highest_score: integer?,
    is_previous: boolean,
    is_current: boolean,
    is_next: boolean,
    cup_leagues_created: boolean,
    h2h_ko_matches_created: boolean,
    chip_plays: [{
      chip_name: string,
      num_played: integer
    }],
    most_selected: integer?,
    most_transferred_in: integer?,
    top_element: integer?,
    top_element_info: {
      id: integer,
      points: integer
    }?,
    transfers_made: integer?,
    most_captained: integer?,
    most_vice_captained: integer?
  }],
  game_settings: {
    league_join_private_max: integer,
    league_join_public_max: integer,
    league_max_size_public_classic: integer,
    league_max_size_public_h2h: integer,
    league_max_size_private_h2h: integer,
    league_max_ko_rounds_private_h2h: integer,
    league_prefix_public: string,
    league_points_h2h_win: integer,
    league_points_h2h_lose: integer,
    league_points_h2h_draw: integer,
    league_ko_first_instead_of_random: boolean,
    cup_start_event_id: integer?,
    cup_stop_event_id: integer?,
    cup_qualifying_method: string?,
    cup_type: string?,
    squad_squadplay: integer,
    squad_squadsize: integer,
    squad_team_limit: integer,
    squad_total_spend: integer,
    ui_currency_multiplier: integer,
    ui_use_special_shirts: boolean,
    ui_special_shirt_exclusions: string[],
    stats_form_days: integer,
    sys_vice_captain_enabled: boolean,
    transfers_cap: integer,
    transfers_sell_on_fee: number,
    league_h2h_tiebreak_stats: string[],
    timezone: string
  },
  phases: [{
    id: integer,
    name: string,
    start_event: integer,
    stop_event: integer
  }],
  teams: [{
    code: integer,
    draw: integer,
    form: string?,
    id: integer,
    loss: integer,
    name: string,
    played: integer,
    points: integer,
    position: integer,
    short_name: string,
    strength: integer,
    team_division: string?,
    unavailable: boolean,
    win: integer,
    strength_overall_home: integer,
    strength_overall_away: integer,
    strength_attack_home: integer,
    strength_attack_away: integer,
    strength_defence_home: integer,
    strength_defence_away: integer,
    pulse_id: integer
  }],
  total_players: integer,
  elements: [{
    chance_of_playing_next_round: integer?,
    chance_of_playing_this_round: integer?,
    code: integer,
    cost_change_event: integer,
    cost_change_event_fall: integer,
    cost_change_start: integer,
    cost_change_start_fall: integer,
    dreamteam_count: integer,
    element_type: integer,
    ep_next: string?,
    ep_this: string?,
    event_points: integer,
    first_name: string,
    form: string,
    id: integer,
    in_dreamteam: boolean,
    news: string,
    news_added: datetime?,
    now_cost: integer,
    photo: string,
    points_per_game: string,
    second_name: string,
    selected_by_percent: string,
    special: boolean,
    squad_number: integer?,
    status: string,
    team: integer,
    team_code: integer,
    total_points: integer,
    transfers_in: integer,
    transfers_in_event: integer,
    transfers_out: integer,
    transfers_out_event: integer,
    value_form: string,
    value_season: string,
    web_name: string,
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
    influence_rank: integer,
    influence_rank_type: integer,
    creativity_rank: integer,
    creativity_rank_type: integer,
    threat_rank: integer,
    threat_rank_type: integer,
    ict_index_rank: integer,
    ict_index_rank_type: integer,
    corners_and_indirect_freekicks_order: integer?,
    corners_and_indirect_freekicks_text: string,
    direct_freekicks_order: integer?,
    direct_freekicks_text: string,
    penalties_order: integer?,
    penalties_text: string,
    expected_goals_per_90: number,
    saves_per_90: number,
    expected_assists_per_90: number,
    expected_goal_involvements_per_90: number,
    expected_goals_conceded_per_90: number,
    goals_conceded_per_90: number,
    now_cost_rank: integer,
    now_cost_rank_type: integer,
    form_rank: integer,
    form_rank_type: integer,
    points_per_game_rank: integer,
    points_per_game_rank_type: integer,
    selected_rank: integer,
    selected_rank_type: integer,
    starts_per_90: number,
    clean_sheets_per_90: number
  }],
  element_stats: [{
    label: string,
    name: string
  }],
  element_types: [{
    id: integer,
    plural_name: string,
    plural_name_short: string,
    singular_name: string,
    singular_name_short: string,
    squad_select: integer,
    squad_min_play: integer,
    squad_max_play: integer,
    ui_shirt_specific: boolean,
    sub_positions_locked: integer[],
    element_count: integer
  }]
}
```

```omg.example
{
  "events": [
    {
      "id": 1,
      "name": "Gameweek 1",
      "deadline_time": "2024-08-16T17:30:00Z",
      "average_entry_score": 57,
      "finished": true,
      "data_checked": true,
      "highest_scoring_entry": 12345678,
      "is_previous": false,
      "is_current": false,
      "is_next": false,
      "chip_plays": [
        {"chip_name": "bboost", "num_played": 123456},
        {"chip_name": "3xc", "num_played": 234567}
      ],
      "most_captained": 351,
      "top_element": 351,
      "top_element_info": {"id": 351, "points": 13}
    }
  ],
  "teams": [
    {
      "code": 3,
      "id": 1,
      "name": "Arsenal",
      "short_name": "ARS",
      "strength": 5,
      "position": 1,
      "played": 10,
      "win": 7,
      "draw": 2,
      "loss": 1,
      "points": 23
    }
  ],
  "elements": [
    {
      "id": 351,
      "first_name": "Erling",
      "second_name": "Haaland",
      "web_name": "Haaland",
      "team": 11,
      "element_type": 4,
      "now_cost": 150,
      "total_points": 95,
      "goals_scored": 10,
      "assists": 1,
      "form": "8.5",
      "selected_by_percent": "65.5",
      "status": "a"
    }
  ],
  "element_types": [
    {"id": 1, "singular_name": "Goalkeeper", "singular_name_short": "GKP", "plural_name": "Goalkeepers"},
    {"id": 2, "singular_name": "Defender", "singular_name_short": "DEF", "plural_name": "Defenders"},
    {"id": 3, "singular_name": "Midfielder", "singular_name_short": "MID", "plural_name": "Midfielders"},
    {"id": 4, "singular_name": "Forward", "singular_name_short": "FWD", "plural_name": "Forwards"}
  ],
  "total_players": 11000000
}
```
