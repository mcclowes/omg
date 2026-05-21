---
sidebar_position: 7
description: Run contract tests that validate a live API against its OMG specification.
---

# Test

Run contract tests against a live API. `omg test` compiles your OMG spec, sends a
request to every endpoint, and checks that the responses match what the spec
declares.

```bash
omg test <input> --against <url> [options]
```

## What it checks

For each endpoint in the spec, `omg test`:

1. **Builds a request** — substitutes path, query, and header parameters from
   `--env` values, declared examples, or generated placeholders. Endpoints whose
   required parameters cannot be resolved are reported as **skipped** rather than
   failed.
2. **Sends it** to the `--against` base URL (with retries on network failure).
3. **Validates the status code** against the declared responses.
4. **Validates the response body** against the declared schema using JSON Schema
   (`ajv`), including `#/components/schemas` `$ref` resolution.

The command exits with a non-zero status if any test fails, so it can gate CI.

## Examples

```bash
# Test every endpoint against a running API
omg test api.omg.md --against https://api.example.com

# Authenticate with a bearer token
omg test api.omg.md --against https://api.example.com --auth "$TOKEN"

# Test a single endpoint
omg test api.omg.md --against https://api.example.com -e "GET /todos/{id}"

# Emit a JUnit report for CI
omg test api.omg.md --against https://api.example.com --report junit -o results.xml
```

## Options

| Option | Description |
|--------|-------------|
| `-a, --against <url>` | **Required.** Base URL of the API to test against |
| `--auth <token>` | Bearer token for the `Authorization` header |
| `--auth-header <name:value>` | Custom auth header, e.g. `X-API-Key:secret` |
| `--basic-auth <user:password>` | HTTP basic auth credentials |
| `-e, --endpoint <endpoints...>` | Filter to specific endpoints by `operationId`, path, or `METHOD /path` |
| `--env <file>` | `.env`-style file supplying parameter values |
| `-H, --header <headers...>` | Extra headers sent with every request |
| `-t, --timeout <ms>` | Request timeout in milliseconds (default `30000`) |
| `-r, --retries <count>` | Retries on network failure (default `2`) |
| `--report <format>` | Output format: `console`, `json`, or `junit` (default `console`) |
| `-o, --output <file>` | Write the report to a file instead of stdout |
| `-v, --verbose` | Verbose output, including passing checks |

## Supplying parameter values

Path and query parameters are resolved, in order, from:

1. The `--env` file — by exact name or `UPPER_SNAKE_CASE` (`thingId` → `THING_ID`).
2. An `example` declared on the parameter or its schema.
3. A `default` declared on the schema.
4. A generated placeholder for common formats (`uuid`, `email`, `date`, IDs).

An `.env` file looks like:

```bash
# values used to fill {accountId} and ?limit=
ACCOUNT_ID=acc_12345
limit=10
```
