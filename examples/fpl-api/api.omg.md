---
name: Fantasy Premier League API
version: 2024-25
baseUrl: https://fantasy.premierleague.com/api
---

# Fantasy Premier League API

> The unofficial public API for Fantasy Premier League

The Fantasy Premier League API provides access to FPL game data including players, teams, fixtures, gameweeks, managers, and league standings. This is an unofficial documentation of the publicly available endpoints.

## Features

- **No authentication required for public data** - Access player stats, fixtures, and league standings
- **Authentication required for personal data** - Manager-specific data requires login
- **RESTful** - Standard HTTP methods and JSON responses
- **CORS restricted** - APIs cannot be called from frontend clients directly

## Resources

- Bootstrap Static - All static game data (get-bootstrap-static)
- Fixtures - Match fixtures and results (list-fixtures, get-fixtures-by-event)
- Players - Individual player summaries (get-element-summary)
- Managers - FPL manager data (get-entry, get-entry-history, get-entry-picks, get-entry-transfers)
- Leagues - League standings (get-league-classic-standings)
- Events - Live gameweek data (get-event-live)

## Important Notes

- Player IDs are called "elements" in the API
- Gameweek IDs are called "events" in the API
- Manager IDs are called "entries" in the API
- Decimal values may be returned as strings in some responses
- The API structure may change between seasons
