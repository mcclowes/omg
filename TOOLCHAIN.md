# OMG Toolchain Requirements

This document outlines the tools needed to make OMG a production-ready specification language.

---

## Core Components

### 1. Parser & Compiler (`oal`)

The heart of OMG—a CLI tool that parses `.omg` files and compiles them to OpenAPI 3.1.

```
                    ┌──────────────┐
                    │   .omg files │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │    Lexer     │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │    Parser    │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │     AST      │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
       ┌──────────┐ ┌──────────┐ ┌──────────┐
       │ OpenAPI  │ │   Docs   │ │  Types   │
       │  Output  │ │ Generator│ │ Generator│
       └──────────┘ └──────────┘ └──────────┘
```

**Implementation Language:** TypeScript (for ecosystem compatibility)

**Key Commands:**

| Command | Description |
|---------|-------------|
| `oal build <input>` | Compile OMG to OpenAPI |
| `oal lint <input>` | Validate OMG syntax and conventions |
| `oal fmt <input>` | Format OMG files |
| `oal check <input>` | Type-check without output |

**Build Options:**

```bash
# Basic compilation
oal build api.omg --output openapi.yaml

# JSON output
oal build api.omg --output openapi.json --format json

# Bundle all imports into single file
oal build api.omg --bundle --output bundled.yaml

# Generate with examples
oal build api.omg --examples --count 3 --output openapi.yaml

# Watch mode for development
oal build api.omg --watch --output openapi.yaml
```

---

### 2. Language Server Protocol (LSP)

Real-time IDE support for editing OMG files.

**Features:**

- **Syntax highlighting** - Custom TextMate grammar
- **Autocomplete** - Type names, field names, annotations
- **Hover info** - Type definitions, documentation
- **Go to definition** - Jump to type/import definitions
- **Find references** - Where is this type used?
- **Rename symbol** - Refactor type/field names
- **Diagnostics** - Real-time error reporting
- **Code actions** - Quick fixes, extract type
- **Formatting** - On-save formatting

**Editor Support Priority:**

1. VS Code (primary)
2. JetBrains IDEs (via plugin)
3. Neovim/Vim (via LSP client)
4. Sublime Text
5. Emacs

---

### 3. Contract Testing Engine

Validate that a live API matches the OMG specification.

```bash
# Test all endpoints
oal test api.omg --against https://api.example.com --auth "Bearer $TOKEN"

# Test specific endpoint
oal test api.omg --endpoint "GET /accounts" --against https://api.example.com

# Test with environment file
oal test api.omg --env production.env --against https://api.example.com

# Generate JUnit report for CI
oal test api.omg --against https://api.example.com --report junit --output results.xml

# Verbose mode for debugging
oal test api.omg --against https://api.example.com --verbose
```

**What Gets Validated:**

| Check | Description |
|-------|-------------|
| Response structure | Fields match schema |
| Required fields | All required fields present |
| Field types | String is string, int is int, etc. |
| Enum values | Value is in allowed set |
| Array constraints | minItems, maxItems |
| String constraints | minLength, maxLength, pattern |
| Numeric constraints | min, max |
| Custom constraints | @constraint rules |
| Status codes | Expected codes are returned |

**Example Output:**

```
Running contract tests against https://api.xero.io...

✓ GET /companies/{companyId}/data/accounts
  ✓ Returns 200 with valid response
  ✓ Pagination fields present
  ✓ Account schema valid (42 results)

✓ GET /companies/{companyId}/data/accounts/{accountId}
  ✓ Returns 200 with valid response
  ✓ Returns 404 for unknown ID

✗ POST /companies/{companyId}/connections/{connectionId}/push/accounts
  ✗ Response missing required field: pushOperationKey
  ✗ Field 'status' has invalid enum value: 'InProgress' (expected: Pending|Success|Failed|TimedOut)

Tests: 2 passed, 1 failed
Time: 4.2s
```

---

### 4. Mock Server

Generate a mock server from OMG specification for development and testing.

```bash
# Start mock server
oal serve api.omg --port 3000

# With realistic example data
oal serve api.omg --port 3000 --examples

# With latency simulation
oal serve api.omg --port 3000 --latency 100-500

# Record mode (proxy to real API, record responses)
oal serve api.omg --port 3000 --proxy https://api.example.com --record
```

**Features:**

- Generate responses from schema + examples
- Respect Vague constraints for realistic data
- Simulate error responses
- Request validation against spec
- Latency simulation for testing
- Stateful mode for CRUD operations

---

### 5. Documentation Generator

Generate beautiful API documentation from OMG.

```bash
# Generate static site
oal docs api.omg --output ./docs

# Start documentation server
oal docs api.omg --serve --port 8080

# Generate for specific format
oal docs api.omg --theme redoc --output ./docs
oal docs api.omg --theme swagger-ui --output ./docs
oal docs api.omg --theme docusaurus --output ./docs
```

**Documentation includes:**

- Rendered Markdown descriptions
- Interactive API explorer
- Type documentation with examples
- Authentication guide
- Changelog (from git history)
- Search functionality

---

### 6. Migration Tool

Convert existing OpenAPI specs to OMG.

```bash
# Convert single file
oal import openapi.yaml --output api.omg

# Convert with splitting (recommended)
oal import openapi.yaml --output ./api/ --split

# Interactive mode with suggestions
oal import openapi.yaml --output ./api/ --interactive

# Preserve comments and organization
oal import openapi.yaml --output ./api/ --preserve-structure
```

**Conversion Features:**

- Detect and extract common patterns (pagination, errors)
- Generate default definitions
- Preserve descriptions and examples
- Suggest type extractions
- Handle `$ref` resolution
- Support for OpenAPI 3.0 and 3.1

---

## Vague Integration

OMG natively supports [Vague](https://github.com/mcclowes/vague) for rich example generation.

### Inline Vague Syntax

```oal
type Invoice {
  status: InvoiceStatus
  amount: decimal
  issueDate: date

  examples generate {
    status: 0.6: "Paid" | 0.3: "Sent" | 0.1: "Draft"
    amount: decimal in 100..10000 @lognormal
    issueDate: date in daysAgo(90)..now()
  }
}
```

### External Vague Files

```oal
// Reference external .vague file
examples from "./examples/invoices.vague"
```

### CLI Integration

```bash
# Generate examples from Vague definitions
oal examples api.omg --count 100 --output examples.json

# Seed for reproducibility
oal examples api.omg --count 100 --seed 42 --output examples.json

# Generate and inject into OpenAPI
oal build api.omg --examples --count 3 --output openapi.yaml
```

---

## CI/CD Integration

### GitHub Actions

```yaml
name: API Specification

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install OMG
        run: npm install -g @omg/cli

      - name: Lint OMG
        run: oal lint api.omg

      - name: Build OpenAPI
        run: oal build api.omg --output openapi.yaml

      - name: Upload OpenAPI artifact
        uses: actions/upload-artifact@v4
        with:
          name: openapi
          path: openapi.yaml

  contract-test:
    runs-on: ubuntu-latest
    needs: validate
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4

      - name: Install OMG
        run: npm install -g @omg/cli

      - name: Run Contract Tests
        run: oal test api.omg --against ${{ secrets.API_URL }} --auth "Bearer ${{ secrets.API_KEY }}" --report junit --output results.xml

      - name: Publish Test Results
        uses: dorny/test-reporter@v1
        with:
          name: Contract Tests
          path: results.xml
          reporter: java-junit
```

### Pre-commit Hook

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/oal/pre-commit-hooks
    rev: v1.0.0
    hooks:
      - id: omg-lint
      - id: omg-fmt
```

---

## NPM Packages

| Package | Description |
|---------|-------------|
| `@omg/cli` | Command-line interface |
| `@omg/parser` | Parser and AST library |
| `@omg/compiler` | OpenAPI compiler |
| `@omg/lsp` | Language server |
| `@omg/vscode` | VS Code extension |
| `@omg/test` | Contract testing library |
| `@omg/mock` | Mock server |
| `@omg/docs` | Documentation generator |

---

## Development Roadmap

### Phase 1: Core (MVP)
- [ ] Lexer and parser
- [ ] AST representation
- [ ] OpenAPI 3.1 compiler
- [ ] Basic CLI (`build`, `lint`)
- [ ] VS Code syntax highlighting

### Phase 2: Developer Experience
- [ ] LSP server
- [ ] VS Code extension (full)
- [ ] `oal fmt` formatting
- [ ] Watch mode
- [ ] Error messages with suggestions

### Phase 3: Testing & Mocking
- [ ] Contract testing engine
- [ ] Mock server
- [ ] Vague integration
- [ ] Example generation

### Phase 4: Migration & Ecosystem
- [ ] OpenAPI → OMG converter
- [ ] Documentation generator
- [ ] GitHub Actions
- [ ] JetBrains plugin

### Phase 5: Advanced Features
- [ ] SDK generation hooks
- [ ] Custom linting rules
- [ ] Plugins system
- [ ] Cloud service (hosted docs/testing)

---

## Technical Specifications

### Parser Technology

**Option A: PEG.js / Peggy**
- Pros: Easy grammar definition, good error messages
- Cons: Performance for large files

**Option B: Tree-sitter**
- Pros: Incremental parsing, editor integration
- Cons: C dependency, steeper learning curve

**Option C: Hand-written recursive descent**
- Pros: Full control, best error recovery
- Cons: More code to maintain

**Recommendation:** Start with Peggy for rapid iteration, consider Tree-sitter for LSP performance.

### AST Design

```typescript
interface Document {
  kind: 'Document'
  header: Header
  imports: Import[]
  declarations: Declaration[]
}

interface TypeDeclaration {
  kind: 'TypeDeclaration'
  name: string
  description?: MarkdownBlock
  typeParameters?: TypeParameter[]
  body: TypeExpression | ObjectType
  annotations: Annotation[]
}

interface EndpointDeclaration {
  kind: 'EndpointDeclaration'
  name: string
  method: HttpMethod
  path: string
  description?: MarkdownBlock
  parameters: ParameterBlock[]
  body?: BodyBlock
  returns: ReturnsBlock
  annotations: Annotation[]
}
```

### Output Formats

| Format | Use Case |
|--------|----------|
| OpenAPI 3.1 YAML | Primary output, human-readable |
| OpenAPI 3.1 JSON | Programmatic consumption |
| JSON Schema | Schema-only extraction |
| TypeScript types | Client type generation |
| Markdown | Documentation fragments |
