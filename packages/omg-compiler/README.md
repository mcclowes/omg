# omg-compiler

Compiles OMG (OpenAPI Markdown Grammar) AST to OpenAPI 3.1 specification.

## Installation

```bash
npm install omg-compiler
```

## Usage

### Compile to OpenAPI

```typescript
import { loadApi } from 'omg-parser';
import { compileToOpenApi, serialize } from 'omg-compiler';

// Load API from directory
const api = loadApi('/path/to/api/api.omg.md');

// Compile to OpenAPI
const openapi = compileToOpenApi(api);

// Serialize to YAML or JSON
const yaml = serialize(openapi, 'yaml');
const json = serialize(openapi, 'json');
```

### Detect output format

```typescript
import { detectFormat } from 'omg-compiler';

detectFormat('output.yaml'); // 'yaml'
detectFormat('output.json'); // 'json'
detectFormat('output.yml');  // 'yaml'
```

## API

### `compileToOpenApi(api: ParsedApi): OpenApiDocument`

Compiles a parsed OMG API to an OpenAPI 3.1 document.

**Features:**
- Converts OMG types to OpenAPI schemas
- Extracts nested schemas to `components/schemas`
- Generates meaningful schema names from context
- Handles circular references
- Passes through vendor extensions (`x-*` fields)

### `serialize(doc: OpenApiDocument, format: 'yaml' | 'json'): string`

Serializes an OpenAPI document to YAML or JSON string.

### `detectFormat(filePath: string): 'yaml' | 'json'`

Detects the output format from a file path extension.

## OpenAPI 3.1 Features

The compiler generates fully compliant OpenAPI 3.1 specifications:

- `openapi: 3.1.0`
- JSON Schema compatibility
- `null` in type arrays for nullable
- `$ref` for shared schemas
- Full `components/schemas` support
- Security schemes
- Server definitions
- External documentation links

## Example Output

```yaml
openapi: 3.1.0
info:
  title: My API
  version: 1.0.0
paths:
  /users/{id}:
    get:
      operationId: get-user
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
```

## License

MIT
