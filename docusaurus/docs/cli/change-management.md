---
sidebar_position: 6
description: Compare API versions, detect breaking changes, and generate changelogs using oasdiff.
---

# Change management

OMG provides commands for comparing API versions, detecting breaking changes, and generating changelogs. These commands are powered by [oasdiff](https://github.com/oasdiff/oasdiff), a comprehensive OpenAPI comparison tool.

## Prerequisites

These commands require `oasdiff` to be installed separately:

```bash
# macOS (Homebrew)
brew install oasdiff

# Go
go install github.com/oasdiff/oasdiff@latest

# Shell script
curl -fsSL https://raw.githubusercontent.com/oasdiff/oasdiff/main/install.sh | sh
```

For more installation options, see the [oasdiff documentation](https://github.com/oasdiff/oasdiff).

---

## diff

Compare two OMG API specifications and show all differences.

### Usage

```bash
omg diff <base> <revision> [options]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `base` | Path to the base (older) `.omg.md` file |
| `revision` | Path to the revision (newer) `.omg.md` file |

### Options

| Option | Description | Default |
|--------|-------------|---------|
| `-f, --format <fmt>` | Output format: `text`, `yaml`, `json`, `html` | `text` |
| `-o, --output <file>` | Write output to file | stdout |

### Examples

```bash
# Compare two API versions
omg diff v1/api.omg.md v2/api.omg.md

# Output as JSON
omg diff old.omg.md new.omg.md --format json

# Save HTML report
omg diff base.omg.md head.omg.md -o diff.html --format html
```

---

## breaking

Detect breaking changes between two OMG API specifications.

### Usage

```bash
omg breaking <base> <revision> [options]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `base` | Path to the base (older) `.omg.md` file |
| `revision` | Path to the revision (newer) `.omg.md` file |

### Options

| Option | Description | Default |
|--------|-------------|---------|
| `-f, --format <fmt>` | Output format: `text`, `yaml`, `json`, `html` | `text` |
| `-o, --output <file>` | Write output to file | stdout |
| `--fail-on-diff` | Exit with code 1 if breaking changes found | false |

### Breaking changes detected

The command detects over 250 types of breaking changes, including:

- **Endpoint removal** - Existing endpoints that were deleted
- **Required parameter added** - New mandatory request parameters
- **Response field removed** - Fields removed from response bodies
- **Type changes** - Incompatible type modifications (e.g., `string` to `integer`)
- **Enum value removal** - Removing valid enum options
- **Constraint tightening** - Making validations stricter (e.g., shorter max length)
- **Nullable to required** - Changing optional fields to required

### Examples

```bash
# Check for breaking changes
omg breaking v1/api.omg.md v2/api.omg.md

# Fail CI if breaking changes found
omg breaking old.omg.md new.omg.md --fail-on-diff

# Output as JSON for parsing
omg breaking base.omg.md head.omg.md --format json
```

### CI/CD integration

Use the `--fail-on-diff` flag in your CI pipeline:

```yaml
# GitHub Actions example
- name: Check for breaking changes
  run: npx omg-md-cli breaking main-api.omg.md pr-api.omg.md --fail-on-diff
```

You can also use the [oasdiff GitHub Action](https://github.com/oasdiff/oasdiff-action) directly on compiled OpenAPI specs.

---

## changelog

Generate a changelog between two OMG API specifications.

### Usage

```bash
omg changelog <base> <revision> [options]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `base` | Path to the base (older) `.omg.md` file |
| `revision` | Path to the revision (newer) `.omg.md` file |

### Options

| Option | Description | Default |
|--------|-------------|---------|
| `-f, --format <fmt>` | Output format: `text`, `yaml`, `json`, `html` | `text` |
| `-o, --output <file>` | Write output to file | stdout |

### Changelog contents

The generated changelog includes:

- **Breaking changes** - Clearly marked as breaking
- **New endpoints** - Added API operations
- **Modified parameters** - Changed request parameters
- **Response changes** - Updated response schemas
- **Deprecations** - Newly deprecated endpoints
- **Documentation changes** - Updated descriptions

### Examples

```bash
# Generate changelog to stdout
omg changelog v1/api.omg.md v2/api.omg.md

# Save as HTML for documentation
omg changelog old.omg.md new.omg.md --format html -o CHANGELOG.html

# JSON for programmatic use
omg changelog base.omg.md head.omg.md --format json -o changes.json
```

---

## How it works

These commands work by:

1. **Compiling** both OMG specifications to OpenAPI 3.1
2. **Running oasdiff** on the compiled OpenAPI specs
3. **Returning** the results with proper formatting

This approach leverages the robust [oasdiff](https://github.com/oasdiff/oasdiff) engine (250+ checks) while maintaining the OMG workflow.

## Further reading

- [oasdiff Documentation](https://github.com/oasdiff/oasdiff)
- [oasdiff Breaking Changes Reference](https://github.com/oasdiff/oasdiff/blob/main/docs/BREAKING-CHANGES.md)
- [oasdiff GitHub Action](https://github.com/oasdiff/oasdiff-action)
