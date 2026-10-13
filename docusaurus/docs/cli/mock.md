---
sidebar_position: 10
description: Start an OMG mock server with configurable paths, delays, CORS, and seeded response generation.
---

# Mock

Start an HTTP mock server from an OMG API definition. Responses are generated from the endpoint schemas. The process stays running until stopped with Ctrl+C.

## Usage

```bash
omg mock <input> [options]
```

| Argument | Description                                                  |
| -------- | ------------------------------------------------------------ |
| `input`  | Path to the root API definition, such as `my-api/api.omg.md` |

## Options

| Option                   | Default                 | Description                                                                     |
| ------------------------ | ----------------------- | ------------------------------------------------------------------------------- |
| `-p, --port <port>`      | `3000`                  | Port to listen on                                                               |
| `-b, --base-path <path>` | No prefix               | Prefix endpoint paths, for example `/api/v1`                                    |
| `-d, --delay <ms>`       | `0`                     | Add a response delay in milliseconds                                            |
| `-s, --seed <seed>`      | Unset                   | Set the random seed; see the current determinism limitation below               |
| `--no-cors`              | CORS enabled            | Disable CORS response headers                                                   |
| `-q, --quiet`            | Request logging enabled | Disable request logs; startup messages still appear                             |
| `--simple`               | Vague generator         | Use the simple generator instead of Vague                                       |
| `-w, --watch`            | Off                     | Request automatic restarts after file changes; see the current limitation below |
| `-h, --help`             | —                       | Show command help                                                               |

## Examples

```bash
# Default server at http://localhost:3000
omg mock my-api/api.omg.md

# Prefix endpoint paths and seed generated responses
omg mock my-api/api.omg.md --port 8080 --base-path /api/v1 --seed 42

# Delayed responses without CORS headers or request logs
omg mock my-api/api.omg.md --delay 250 --no-cors --quiet

# Use the simple generator
omg mock my-api/api.omg.md --simple
```

The default Vague generator supports the [`@vague` annotation](../syntax/annotations.md#mock-data-vague), which supplies an expression for a field's mock value. `--simple` selects the alternative generator.

## Current limitations

### Watch mode

The current `--watch` implementation passes glob patterns to Chokidar 5, which no longer supports them. Edits to `.omg.md` files do not trigger a restart. Stop the server and rerun the command after editing the specification. The fix is tracked in [#133](https://github.com/mcclowes/omg/issues/133).

### Named response types

The default Vague generator can return `{"value": null}` for a named top-level response schema instead of the declared object. `--simple` preserves the object shape in this case. Importing an OpenAPI document with [`--inline`](./import.md) also avoids the named reference. This is tracked in [#134](https://github.com/mcclowes/omg/issues/134).

### Seeded Faker fields

The same `--seed` can produce different Faker-backed field values after a server restart, even when other generated values repeat. Complete response determinism in Vague mode is tracked in [#135](https://github.com/mcclowes/omg/issues/135).

For contract testing, see [`omg test`](./test.md). For static HTML output, see [`omg docs`](./docs.md).
