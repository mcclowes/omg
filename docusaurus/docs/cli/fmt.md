---
sidebar_position: 5
---

# fmt

Format OMG files for consistent style.

## Usage

```bash
npx omg fmt <path> [options]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `path` | File or directory to format |

## Options

| Option | Description |
|--------|-------------|
| `-w, --write` | Write formatted output back to file(s) |
| `--check` | Check if files are formatted (exit 1 if not) |
| `--indent <size>` | Indentation size (default: 2) |

## Examples

### Preview formatting

```bash
npx omg fmt my-api/
```

Outputs the formatted content to stdout without modifying files.

### Format files in place

```bash
npx omg fmt my-api/ --write
```

### Check formatting in CI

```bash
npx omg fmt my-api/ --check
```

Returns exit code 1 if any files need formatting.

### Format a single file

```bash
npx omg fmt my-api/endpoints/get-user.omg.md -w
```

### Custom indentation

```bash
npx omg fmt my-api/ -w --indent 4
```

## What gets formatted

The formatter normalizes:

- **YAML frontmatter**: Consistent key ordering and formatting
- **OMG schema blocks**: Consistent indentation and line breaks
- **JSON example blocks**: Pretty-printed with consistent indentation

Markdown prose and other code blocks are preserved as-is.

## Frontmatter key order

Frontmatter keys are sorted in this order:

1. `method`
2. `path`
3. `operationId`
4. `tags`
5. `summary`
6. `deprecated`
7. `auth`
8. `follows`
9. `webhooks`
10. Other keys (alphabetically)

## Exit Codes

| Code | Description |
|------|-------------|
| 0 | All files formatted (or already formatted with `--check`) |
| 1 | Files need formatting (with `--check`) or error occurred |

## CI Integration

Add to your CI pipeline to enforce consistent formatting:

```yaml
- name: Check formatting
  run: npx omg fmt . --check
```
