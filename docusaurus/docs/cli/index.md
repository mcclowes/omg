---
sidebar_position: 1
---

# CLI Overview

The OMG CLI (`omg-cli`) provides commands for working with OMG files.

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
```

## Global Options

| Option | Description |
|--------|-------------|
| `--help` | Show help |
| `--version` | Show version |
