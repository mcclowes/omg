# CLAUDE.md - AI Assistant Guide for OMG

## Project Overview

**OMG (OpenAPI Markdown Grammar)** is a human-first domain-specific language for API specification. It compiles Markdown-based API definitions to OpenAPI 3.1, making API documentation accessible to technical writers while remaining useful for developers.

**Repository**: https://github.com/mcclowes/omg
**License**: MIT
**Status**: MVP Implementation phase

## Quick Start

```bash
# Install dependencies
npm ci

# Build all packages
npm run build

# Run tests
npm test

# Type check
npm run typecheck

# Format code
npm run format

# Check formatting
npm run format:check
```

## Codebase Structure

```
omg/
├── packages/                    # Monorepo packages (npm workspaces)
│   ├── omg-parser/             # omg-parser - Parses .omg.md files to AST
│   │   ├── src/
│   │   │   ├── document-parser.ts   # Main document parsing
│   │   │   ├── schema-parser.ts     # Schema/type parsing
│   │   │   ├── returns-parser.ts    # Returns block parsing
│   │   │   ├── resolver.ts          # Partial resolution, API loading
│   │   │   └── types.ts             # TypeScript type definitions
│   │   └── dist/                    # Compiled output
│   │
│   ├── omg-compiler/           # omg-compiler - Compiles AST to OpenAPI 3.1
│   │   ├── src/
│   │   │   ├── openapi.ts           # AST to OpenAPI transformation
│   │   │   └── output.ts            # Serialization (YAML/JSON)
│   │   └── dist/
│   │
│   ├── omg-importer/           # omg-importer - Import OpenAPI to OMG format
│   │   ├── src/
│   │   │   ├── importer.ts          # Main import logic
│   │   │   ├── generator.ts         # OMG file generation
│   │   │   ├── schema-converter.ts  # OpenAPI schema to OMG type conversion
│   │   │   └── pattern-detector.ts  # Detect common API patterns
│   │   └── dist/
│   │
│   ├── omg-linter/             # omg-linter - Linting for OMG files
│   │   ├── src/
│   │   │   └── index.ts             # Linting rules and utilities
│   │   └── dist/
│   │
│   ├── omg-lsp/                # omg-lsp - Language Server Protocol server
│   │   ├── src/
│   │   │   └── server.ts            # LSP server implementation
│   │   └── dist/
│   │
│   ├── omg-md-cli/             # omg-md-cli - Command-line interface (npm: omg-md-cli)
│   │   ├── src/
│   │   │   └── cli.ts               # Main CLI entry point
│   │   └── dist/
│   │
│   ├── omg-mock-server/        # omg-mock-server - Mock server generator
│   │   ├── src/
│   │   │   ├── index.ts             # Main exports
│   │   │   ├── mock-generator.ts    # Mock data generation from schemas
│   │   │   └── server.ts            # Express HTTP server
│   │   └── dist/
│   │
│   └── omg-vscode/             # VS Code extension for syntax highlighting
│       ├── syntaxes/              # TextMate grammar files
│       └── package.json           # Extension manifest
│
├── .claude/                    # Claude Code configuration
│   └── skills/                 # Claude Code skills
│
├── docusaurus/                 # Documentation site
│
└── Documentation files:
    ├── BEHAVIORS.md            # Behavioral extensions (state machines, events)
    ├── CHANGELOG.md            # Release history
    ├── LEGIBILITY.md           # Readability design decisions
    ├── TODO.md                 # Project roadmap
    └── README.md               # Project overview
```

## Key Concepts

### OMG File Format (`.omg.md`)

OMG files are Markdown with YAML frontmatter and special code blocks:

```markdown
---
method: GET
path: /accounts/{accountId}
operationId: get-account
tags: [Accounts]
---

# Get Account

Returns details of a specific account.

```omg.path
{
  accountId: string  // Unique account identifier
}
```

```omg.response
{
  id: string,
  name: string,
  balance: decimal
}
```

{{> responses/errors }}
```

### Code Block Types

| Block Type | Purpose |
|------------|---------|
| `omg.path` | Path parameters |
| `omg.query` | Query parameters |
| `omg.headers` | Header parameters |
| `omg.body` | Request body schema |
| `omg.response` | Default (200) response |
| `omg.response.{code}` | Specific status code response |
| `omg.returns` | Conditional responses with status codes |
| `omg.example` | Example data |
| `omg.type` | Reusable type definitions |
| `omg.errors` | Error response definitions |
| `omg.config` | Configuration block |
| `http` | Raw HTTP example |

### Partials System

Partials allow reuse via two syntaxes:
- `@params/company` - OMG-style (recommended)
- `{{> params/company }}` - Handlebars-style (also supported)
- Stored in `partials/` directories
- Resolved relative to the document

## Development Workflow

### Building

```bash
# Build all packages (respects dependency order)
npm run build

# Build specific package
npm run build --workspace=omg-parser

# Watch mode for development
npm run dev --workspace=omg-parser
```

### Testing

```bash
# Run all tests
npm test

# Run tests for specific package
npm test --workspace=omg-parser

# Type checking
npm run typecheck
```

### CLI Commands

```bash
# Initialize a new OMG project (creates example files)
node packages/omg-md-cli/dist/cli.js init my-api/

# Build OMG to OpenAPI
node packages/omg-md-cli/dist/cli.js build my-api/api.omg.md -o output.yaml

# Parse and inspect AST
node packages/omg-md-cli/dist/cli.js parse my-api/endpoints/health.omg.md

# Lint OMG files
node packages/omg-md-cli/dist/cli.js lint my-api/

# Format OMG files
node packages/omg-md-cli/dist/cli.js fmt my-api/ --write

# Check formatting
node packages/omg-md-cli/dist/cli.js fmt my-api/ --check

# Start mock server
node packages/omg-md-cli/dist/cli.js mock my-api/api.omg.md

# Mock server with options
node packages/omg-md-cli/dist/cli.js mock my-api/api.omg.md -p 8080 -b /api/v1 -w

# Compare API versions (requires oasdiff: https://github.com/oasdiff/oasdiff)
node packages/omg-md-cli/dist/cli.js diff v1/api.omg.md v2/api.omg.md

# Detect breaking changes
node packages/omg-md-cli/dist/cli.js breaking old.omg.md new.omg.md --fail-on-diff

# Generate changelog
node packages/omg-md-cli/dist/cli.js changelog v1/api.omg.md v2/api.omg.md

# Import OpenAPI to OMG format
node packages/omg-md-cli/dist/cli.js import openapi.yaml -o my-api/
```

## Code Conventions

### TypeScript

- Strict mode enabled
- ES modules (`"type": "module"`)
- Node 18+ target
- Vitest for testing
- Output to `dist/` directories

### Package Dependencies

```
omg-md-cli
  ├── omg-compiler
  │     └── omg-parser
  ├── omg-importer
  │     └── omg-parser
  ├── omg-linter
  └── omg-mock-server
        └── omg-parser

omg-lsp
  ├── omg-parser
  └── omg-linter
```

Packages use semver references (e.g., `^0.1.0`) for npm dependencies.

### Schema Type System

The parser represents types using discriminated unions:

```typescript
type OmgType =
  | OmgPrimitive     // string, integer, number, decimal, boolean, date, datetime, uuid, any
  | OmgObject        // { field: type }
  | OmgArray         // type[]
  | OmgEnum          // "a" | "b" | "c"
  | OmgUnion         // Type1 | Type2
  | OmgIntersection  // Type1 & Type2
  | OmgReference;    // Referenced type name
```

### Annotations

Schema fields support annotations:
- `@min(n)`, `@max(n)` - Numeric constraints
- `@minLength(n)`, `@maxLength(n)` - String constraints
- `@pattern("regex")` - String pattern
- `@format("email")` - Format hint
- `?` suffix - Optional field

## CI/CD

### Pre-commit Hooks

Husky is configured for pre-commit hooks in `.husky/`. The pre-commit hook runs:
1. `npm run format:check` - Verify code is formatted
2. `npm run typecheck` - TypeScript type checking
3. `npm run test` - Run all tests

## Important Files

| File | Purpose |
|------|---------|
| `package.json` | Root workspace config |
| `packages/*/package.json` | Package-specific configs |
| `packages/*/tsconfig.json` | TypeScript configuration |
| `.prettierrc` | Prettier configuration |
| `.prettierignore` | Files to ignore for formatting |
| `.spectral-omg.yaml` | Linting rules configuration |
| `.husky/pre-commit` | Pre-commit hook |

## When Making Changes

**IMPORTANT**: After implementing any changes, always update:
- `TODO.md` - Mark items complete, add new tasks
- `CLAUDE.md` - Update if architecture/commands/structure changed
- `docusaurus/docs/` - Update user-facing documentation
- `examples/` - Ensure examples still work and demonstrate new features

### Code Changes

1. **Parser changes** (`omg-parser`): Update `types.ts` for new AST nodes, then update `document-parser.ts` or `schema-parser.ts`

2. **New output features** (`omg-compiler`): Modify `openapi.ts` to handle new AST structures

3. **New CLI commands** (`omg-md-cli`): Add command in `cli.ts` using Commander.js

4. **New syntax features**: Implement in parser/compiler, update documentation as needed

5. **New linting rules**: Add to `omg-linter/src/index.ts` following the existing pattern

## Testing Changes

Always verify changes work end-to-end:

```bash
# Build first
npm run build

# Test parsing (use omg init to create test files if needed)
node packages/omg-md-cli/dist/cli.js parse <path-to-omg-file>

# Test full compilation
node packages/omg-md-cli/dist/cli.js build <path-to-api.omg.md> -o /tmp/test.yaml

# Validate output is valid OpenAPI
npx @apidevtools/swagger-cli validate /tmp/test.yaml
```

## Documentation Reference

- **BEHAVIORS.md**: Advanced features (state machines, webhooks, invariants)
- **LEGIBILITY.md**: Readability design decisions
- **TODO.md**: Project roadmap and open questions
- **CHANGELOG.md**: Release history

## Common Tasks

### Add a new primitive type

1. Add to `OmgPrimitive` type in `packages/omg-parser/src/types.ts`
2. Handle in `packages/omg-parser/src/schema-parser.ts`
3. Map to OpenAPI in `packages/omg-compiler/src/openapi.ts`

### Add a new code block type

1. Add to `OmgBlockType` in `packages/omg-parser/src/types.ts`
2. Parse in `packages/omg-parser/src/document-parser.ts`
3. Compile in `packages/omg-compiler/src/openapi.ts`

### Add a new CLI command

1. Add command definition in `packages/omg-md-cli/src/cli.ts`
2. Use Commander.js `.command()` API

## Skills

The `.claude/skills/openapi/` directory contains an OpenAPI expert skill for Claude Code. Use the `openapi` skill when working with OpenAPI specification details.
