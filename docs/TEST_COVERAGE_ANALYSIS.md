# Test Coverage Analysis

This document analyzes the current test coverage of the OAL (OpenAPI Language) codebase and proposes areas for improvement.

## Current State

**Test Coverage: 0%**

Despite having Vitest configured as the testing framework, the codebase currently has **zero unit tests**. All test scripts use `--passWithNoTests` to allow builds to succeed without tests.

| Package | Source Files | Lines of Code | Test Files |
|---------|--------------|---------------|------------|
| `oal-parser` | 5 | ~800 | 0 |
| `oal-compiler` | 3 | ~700 | 0 |
| `oal-cli` | 2 | ~700 | 0 |
| `oal-linting-functions` | 9 | ~650 | 0 |
| **Total** | **19** | **~2,850** | **0** |

---

## Priority 1: Schema Parser (`oal-parser/src/schema-parser.ts`)

**Why it's critical:** This is the core parsing engine that converts OAL syntax to an AST. Bugs here propagate to all downstream functionality.

### Recommended Test Cases

#### Lexer Tests
```typescript
// Token recognition
- Single character tokens: { } [ ] ( ) : , | ? @
- String literals: "hello", 'world', escaped characters (\n, \t, \\, \")
- Numbers: integers (123), floats (1.23), negative (-5), scientific (1e10)
- Identifiers: simple (foo), camelCase (fooBar), with underscores (foo_bar)
- Keywords: true, false, null
- Comments: // inline comments
- Whitespace handling
```

#### Parser Tests
```typescript
// Primitive types
parseSchema('string')           // → { kind: 'primitive', type: 'string' }
parseSchema('integer')          // → { kind: 'primitive', type: 'integer' }
parseSchema('string?')          // → { kind: 'primitive', optional: true }
parseSchema('string | null')    // → { kind: 'primitive', nullable: true }

// Annotations
parseSchema('string @maxLength(100)')
parseSchema('integer @min(0) @max(100)')
parseSchema('string @pattern("[a-z]+")')

// Enums
parseSchema('"a" | "b" | "c"')
parseSchema('"active" | "archived" | null')

// Objects
parseSchema('{ name: string }')
parseSchema('{ id: integer, name?: string }')  // Optional property
parseSchema('{ user: { name: string } }')      // Nested objects

// Arrays
parseSchema('[string]')
parseSchema('[{ id: integer }]')

// Union types
parseSchema('string | integer')
parseSchema('User | Admin')

// References
parseSchema('Invoice')          // Custom type reference

// Error cases
parseSchema('{')                // Unclosed brace
parseSchema('{ name string }')  // Missing colon
parseSchema('{ name: }')        // Missing value
```

#### JSON Inference Tests
```typescript
inferSchemaFromJson("hello")           // → string
inferSchemaFromJson(42)                // → integer
inferSchemaFromJson(3.14)              // → number
inferSchemaFromJson(true)              // → boolean
inferSchemaFromJson(null)              // → nullable any
inferSchemaFromJson([1, 2, 3])         // → array of integers
inferSchemaFromJson({ a: 1, b: "x" })  // → object with properties
```

---

## Priority 2: OpenAPI Compiler (`oal-compiler/src/openapi.ts`)

**Why it's critical:** This transforms parsed OAL into valid OpenAPI 3.1 specs. Incorrect output makes the entire tool unusable.

### Recommended Test Cases

#### Primitive Compilation
```typescript
compilePrimitive({ kind: 'primitive', type: 'string' })   // → { type: 'string' }
compilePrimitive({ kind: 'primitive', type: 'date' })     // → { type: 'string', format: 'date' }
compilePrimitive({ kind: 'primitive', type: 'uuid' })     // → { type: 'string', format: 'uuid' }
compilePrimitive({ kind: 'primitive', type: 'decimal' })  // → { type: 'number', format: 'decimal' }
```

#### Annotation Application
```typescript
// Annotations should map to OpenAPI constraints
@min(0)        → minimum: 0
@max(100)      → maximum: 100
@minLength(1)  → minLength: 1
@maxLength(50) → maxLength: 50
@pattern(...)  → pattern: ...
@format(...)   → format: ...
```

#### Object Compilation
```typescript
// Required field detection
{ name: string }           // → required: ['name']
{ name?: string }          // → required: []
{ a: string, b?: integer } // → required: ['a']

// Nested object extraction (at depth > 2)
// Should create $ref to components/schemas
```

#### Endpoint Compilation
```typescript
// Full endpoint → OperationObject
- operationId mapping
- Parameter compilation (path, query, header)
- Request body handling
- Response code mapping with descriptions
- Tags, deprecated, summary
- x-follows, x-webhooks-resulting, x-webhooks-listen extensions
```

#### Schema Extraction
```typescript
// Deeply nested objects should be extracted to components
// Test recursion detection for self-referencing types
// Test proper $ref generation
```

---

## Priority 3: Document Parser (`oal-parser/src/document-parser.ts`)

**Why it's critical:** This parses `.oal.md` files and extracts frontmatter, blocks, and partials.

### Recommended Test Cases

#### Frontmatter Extraction
```typescript
// Valid YAML frontmatter
parseDocument(`---
method: GET
path: /users
---
# Title`)

// Empty frontmatter
parseDocument(`---
---
# Title`)

// No frontmatter
parseDocument(`# Title`)
```

#### Title Extraction
```typescript
// First H1 heading
parseDocument(`# My Title`)     // title: 'My Title'
parseDocument(`## Subheading`)  // title: null (no H1)
```

#### Code Block Extraction
```typescript
// HTTP blocks
```http
GET /users/{id}
```

// OAL blocks with various types
```oal.path
{ id: string }
```

```oal.response.200
{ data: [...] }
```

```oal.response.404
{ error: string }
```
```

#### Partial References
```typescript
// Extract {{> partials/path }}
parseDocument(`{{> errors }}`)  // partials: [{ path: 'errors' }]
parseDocument(`{{> types/user }}`)
```

#### HTTP Block Parsing
```typescript
parseHttpBlock('GET /users')       // { method: 'GET', path: '/users' }
parseHttpBlock('POST /users/{id}') // { method: 'POST', path: '/users/{id}' }
parseHttpBlock('invalid')          // null
```

---

## Priority 4: Resolver (`oal-parser/src/resolver.ts`)

### Recommended Test Cases

#### Partial Resolution
```typescript
// Load and inline partials
// Handle missing partials gracefully
// Detect circular references
```

#### Endpoint Building
```typescript
// Build ParsedEndpoint from ResolvedDocument
// Operation ID generation from method + path
// Parameter extraction (path, query, headers)
// Response collection by status code
```

#### Type Extraction
```typescript
// Extract type definitions from oal.type blocks
extractTypeName('type Invoice { ... }')  // 'Invoice'
extractTypeName('type User = {...}')     // 'User'
extractTypeName('invalid')               // null
```

---

## Priority 5: Linting Functions (`tools/oal-linting-functions/`)

Each linting rule should have comprehensive tests:

### `oal-type-valid.js`
```typescript
// Valid types
oalTypeValid('string')     // → []
oalTypeValid('integer')    // → []
oalTypeValid('Invoice')    // → [] (PascalCase = custom type)

// Invalid types
oalTypeValid('strng')      // → [{ message: "Unknown type 'strng'" }]
oalTypeValid('foo')        // → [{ message: "Unknown type 'foo'" }]

// Union types
oalTypeValid('string | null')  // → []
oalTypeValid('"a" | "b"')      // → []
```

### `oal-operationid-format.js`
```typescript
// Valid kebab-case
oalOperationIdFormat('get-users')     // → []
oalOperationIdFormat('create-invoice') // → []

// Invalid formats
oalOperationIdFormat('getUsers')      // → error
oalOperationIdFormat('Get-Users')     // → error
```

### `oal-property-casing.js`
```typescript
// Default: camelCase
oalPropertyCasing({ userId: 'string' })   // → []
oalPropertyCasing({ user_id: 'string' })  // → error

// With snake_case option
oalPropertyCasing({ user_id: 'string' }, { casing: 'snake_case' }) // → []
```

### `oal-path-parameter-defined.js`
```typescript
// All path params defined
validate('/users/{id}', { id: 'string' })  // → []

// Missing definition
validate('/users/{id}', {})  // → error

// Extra definitions (should warn)
validate('/users', { id: 'string' })  // → warning
```

---

## Priority 6: CLI Commands (`oal-cli/src/cli.ts`)

### Integration Tests

```typescript
// Build command
test('oal build api.oal.md outputs valid OpenAPI')
test('oal build with --output writes to file')
test('oal build with --format json outputs JSON')
test('oal build handles missing file gracefully')

// Parse command
test('oal parse shows document structure')
test('oal parse --json outputs JSON')

// Lint command
test('oal lint reports errors correctly')
test('oal lint --quiet suppresses success output')
test('oal lint --json outputs JSON')
test('oal lint exits with code 1 on errors')

// Init command
test('oal init creates directory structure')
test('oal init creates api.oal.md')
test('oal init creates example endpoint')
test('oal init is idempotent (doesn\'t overwrite)')
```

---

## Implementation Recommendations

### 1. Start with the Parser
The schema parser is the foundation. Without reliable parsing, nothing else works:
```
oal-parser/src/__tests__/
├── lexer.test.ts
├── parser.test.ts
├── document-parser.test.ts
└── resolver.test.ts
```

### 2. Add Test Fixtures
Create a `fixtures/` directory with sample `.oal.md` files for integration testing:
```
fixtures/
├── valid/
│   ├── simple-endpoint.oal.md
│   ├── with-partials.oal.md
│   └── full-api/
├── invalid/
│   ├── missing-frontmatter.oal.md
│   └── malformed-schema.oal.md
└── edge-cases/
    ├── empty-file.oal.md
    └── unicode-content.oal.md
```

### 3. Configure Coverage Reporting
Add to `vitest.config.ts`:
```typescript
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      thresholds: {
        lines: 80,
        branches: 70,
        functions: 80,
      }
    }
  }
})
```

### 4. Add Coverage to CI
Update `.github/workflows/ci.yml`:
```yaml
- name: Run tests with coverage
  run: npm test -- --coverage

- name: Upload coverage report
  uses: codecov/codecov-action@v4
```

### 5. Prioritized Implementation Order

| Priority | Component | Effort | Impact |
|----------|-----------|--------|--------|
| 1 | `schema-parser.ts` | High | Critical |
| 2 | `openapi.ts` | High | Critical |
| 3 | `document-parser.ts` | Medium | High |
| 4 | `resolver.ts` | Medium | High |
| 5 | Linting functions | Low (each) | Medium |
| 6 | CLI integration tests | Medium | Medium |

---

## Summary

The OAL codebase has **zero test coverage** but well-structured, testable code. The recommended approach is:

1. **Immediate**: Add unit tests for `schema-parser.ts` (lexer + parser)
2. **Short-term**: Add tests for `openapi.ts` compiler and `document-parser.ts`
3. **Medium-term**: Add tests for resolver and linting functions
4. **Ongoing**: CLI integration tests and fixture-based testing

Estimated effort to reach 80% coverage: 2-3 developer-weeks of focused work.
