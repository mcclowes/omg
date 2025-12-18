# Todo API - OMG Starter Example

A simple "hello world" example demonstrating OMG (OpenAPI Markdown Grammar) with a basic Todo API.

## Why This Example?

This is the **recommended starting point** for learning OMG. It covers all essential features in a minimal, easy-to-understand format:

- **5 endpoints** covering all CRUD operations
- **All HTTP methods** (GET, POST, PATCH, DELETE)
- **Partials** for reusable error responses
- **Simple data model** everyone understands

For a more complex example with nested relationships, see the [PokéAPI example](../pokeapi/).

## Structure

```
todo-api/
├── api.omg.md                 # API root (name, version, base URL)
├── endpoints/
│   ├── list-todos.omg.md      # GET /todos
│   ├── create-todo.omg.md     # POST /todos
│   ├── get-todo.omg.md        # GET /todos/{id}
│   ├── update-todo.omg.md     # PATCH /todos/{id}
│   └── delete-todo.omg.md     # DELETE /todos/{id}
└── partials/
    └── error.omg.md           # Reusable error responses
```

## Features Demonstrated

| Feature | Where | Example |
|---------|-------|---------|
| Path parameters | `get-todo.omg.md` | `{id: uuid}` |
| Query parameters | `list-todos.omg.md` | `{status?: "pending" \| "completed"}` |
| Request body | `create-todo.omg.md` | `{title: string, priority?: ...}` |
| Response codes | All files | `omg.response.201`, `omg.response.204` |
| Enums | Multiple | `"low" \| "medium" \| "high"` |
| Optional fields | Multiple | `description?: string` |
| Annotations | Multiple | `@min(1)`, `@maxLength(200)` |
| Partials | All endpoints | `{{> partials/error }}` |
| Primitive types | Multiple | `uuid`, `date`, `datetime`, `boolean` |

## Usage

```bash
# Install dependencies
npm install

# Build to OpenAPI YAML
npm run build

# Build to OpenAPI JSON
npm run build:json

# Validate output
npm run validate
```

## Output

The build produces a valid OpenAPI 3.1 specification:

- `openapi.yaml` - YAML format (default)
- `openapi.json` - JSON format (optional)

## Line Count Comparison

| Format | Lines |
|--------|-------|
| OMG source | ~120 lines |
| OpenAPI output | ~350 lines |

OMG reduces boilerplate by ~65% while remaining human-readable.

## Next Steps

After understanding this example:

1. Try modifying an endpoint (add a field, change a type)
2. Create a new endpoint (e.g., `POST /todos/{id}/complete`)
3. Add a new partial (e.g., pagination parameters)
4. Explore the [PokéAPI example](../pokeapi/) for advanced patterns
