---
sidebar_position: 9
description: Convert a local OpenAPI YAML or JSON document into an OMG project, with inline schemas and reusable partial options.
---

# Import

Convert an OpenAPI document into an OMG project. The input is a local YAML or JSON file with an `openapi` field.

## Usage

```bash
omg import <input> [options]
```

| Argument | Description                           |
| -------- | ------------------------------------- |
| `input`  | Path to the OpenAPI YAML or JSON file |

## Options

| Option                     | Default                    | Description                                                                  |
| -------------------------- | -------------------------- | ---------------------------------------------------------------------------- |
| `-o, --output <directory>` | Current working directory  | Directory for generated files                                                |
| `--inline`                 | Off                        | Inline referenced schemas instead of using named references                  |
| `--dry-run`                | Off                        | List the files that would be generated without writing them                  |
| `--no-partials`            | Partial extraction enabled | Keep repeated parameter and response definitions in endpoint files           |
| `--partial-threshold <n>`  | `3`                        | Minimum occurrences before a repeated definition is extracted into a partial |
| `-h, --help`               | —                          | Show command help                                                            |

## Examples

```bash
# Import into a separate directory
omg import openapi.yaml --output my-api/

# Preview conversion and output paths
omg import openapi.json --output my-api/ --dry-run

# Inline referenced schemas
omg import openapi.yaml --output my-api/ --inline

# Keep repeated definitions in endpoint files
omg import openapi.yaml --output my-api/ --no-partials

# Extract definitions repeated at least twice
omg import openapi.yaml --output my-api/ --partial-threshold 2
```

## Generated files

| Path                    | Contents                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| `api.omg.md`            | Root API definition                                                                        |
| `endpoints/**/*.omg.md` | Endpoint definitions                                                                       |
| `types/*.omg.md`        | Named schema definitions, when needed                                                      |
| `partials/**/*.omg.md`  | Extracted shared header/query parameters and repeated responses, when enabled and detected |

Generated files with existing names are overwritten. `--dry-run` performs conversion and lists output paths without creating directories or writing files. Conversion warnings are printed in both modes.

The generated files can be checked with [`omg lint`](./lint.md) and compiled with [`omg build`](./build.md):

```bash
omg lint my-api/
omg build my-api/api.omg.md --output openapi.yaml
```
