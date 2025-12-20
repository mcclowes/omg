# omg-linter

Linter for OMG (OpenAPI Markdown Grammar) files. Validates OMG documents using Spectral-style rules.

## Installation

```bash
npm install omg-linter
```

## Usage

### Lint a document

```typescript
import { parseDocument, resolveDocument } from 'omg-parser';
import { lintDocument, summarizeLintResults } from 'omg-linter';

const content = `---
method: GET
path: /users
---

# Get Users
`;

const doc = parseDocument(content, 'get-users.omg.md');
const resolved = resolveDocument(doc, { basePath: '.' });

const results = lintDocument({ document: resolved });
const summary = summarizeLintResults('get-users.omg.md', results);

console.log(`Errors: ${summary.errors}`);
console.log(`Warnings: ${summary.warnings}`);
console.log(`Hints: ${summary.hints}`);
```

### Configure linting

```typescript
const results = lintDocument(
  { document: resolved },
  {
    configPath: '.spectral-omg.yaml',  // Custom config file
    rules: ['operation-operationId', 'operation-tags'],  // Specific rules
    severity: 'warn',  // Minimum severity: 'error' | 'warn' | 'hint'
  }
);
```

## API

### `lintDocument(context, options?): LintResult[]`

Lints a resolved OMG document.

**Options:**
- `configPath?: string` - Path to `.spectral-omg.yaml` config
- `rules?: string[]` - Specific rules to run
- `severity?: 'error' | 'warn' | 'hint'` - Minimum severity to report

### `summarizeLintResults(file, results): LintSummary`

Summarizes lint results for a file.

**Returns:**
```typescript
{
  errors: number,
  warnings: number,
  hints: number
}
```

## Built-in Rules

The linter includes 40+ rules covering:

### Front Matter
- `operation-operationId` - Operations must have operationId
- `operation-tags` - Operations should have tags
- `path-params` - Path parameters must be defined

### Naming Conventions
- `property-case` - Property names should be camelCase
- `path-casing` - Paths should use kebab-case

### Response Validation
- `response-2xx` - Operations should have success response
- `response-schema` - Responses should have schemas

### Best Practices
- `operation-description` - Operations should have descriptions
- `no-eval-in-description` - No script tags in descriptions

## Configuration

Create `.spectral-omg.yaml` in your project root:

```yaml
rules:
  operation-operationId: error
  operation-tags: warn
  property-case: off
```

## License

MIT
