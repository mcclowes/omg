---
sidebar_position: 5
---

# import

Import an existing OpenAPI 3.x specification and convert it to OMG format.

## Usage

```bash
omg import <openapi-spec> [options]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `<openapi-spec>` | Path to OpenAPI spec file (YAML or JSON) |

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `-o, --output <directory>` | Output directory for generated files | Current directory |
| `--partials` | Generate partials for reusable schemas | `false` |
| `--examples` | Include examples from OpenAPI spec | `false` |
| `--inline-refs` | Inline `$ref` schemas instead of keeping references | `false` |

## Examples

### Basic Import

```bash
# Import OpenAPI spec to current directory
omg import petstore.yaml

# Import to a specific directory
omg import petstore.yaml -o my-api/
```

### With Schema Partials

Generate reusable type partials from `components/schemas`:

```bash
omg import petstore.yaml -o my-api/ --partials
```

This creates files in `partials/types/` for each schema defined in `components/schemas`.

### With Examples

Include example data from the OpenAPI spec:

```bash
omg import petstore.yaml -o my-api/ --examples
```

### Full Import

```bash
omg import petstore.yaml -o my-api/ --partials --examples
```

## Output Structure

The import command generates the following structure:

```
my-api/
├── api.omg.md              # API root file with info, servers, tags
├── endpoints/              # Endpoint files (one per operation)
│   ├── list-pets.omg.md
│   ├── create-pet.omg.md
│   ├── get-pet.omg.md
│   └── ...
└── partials/               # (if --partials is used)
    └── types/
        ├── pet.omg.md
        ├── error.omg.md
        └── ...
```

## Supported Features

The importer handles the following OpenAPI constructs:

### Converted

- ✅ API info (title, version, description, contact)
- ✅ Servers (first server becomes `baseUrl`)
- ✅ Tags
- ✅ Operations (all HTTP methods)
- ✅ Path parameters → `omg.path` blocks
- ✅ Query parameters → `omg.query` blocks
- ✅ Header parameters → `omg.headers` blocks
- ✅ Request body → `omg.body` blocks
- ✅ Responses → `omg.response` / `omg.response.{code}` blocks
- ✅ Schema types (object, array, string, number, integer, boolean)
- ✅ Schema formats (date, date-time, uuid, email, etc.)
- ✅ Enums
- ✅ `allOf` (intersection types)
- ✅ `oneOf` / `anyOf` (union types)
- ✅ `$ref` references
- ✅ Required/optional fields
- ✅ Field descriptions (as comments)
- ✅ Validation annotations (min, max, minLength, maxLength, pattern)
- ✅ Examples (with `--examples` flag)
- ✅ Deprecated operations

### Not Yet Supported

- ❌ Security schemes
- ❌ Callbacks
- ❌ Webhooks
- ❌ Links
- ❌ XML support
- ❌ Multiple servers

## Post-Import Workflow

After importing, you should:

1. **Review generated files** - Check that the conversion looks correct
2. **Run lint** - `omg lint my-api/` to identify any issues
3. **Test round-trip** - `omg build my-api/api.omg.md -o test.yaml` to verify compilation
4. **Refine** - Add descriptions, examples, and partials as needed

## Version Support

- ✅ OpenAPI 3.0.x
- ✅ OpenAPI 3.1.x
- ❌ OpenAPI 2.0 (Swagger) - Not supported

For Swagger 2.0 specs, first convert to OpenAPI 3.x using a tool like [swagger2openapi](https://github.com/Mermade/oas-kit/tree/main/packages/swagger2openapi).
