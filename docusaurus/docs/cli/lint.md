---
sidebar_position: 4
---

# lint

Lint OMG files for style and correctness issues.

## Usage

```bash
npx omg lint <path>
```

## Arguments

| Argument | Description |
|----------|-------------|
| `path` | File or directory to lint |

## Examples

### Lint a directory

```bash
npx omg lint my-api/
```

### Lint a single file

```bash
npx omg lint my-api/endpoints/get-user.omg.md
```

## Rules

The linter checks for:

- Missing required frontmatter fields
- Invalid HTTP methods
- Malformed code blocks
- Type syntax errors
- Unresolved partial references
- Inconsistent naming conventions

## Output

```
my-api/endpoints/get-user.omg.md
  3:1  error  Missing operationId in frontmatter
  15:1 warning  Response schema should have description

my-api/endpoints/list-users.omg.md
  8:1  error  Unknown block type: omg.params

2 files checked, 2 errors, 1 warning
```

## Exit Codes

| Code | Description |
|------|-------------|
| 0 | No errors |
| 1 | Errors found |

## Configuration

Linting rules can be configured in `.spectral-omg.yaml`:

```yaml
extends: [[spectral:oas, off]]
rules:
  omg-operationId-required: error
  omg-description-recommended: warn
```
