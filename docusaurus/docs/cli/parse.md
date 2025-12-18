---
sidebar_position: 3
---

# parse

Parse an OMG file and output its AST (Abstract Syntax Tree).

## Usage

```bash
npx omg parse <file>
```

## Arguments

| Argument | Description |
|----------|-------------|
| `file` | Path to `.omg.md` file to parse |

## Examples

### Parse a single endpoint

```bash
npx omg parse endpoints/get-user.omg.md
```

### View parsed structure

```bash
npx omg parse api.omg.md | jq .
```

## Output

The command outputs a JSON representation of the parsed AST:

```json
{
  "frontmatter": {
    "method": "GET",
    "path": "/users/{userId}",
    "operationId": "get-user",
    "tags": ["Users"]
  },
  "title": "Get User",
  "description": "Returns a user by ID.",
  "blocks": [
    {
      "type": "path",
      "schema": {
        "type": "object",
        "properties": {
          "userId": {
            "type": "primitive",
            "value": "uuid"
          }
        }
      }
    }
  ]
}
```

## Use Cases

- **Debugging** — Verify how your OMG is being parsed
- **Tooling** — Build custom tools that consume OMG AST
- **Validation** — Check syntax before building
