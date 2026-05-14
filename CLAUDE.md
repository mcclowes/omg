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
│   │   │   ├── index.ts             # Package exports
│   │   │   ├── document-parser.ts   # Main document parsing
│   │   │   ├── schema-parser.ts     # Schema/type parsing
│   │   │   ├── returns-parser.ts    # Returns block parsing
│   │   │   ├── resolver.ts          # Partial resolution, API loading
│   │   │   ├── formatter.ts         # Code formatting utilities
│   │   │   ├── type-index.ts        # Type indexing and lookup
│   │   │   ├── type-serializer.ts   # Type serialization utilities
│   │   │   └── types.ts             # TypeScript type definitions
│   │   └── dist/                    # Compiled output
│   │
│   ├── omg-compiler/           # omg-compiler - Compiles AST to OpenAPI 3.1
│   │   ├── src/
│   │   │   ├── index.ts             # Package exports
│   │   │   ├── openapi.ts           # AST to OpenAPI transformation
│   │   │   └── output.ts            # Serialization (YAML/JSON)
│   │   └── dist/
│   │
│   ├── omg-importer/           # private/internal - bundled into omg-md-cli at publish time
│   │   ├── src/
│   │   │   ├── index.ts             # Package exports
│   │   │   ├── importer.ts          # Main import logic
│   │   │   ├── generator.ts         # OMG file generation
│   │   │   ├── schema-converter.ts  # OpenAPI schema to OMG type conversion
│   │   │   ├── pattern-detector.ts  # Detect common API patterns
│   │   │   ├── partial-generator.ts # Generate partial files for reuse
│   │   │   └── types.ts             # TypeScript type definitions
│   │   └── dist/
│   │
│   ├── omg-linter/             # private/internal - bundled into omg-md-cli and omg-lsp at publish time
│   │   ├── src/
│   │   │   ├── index.ts             # Package exports
│   │   │   └── linter.ts            # Linting rules and utilities
│   │   └── dist/
│   │
│   ├── omg-lsp/                # omg-lsp - Language Server Protocol server
│   │   ├── src/
│   │   │   ├── index.ts             # Package exports
│   │   │   └── server.ts            # LSP server implementation
│   │   └── dist/
│   │
│   ├── omg-md-cli/             # omg-md-cli - Command-line interface (npm: omg-md-cli, binary: omg)
│   │   ├── src/
│   │   │   ├── cli.ts               # Entry point (registers commands)
│   │   │   ├── index.ts             # Package exports
│   │   │   └── commands/            # One file per command (build, parse, lint, fmt, init, import, mock, diff, breaking, changelog) + shared utils.ts
│   │   ├── build.mjs                # esbuild config for bundling private workspace deps
│   │   └── dist/
│   │
│   ├── omg-mock-server/        # private/internal - bundled into omg-md-cli at publish time
│   │   ├── src/
│   │   │   ├── index.ts             # Main exports
│   │   │   ├── mock-generator.ts    # Mock data generation from schemas
│   │   │   ├── vague-generator.ts   # Vague-based data generation
│   │   │   └── server.ts            # Express HTTP server
│   │   └── dist/
│   │
│   └── omg-vscode/             # VS Code extension for syntax highlighting + LSP client
│       ├── src/extension.ts         # Extension entry point
│       ├── syntaxes/                # TextMate grammar files (omg, omg-md, omg-codeblock)
│       ├── snippets/                # Snippet definitions
│       ├── language-configuration*.json  # Language configuration
│       └── package.json             # Extension manifest
│
├── .claude/                    # Claude Code configuration
│   └── skills/                 # Claude Code skills (see "Skills" section below)
│
├── docusaurus/                 # Hosted documentation site (Docusaurus)
├── examples/                   # Example OMG projects (fpl-api, mcp, payments-api, pokeapi, todo-api, xero)
├── docs/                       # Internal engineering notes (e.g. TEST_COVERAGE_ANALYSIS.md)
├── tools/                      # Standalone tooling (e.g. omg-linting-functions)
│
└── Documentation files:        # Top-level project docs (see "Documentation Reference" for full list)
    ├── README.md
    ├── CHANGELOG.md
    ├── DESIGN.md
    ├── SYNTAX.md
    └── ... (BEHAVIORS, COMPARISON, TOOLCHAIN, IMPORTS, LEGIBILITY, MCP-OMG, CONTRIBUTING)
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

Published to npm:

```
omg-md-cli
  ├── omg-compiler
  │     └── omg-parser
  └── omg-parser

omg-lsp
  └── omg-parser
```

Private workspace packages, bundled into the published ones at build time via `esbuild` (see `packages/*/build.mjs`):

```
omg-linter      → bundled into omg-md-cli and omg-lsp
omg-importer    → bundled into omg-md-cli
omg-mock-server → bundled into omg-md-cli
```

Packages use semver references (e.g., `^0.4.2`) for npm dependencies — all published packages currently share a single version line, bumped together at release time.

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
- `CHANGELOG.md` - Add user-visible changes under `[Unreleased]` using Keep a Changelog sections (Added / Changed / Fixed / Removed / Deprecated). On release, move entries under a new version heading.
- `CLAUDE.md` - Update if architecture/commands/structure changed
- `docusaurus/docs/` - Update user-facing documentation
- `examples/` - Ensure examples still work and demonstrate new features

Work is tracked in [GitHub issues](https://github.com/mcclowes/omg/issues), not in a TODO file. Open a new issue for new tasks; reference issues with `Fixes #N` in PR bodies.

### Code Changes

1. **Parser changes** (`omg-parser`): Update `types.ts` for new AST nodes, then update `document-parser.ts` or `schema-parser.ts`

2. **New output features** (`omg-compiler`): Modify `openapi.ts` to handle new AST structures

3. **New CLI commands** (`omg-md-cli`): Add `packages/omg-md-cli/src/commands/<name>.ts` exporting `register<Name>Command`, export it from `commands/index.ts`, and register it in `cli.ts` (see the "Add a new CLI command" section below)

4. **New syntax features**: Implement in parser/compiler, update documentation as needed

5. **New linting rules**: Add to `omg-linter/src/linter.ts` (rules and built-in rule list); `index.ts` only re-exports the public API

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

- **README.md**: Project overview and quick start
- **DESIGN.md**: Vision, problem statement, and design principles
- **SYNTAX.md**: Complete syntax reference
- **COMPARISON.md**: OMG vs OpenAPI comparison
- **TOOLCHAIN.md**: Compiler and tooling architecture
- **BEHAVIORS.md**: Advanced features (state machines, webhooks, invariants)
- **LEGIBILITY.md**: Readability design decisions
- **IMPORTS.md**: Partial/import resolution
- **MCP-OMG.md**: MCP server integration notes
- **CONTRIBUTING.md**: Contribution guide
- **CHANGELOG.md**: Release history (keep `[Unreleased]` current with every user-visible change)
- **docusaurus/**: Hosted documentation site (run `npm run docs:dev`)

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

1. Create a new file `packages/omg-md-cli/src/commands/<name>.ts` exporting `register<Name>Command(program)` using Commander.js `.command()` API
2. Export it from `packages/omg-md-cli/src/commands/index.ts`
3. Register it in `packages/omg-md-cli/src/cli.ts`

## Skills

The `.claude/skills/` directory contains multiple Claude Code skills:
- `openapi` - OpenAPI specification expertise
- `omg` - OMG syntax and usage
- `vague` - Vague constraint-based data generation
- `vague-plugin-faker` - Faker generators for Vague
- `vitest` - Vitest testing framework
- `commander` - Commander.js CLI framework
- `lsp` - Language Server Protocol implementation
- `textmate-grammar` - TextMate grammar for syntax highlighting
- `peggy` - PEG grammar parsing
- `npm-workspaces` - npm workspaces monorepo management
- `json-schema` - JSON Schema specification
- `commonmark` - CommonMark Markdown specification
- `github-actions` - GitHub Actions CI/CD
- `google-style-guide` - Google technical documentation style
- `docusaurus-*` - Various Docusaurus documentation skills
