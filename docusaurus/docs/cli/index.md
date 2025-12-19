---
sidebar_position: 1
---

# CLI Overview

The OMG CLI (`omg-md-cli`) provides commands for working with OMG files.

## Installation

```bash
npm install -g omg-md-cli
```

Or use directly with npx:

```bash
npx omg-md-cli <command>
```

## Commands

| Command | Description |
|---------|-------------|
| [`init`](/docs/cli/init) | Initialize a new OMG project |
| [`build`](/docs/cli/build) | Compile OMG to OpenAPI |
| [`parse`](/docs/cli/parse) | Parse and inspect AST |
| [`lint`](/docs/cli/lint) | Lint OMG files |
| [`fmt`](/docs/cli/fmt) | Format OMG files |
| [`diff`](/docs/cli/change-management#diff) | Compare two API specifications |
| [`breaking`](/docs/cli/change-management#breaking) | Detect breaking changes |
| [`changelog`](/docs/cli/change-management#changelog) | Generate API changelog |

## Quick Reference

```bash
# Initialize a new project
omg init my-api

# Build to OpenAPI YAML
omg build api.omg.md -o openapi.yaml

# Build to JSON
omg build api.omg.md -o openapi.json -f json

# Parse and view AST
omg parse endpoint.omg.md

# Lint files
omg lint my-api/

# Format files
omg fmt my-api/ --write

# Compare API versions (requires oasdiff)
omg diff v1/api.omg.md v2/api.omg.md

# Detect breaking changes
omg breaking old.omg.md new.omg.md --fail-on-diff

# Generate changelog
omg changelog v1/api.omg.md v2/api.omg.md
```

## Global Options

| Option | Description |
|--------|-------------|
| `--help` | Show help |
| `--version` | Show version |
