# Fantasy Premier League API

This example recreates the [Fantasy Premier League](https://fantasy.premierleague.com/) public API specification using OMG format.

## About the API

The FPL API is an unofficial but publicly accessible API that provides access to Fantasy Premier League game data. This includes player statistics, fixtures, gameweek information, manager data, and league standings.

**Base URL:** `https://fantasy.premierleague.com/api/`

## Key Concepts

- **Elements** = Players
- **Events** = Gameweeks
- **Entries** = Managers/Teams
- **Fixtures** = Matches

## Endpoints

### Bootstrap & Static Data
- `GET /bootstrap-static/` - All static game data (players, teams, gameweeks)

### Fixtures
- `GET /fixtures/` - All fixtures with optional gameweek filter

### Players
- `GET /element-summary/{elementId}/` - Individual player details and history

### Managers
- `GET /entry/{entryId}/` - Manager profile
- `GET /entry/{entryId}/history/` - Manager's gameweek history
- `GET /entry/{entryId}/event/{eventId}/picks/` - Squad picks for a gameweek
- `GET /entry/{entryId}/transfers/` - All transfers made

### Leagues
- `GET /leagues-classic/{leagueId}/standings/` - Classic league standings
- `GET /leagues-h2h/{leagueId}/standings/` - Head-to-head league standings

### Events
- `GET /event/{eventId}/live/` - Live gameweek data
- `GET /dream-team/{eventId}/` - Dream team for a gameweek

## Usage

```bash
# Build the OpenAPI spec
omg build api.omg.md -o openapi.yaml

# Or with the CLI from the repo root
node packages/omg-md-cli/dist/cli.js build examples/fpl-api/api.omg.md -o fpl-openapi.yaml
```

## Notes

- The API has CORS restrictions - direct browser requests won't work
- Some endpoints require authentication (not documented here)
- Decimal values may be returned as strings
- The API structure may change between seasons

## Resources

- [FPL APIs Explained](https://www.oliverlooney.com/blogs/FPL-APIs-Explained)
- [Fantasy Premier League API Guide](https://www.game-change.co.uk/2023/02/10/a-complete-guide-to-the-fantasy-premier-league-fpl-api/)
- [fpl Python Library](https://fpl.readthedocs.io/)
