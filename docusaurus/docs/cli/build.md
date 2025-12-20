---
sidebar_position: 2
description: Compile OMG files to OpenAPI 3.1 YAML or JSON output.
---

# Build

Compile OMG files to OpenAPI 3.1 specification.

## Usage

```bash
omg build <input> [options]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `input` | Path to root `.omg.md` file |

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `-o, --output <file>` | Output file path | stdout |
| `-f, --format <fmt>` | Output format: `yaml` or `json` | `yaml` |

## Examples

### Build to YAML

```bash
omg build api.omg.md -o openapi.yaml
```

### Build to JSON

```bash
omg build api.omg.md -o openapi.json -f json
```

### Output to stdout

```bash
omg build api.omg.md
```

### Validate output

```bash
omg build api.omg.md -o openapi.yaml
npx @apidevtools/swagger-cli validate openapi.yaml
```

## Input file structure

The build command expects a root OMG file that may include other files:

```markdown
---
title: My API
version: 1.0.0
---

# My API

API description here.

\{\{> endpoints/users \}\}
\{\{> endpoints/accounts \}\}
```

All referenced partials and endpoints are resolved and compiled into a single OpenAPI document.
