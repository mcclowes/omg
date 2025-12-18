# CLAUDE.md - AI Assistant Guide for OMG

## Project Overview

**OMG (OpenAPI Markdown Grammar)** is a human-first domain-specific language for API specification. It compiles Markdown-based API definitions to OpenAPI 3.1, making API documentation accessible to technical writers while remaining useful for developers.

**Repository**: https://github.com/mcclowes/oal
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
```

## Codebase Structure

```
oal/
├── packages/                    # Monorepo packages (npm workspaces)
│   ├── omg-parser/             # @omg/parser - Parses .omg.md files to AST
│   │   ├── src/
│   │   │   ├── document-parser.ts   # Main document parsing
│   │   │   ├── schema-parser.ts     # Schema/type parsing
│   │   │   ├── resolver.ts          # Partial resolution, API loading
│   │   │   └── types.ts             # TypeScript type definitions
│   │   └── dist/                    # Compiled output
│   │
│   ├── omg-compiler/           # @omg/compiler - Compiles AST to OpenAPI 3.1
│   │   ├── src/
│   │   │   ├── openapi.ts           # AST to OpenAPI transformation
│   │   │   └── output.ts            # Serialization (YAML/JSON)
│   │   └── dist/
│   │
│   └── omg-cli/                # @omg/cli - Command-line interface
│       ├── src/
│       │   ├── cli.ts               # Main CLI entry point
│       │   └── linter.ts            # Spectral-style linting rules
│       └── dist/
│
├── examples/                   # Example OMG projects
│   └── omg-test/              # Test API example
│       ├── api.omg.md             # API root definition
│       ├── endpoints/             # Endpoint definitions
│       └── partials/              # Reusable partials (params, responses)
│
├── .claude/                    # Claude Code configuration
│   └── skills/openapi/         # OpenAPI expert skill
│
├── .github/workflows/          # CI/CD
│   ├── ci.yml                     # Build, test, typecheck
│   └── release.yml                # Release automation
│
└── Documentation files:
    ├── DESIGN.md               # Language philosophy and goals
    ├── SYNTAX.md               # Formal syntax specification
    ├── BEHAVIORS.md            # Behavioral extensions (state machines, events)
    ├── TODO.md                 # Project roadmap
    ├── COMPARISON.md           # Comparison with OpenAPI
    ├── TOOLCHAIN.md            # Tooling roadmap
    └── LEGIBILITY.md           # Readability design decisions
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
| `omg.body` | Request body schema |
| `omg.response` | Default (200) response |
| `omg.response.{code}` | Specific status code response |
| `omg.example` | Example data |

### Partials System

Partials allow reuse via Handlebars-style includes:
- `{{> params/company }}` - Include a partial
- Stored in `partials/` directories
- Resolved relative to the document

## Development Workflow

### Building

```bash
# Build all packages (respects dependency order)
npm run build

# Build specific package
npm run build --workspace=@omg/parser

# Watch mode for development
npm run dev --workspace=@omg/parser
```

### Testing

```bash
# Run all tests
npm test

# Run tests for specific package
npm test --workspace=@omg/parser

# Type checking
npm run typecheck
```

### CLI Commands

```bash
# Build OMG to OpenAPI
node packages/omg-cli/dist/cli.js build examples/omg-test/api.omg.md -o output.yaml

# Parse and inspect AST
node packages/omg-cli/dist/cli.js parse examples/omg-test/endpoints/accounts-list.omg.md

# Lint OMG files
node packages/omg-cli/dist/cli.js lint examples/omg-test/

# Initialize new project
node packages/omg-cli/dist/cli.js init my-api/
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
@omg/cli
  └── @omg/compiler
        └── @omg/parser
```

Packages use `file:` references for local dependencies during development.

### Schema Type System

The parser represents types using discriminated unions:

```typescript
type OmgType =
  | OmgPrimitive   // string, integer, decimal, boolean, datetime, etc.
  | OmgObject      // { field: type }
  | OmgArray       // type[]
  | OmgEnum        // "a" | "b" | "c"
  | OmgUnion       // Type1 | Type2
  | OmgReference;  // Referenced type name
```

### Annotations

Schema fields support annotations:
- `@min(n)`, `@max(n)` - Numeric constraints
- `@minLength(n)`, `@maxLength(n)` - String constraints
- `@pattern("regex")` - String pattern
- `@format("email")` - Format hint
- `?` suffix - Optional field

## CI/CD

### GitHub Actions

Tests run on Node 18, 20, and 22. The CI pipeline:
1. Installs dependencies (`npm ci`)
2. Builds all packages (`npm run build`)
3. Runs tests (`npm test`)
4. Type checks (`npm run typecheck`)
5. Integration tests (CLI commands on example files)
6. Validates generated OpenAPI with swagger-cli

### Pre-commit Hooks

Husky is configured for pre-commit hooks in `.husky/`.

## Important Files

| File | Purpose |
|------|---------|
| `package.json` | Root workspace config |
| `packages/*/package.json` | Package-specific configs |
| `packages/*/tsconfig.json` | TypeScript configuration |
| `.spectral-omg.yaml` | Linting rules configuration |
| `.husky/pre-commit` | Pre-commit hook |

## When Making Changes

1. **Parser changes** (`@omg/parser`): Update `types.ts` for new AST nodes, then update `document-parser.ts` or `schema-parser.ts`

2. **New output features** (`@omg/compiler`): Modify `openapi.ts` to handle new AST structures

3. **New CLI commands** (`@omg/cli`): Add command in `cli.ts` using Commander.js

4. **New syntax features**: Update `SYNTAX.md` documentation, then implement in parser/compiler

5. **New linting rules**: Add to `linter.ts` following the existing pattern

## Testing Changes

Always verify changes work end-to-end:

```bash
# Build first
npm run build

# Test parsing
node packages/omg-cli/dist/cli.js parse examples/omg-test/endpoints/accounts-list.omg.md

# Test full compilation
node packages/omg-cli/dist/cli.js build examples/omg-test/api.omg.md -o /tmp/test.yaml

# Validate output is valid OpenAPI
npx @apidevtools/swagger-cli validate /tmp/test.yaml
```

## Documentation Reference

- **DESIGN.md**: Language philosophy, why OMG exists, design principles
- **SYNTAX.md**: Complete syntax specification with BNF grammar
- **BEHAVIORS.md**: Advanced features (state machines, webhooks, invariants)
- **TODO.md**: Project roadmap and open questions
- **COMPARISON.md**: Side-by-side comparison with raw OpenAPI

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

1. Add command definition in `packages/omg-cli/src/cli.ts`
2. Use Commander.js `.command()` API
3. Add integration test in `.github/workflows/ci.yml`

## Skills

The `.claude/skills/openapi/` directory contains an OpenAPI expert skill for Claude Code. Use the `openapi` skill when working with OpenAPI specification details.
