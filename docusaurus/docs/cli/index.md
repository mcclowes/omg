---
sidebar_position: 1
---

# CLI Overview

The OMG CLI (`@omg/cli`) provides commands for working with OMG files.

## Installation

```bash
# From the repository
npm install
npm run build

# Then use via npx
npx omg <command>
```

## Commands

| Command | Description |
|---------|-------------|
| [`init`](/docs/cli/init) | Initialize a new OMG project |
| [`build`](/docs/cli/build) | Compile OMG to OpenAPI |
| [`parse`](/docs/cli/parse) | Parse and inspect AST |
| [`lint`](/docs/cli/lint) | Lint OMG files |

## Quick Reference

```bash
# Initialize a new project
npx omg init my-api

# Build to OpenAPI YAML
npx omg build api.omg.md -o openapi.yaml

# Build to JSON
npx omg build api.omg.md -o openapi.json -f json

# Parse and view AST
npx omg parse endpoint.omg.md

# Lint files
npx omg lint my-api/
```

## Global Options

| Option | Description |
|--------|-------------|
| `--help` | Show help |
| `--version` | Show version |
