# omg-md-cli

Command-line interface for OMG (OpenAPI Markdown Grammar).

## Installation

```bash
npm install -g omg-md-cli
```

Or use via npx:

```bash
npx omg-md-cli build api.omg.md -o openapi.yaml
```

## Commands

### `omg init [directory]`

Initialize a new OMG project with example files.

```bash
omg init my-api/
```

Creates:
- `api.omg.md` - API root definition
- `endpoints/health.omg.md` - Example endpoint
- `partials/responses/errors.omg.md` - Standard errors

### `omg build <input>`

Compile OMG to OpenAPI.

```bash
# Output to file
omg build api.omg.md -o openapi.yaml

# Output to stdout
omg build api.omg.md

# Watch mode
omg build api.omg.md -o openapi.yaml --watch

# JSON output
omg build api.omg.md -o openapi.json
```

**Options:**
- `-o, --output <file>` - Output file
- `-f, --format <format>` - Output format: yaml or json
- `-w, --watch` - Watch for changes

### `omg parse <input>`

Parse an OMG file and show the AST (for debugging).

```bash
omg parse endpoints/get-user.omg.md
omg parse endpoints/get-user.omg.md --json
```

### `omg lint <input>`

Validate OMG files using Spectral-style rules.

```bash
# Lint a directory
omg lint my-api/

# Lint a single file
omg lint endpoints/get-user.omg.md

# Custom config
omg lint my-api/ -c .spectral-omg.yaml

# JSON output
omg lint my-api/ --json

# Only errors
omg lint my-api/ -s error
```

**Options:**
- `-c, --config <path>` - Config file path
- `-s, --severity <level>` - Minimum severity: error, warn, hint
- `-r, --rules <rules>` - Comma-separated rules to run
- `--json` - Output as JSON
- `-q, --quiet` - Only output on error

### `omg fmt <input>`

Format OMG files.

```bash
# Preview changes
omg fmt my-api/

# Write changes
omg fmt my-api/ --write

# Check formatting (for CI)
omg fmt my-api/ --check
```

**Options:**
- `-w, --write` - Write formatted output
- `--check` - Exit 1 if files need formatting
- `--indent <size>` - Indentation size (default: 2)

### `omg import <input>`

Import an OpenAPI specification to OMG format.

```bash
omg import openapi.yaml -o my-api/
omg import openapi.json -o my-api/ --dry-run
```

**Options:**
- `-o, --output <directory>` - Output directory
- `--inline` - Inline schemas instead of references
- `--dry-run` - Show what would be generated
- `--no-partials` - Disable partial extraction
- `--partial-threshold <n>` - Min occurrences for partial (default: 3)

### `omg diff <base> <revision>`

Compare two OMG API specifications.

```bash
omg diff v1/api.omg.md v2/api.omg.md
omg diff v1/api.omg.md v2/api.omg.md --format json
```

**Requires:** [oasdiff](https://github.com/oasdiff/oasdiff)

### `omg breaking <base> <revision>`

Detect breaking changes between API versions.

```bash
omg breaking v1/api.omg.md v2/api.omg.md
omg breaking v1/api.omg.md v2/api.omg.md --fail-on-diff
```

**Options:**
- `--fail-on-diff` - Exit 1 if breaking changes found (for CI)

**Requires:** [oasdiff](https://github.com/oasdiff/oasdiff)

### `omg changelog <base> <revision>`

Generate a changelog between API versions.

```bash
omg changelog v1/api.omg.md v2/api.omg.md
omg changelog v1/api.omg.md v2/api.omg.md -o CHANGELOG.html --format html
```

**Requires:** [oasdiff](https://github.com/oasdiff/oasdiff)

## Exit Codes

- `0` - Success
- `1` - Error (parse failure, lint errors, breaking changes)

## License

MIT
