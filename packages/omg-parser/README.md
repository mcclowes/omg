# omg-parser

Parser for OMG (OpenAPI Markdown Grammar) files. Parses `.omg.md` files into an Abstract Syntax Tree (AST) that can be compiled to OpenAPI 3.1.

## Installation

```bash
npm install omg-parser
```

## Usage

### Parse a document

```typescript
import { parseDocument } from 'omg-parser';

const content = `---
method: GET
path: /users/{id}
---

# Get User

Returns a user by ID.

\`\`\`omg.response
{
  id: string,
  name: string
}
\`\`\`
`;

const doc = parseDocument(content, 'get-user.omg.md');
console.log(doc.frontMatter); // { method: 'GET', path: '/users/{id}' }
console.log(doc.title);       // 'Get User'
console.log(doc.blocks);      // [{ type: 'omg.response', ... }]
```

### Resolve partials

```typescript
import { parseDocument, resolveDocument } from 'omg-parser';

const doc = parseDocument(content, 'get-user.omg.md');
const resolved = resolveDocument(doc, { basePath: '/path/to/api' });

// resolved.resolvedBlocks includes blocks from partials
```

### Build endpoints

```typescript
import { parseDocument, resolveDocument, buildEndpoint } from 'omg-parser';

const doc = parseDocument(content, 'get-user.omg.md');
const resolved = resolveDocument(doc, { basePath: '/path/to/api' });
const endpoint = buildEndpoint(resolved);

console.log(endpoint.method);     // 'GET'
console.log(endpoint.path);       // '/users/{id}'
console.log(endpoint.responses);  // { 200: { schema: ... } }
```

### Parse schemas

```typescript
import { parseSchema } from 'omg-parser';

const schema = parseSchema('{ id: string, name: string?, age: integer @min(0) }');
console.log(schema.kind);       // 'object'
console.log(schema.properties); // { id: ..., name: ..., age: ... }
```

## API

### `parseDocument(content: string, filePath: string): OmgDocument`

Parses OMG markdown content into a document structure.

### `resolveDocument(doc: OmgDocument, options: { basePath: string }): ResolvedDocument`

Resolves partial references and parses schemas in code blocks.

### `buildEndpoint(doc: ResolvedDocument): ParsedEndpoint | null`

Builds a parsed endpoint from a resolved document.

### `buildEndpoints(doc: ResolvedDocument): ParsedEndpoint[]`

Builds multiple endpoints (for variant expansion).

### `parseSchema(content: string): OmgSchema`

Parses OMG schema syntax into an AST.

### `loadApi(rootPath: string): ParsedApi`

Loads an entire API from a directory.

## Schema Syntax

OMG uses a TypeScript-like syntax for schemas:

```
# Primitives
string, integer, number, decimal, boolean, date, datetime, uuid, any

# Optional fields
name?: string

# Arrays
items: Product[]

# Enums
status: "active" | "inactive" | "pending"

# Unions
result: Success | Error

# Intersections
user: BaseUser & AdminPermissions

# Nullable
data: User | null

# Annotations
age: integer @min(0) @max(150)
email: string @format("email")
name: string @minLength(1) @maxLength(100)
```

## License

MIT
