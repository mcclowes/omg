import { describe, it, expect } from 'vitest';
import { parseDocument, parseHttpBlock } from './document-parser.js';

describe('parseDocument', () => {
  describe('front matter extraction', () => {
    it('should extract YAML front matter', () => {
      const content = `---
method: GET
path: /users
operationId: get-users
tags: [Users]
---

# Get Users
`;
      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.frontMatter).toEqual({
        method: 'GET',
        path: '/users',
        operationId: 'get-users',
        tags: ['Users'],
      });
    });

    it('should handle empty front matter', () => {
      const content = `---
---

# Title
`;
      const doc = parseDocument(content, 'test.omg.md');
      expect(doc.frontMatter).toBeNull();
    });

    it('should handle missing front matter', () => {
      const content = `# Title

Some content here.
`;
      const doc = parseDocument(content, 'test.omg.md');
      expect(doc.frontMatter).toBeNull();
    });

    it('should extract all endpoint front matter fields', () => {
      const content = `---
method: POST
path: /accounts/{id}
operationId: create-account
tags: [Accounts, Admin]
summary: Create a new account
deprecated: true
follows: [auth-login]
---

# Create Account
`;
      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.frontMatter).toMatchObject({
        method: 'POST',
        path: '/accounts/{id}',
        operationId: 'create-account',
        tags: ['Accounts', 'Admin'],
        summary: 'Create a new account',
        deprecated: true,
        follows: ['auth-login'],
      });
    });

    it('should extract expandVariants from frontmatter', () => {
      const content = `---
method: POST
path: /pets
expandVariants: petType
---

# Create Pet
`;

      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.frontMatter).toBeDefined();
      expect((doc.frontMatter as { expandVariants?: string }).expandVariants).toBe('petType');
    });
  });

  describe('title extraction', () => {
    it('should extract the first h1 heading as title', () => {
      const content = `---
method: GET
path: /test
---

# My API Endpoint

Some description.
`;
      const doc = parseDocument(content, 'test.omg.md');
      expect(doc.title).toBe('My API Endpoint');
    });

    it('should return null if no h1 heading exists', () => {
      const content = `---
method: GET
path: /test
---

## Not a title

Some content.
`;
      const doc = parseDocument(content, 'test.omg.md');
      expect(doc.title).toBeNull();
    });

    it('should only use the first h1 heading', () => {
      const content = `# First Title

Some content.

# Second Title

More content.
`;
      const doc = parseDocument(content, 'test.omg.md');
      expect(doc.title).toBe('First Title');
    });
  });

  describe('description extraction', () => {
    it('should extract prose content as description', () => {
      const content = `---
method: GET
path: /test
---

# Title

This is the description.

It can span multiple paragraphs.
`;
      const doc = parseDocument(content, 'test.omg.md');
      expect(doc.description).toContain('This is the description.');
      expect(doc.description).toContain('It can span multiple paragraphs.');
    });

    it('should exclude code blocks from description', () => {
      const content = `---
method: GET
path: /test
---

# Title

Description here.

\`\`\`omg.response
{
  id: string
}
\`\`\`

More description.
`;
      const doc = parseDocument(content, 'test.omg.md');
      expect(doc.description).not.toContain('id: string');
      expect(doc.description).toContain('Description here.');
      expect(doc.description).toContain('More description.');
    });

    it('should exclude partial references from description', () => {
      const content = `---
method: GET
path: /test
---

# Test

This is the description.

@params/company
`;

      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.description).toBe('This is the description.');
      expect(doc.partials).toHaveLength(1);
    });
  });

  describe('code block extraction', () => {
    it('should extract omg.response blocks', () => {
      const content = `---
method: GET
path: /test
---

# Test

\`\`\`omg.response
{
  id: string,
  name: string
}
\`\`\`
`;
      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(1);
      expect(doc.blocks[0].type).toBe('omg.response');
      expect(doc.blocks[0].content).toContain('id: string');
    });

    it('should extract omg.response with status code', () => {
      const content = `---
method: POST
path: /test
---

# Test

\`\`\`omg.response.201
{
  id: string
}
\`\`\`

\`\`\`omg.response.400
{
  error: string
}
\`\`\`
`;
      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(2);
      expect(doc.blocks[0].type).toBe('omg.response');
      expect(doc.blocks[0].statusCode).toBe(201);
      expect(doc.blocks[1].type).toBe('omg.response');
      expect(doc.blocks[1].statusCode).toBe(400);
    });

    it('should extract all block types', () => {
      const content = `---
method: POST
path: /users/{id}
---

# Test

\`\`\`omg.path
{
  id: string
}
\`\`\`

\`\`\`omg.query
{
  filter?: string
}
\`\`\`

\`\`\`omg.headers
{
  Authorization: string
}
\`\`\`

\`\`\`omg.body
{
  name: string
}
\`\`\`

\`\`\`omg.response
{
  id: string
}
\`\`\`
`;
      const doc = parseDocument(content, 'test.omg.md');

      const types = doc.blocks.map((b) => b.type);
      expect(types).toContain('omg.path');
      expect(types).toContain('omg.query');
      expect(types).toContain('omg.headers');
      expect(types).toContain('omg.body');
      expect(types).toContain('omg.response');
    });

    it('should extract http blocks', () => {
      const content = `# Test

\`\`\`http
GET /users
\`\`\`
`;
      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(1);
      expect(doc.blocks[0].type).toBe('http');
      expect(doc.blocks[0].content).toBe('GET /users');
    });

    it('should extract omg.type blocks', () => {
      const content = `# Types

\`\`\`omg.type
type User = {
  id: string,
  name: string
}
\`\`\`
`;
      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(1);
      expect(doc.blocks[0].type).toBe('omg.type');
      expect(doc.blocks[0].content).toContain('type User');
    });

    it('should extract omg.returns blocks', () => {
      const content = `---
method: GET
path: /users/{id}
---

# Get User

\`\`\`omg.returns
200: User found
  { id: string, name: string }
404: User not found
  { error: string }
\`\`\`
`;
      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(1);
      expect(doc.blocks[0].type).toBe('omg.returns');
    });

    it('should capture block line numbers', () => {
      const content = `---
method: GET
path: /test
---

# Test

\`\`\`omg.response
{
  id: string
}
\`\`\`
`;
      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks[0].line).toBeGreaterThan(0);
    });

    it('should ignore non-omg code blocks', () => {
      const content = `# Test

\`\`\`javascript
console.log('hello');
\`\`\`

\`\`\`json
{"key": "value"}
\`\`\`

\`\`\`omg.response
{ id: string }
\`\`\`
`;
      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(1);
      expect(doc.blocks[0].type).toBe('omg.response');
    });

    it('should extract omg.example blocks', () => {
      const content = `# Test

\`\`\`omg.example
{
  "id": "123",
  "name": "Test User"
}
\`\`\`
`;
      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(1);
      expect(doc.blocks[0].type).toBe('omg.example');
      expect(doc.blocks[0].exampleValue).toEqual({ id: '123', name: 'Test User' });
    });

    it('should extract named omg.example blocks', () => {
      const content = `# Test

\`\`\`omg.example.success
{
  "id": "123",
  "name": "Test User"
}
\`\`\`
`;
      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(1);
      expect(doc.blocks[0].type).toBe('omg.example');
      expect(doc.blocks[0].exampleName).toBe('success');
      expect(doc.blocks[0].exampleValue).toEqual({ id: '123', name: 'Test User' });
    });

    it('should extract omg.example blocks with status code', () => {
      const content = `# Test

\`\`\`omg.example.201
{
  "id": "456",
  "created": true
}
\`\`\`
`;
      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(1);
      expect(doc.blocks[0].type).toBe('omg.example');
      expect(doc.blocks[0].statusCode).toBe(201);
      expect(doc.blocks[0].exampleName).toBeUndefined();
      expect(doc.blocks[0].exampleValue).toEqual({ id: '456', created: true });
    });

    it('should extract omg.example blocks with status code and name', () => {
      const content = `# Test

\`\`\`omg.example.201.complete
{
  "id": "789",
  "status": "created"
}
\`\`\`
`;
      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(1);
      expect(doc.blocks[0].type).toBe('omg.example');
      expect(doc.blocks[0].statusCode).toBe(201);
      expect(doc.blocks[0].exampleName).toBe('complete');
      expect(doc.blocks[0].exampleValue).toEqual({ id: '789', status: 'created' });
    });

    it('should capture preceding markdown as example description', () => {
      const content = `# Test

This is a successful response when everything works.

\`\`\`omg.example.success
{
  "id": "123"
}
\`\`\`
`;
      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(1);
      expect(doc.blocks[0].exampleDescription).toBe(
        'This is a successful response when everything works.'
      );
    });

    it('should capture multiple paragraphs as example description', () => {
      const content = `# Test

First paragraph explaining the example.

Second paragraph with more details.

\`\`\`omg.example
{
  "id": "123"
}
\`\`\`
`;
      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(1);
      expect(doc.blocks[0].exampleDescription).toBe(
        'First paragraph explaining the example.\n\nSecond paragraph with more details.'
      );
    });

    it('should not capture markdown from before other code blocks', () => {
      const content = `# Test

Some description.

\`\`\`omg.response
{ id: string }
\`\`\`

This describes the example.

\`\`\`omg.example
{
  "id": "123"
}
\`\`\`
`;
      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(2);
      const exampleBlock = doc.blocks.find((b) => b.type === 'omg.example');
      expect(exampleBlock?.exampleDescription).toBe('This describes the example.');
    });

    it('should not capture markdown from before headings', () => {
      const content = `# Test

Some description.

## Example Section

This describes the example.

\`\`\`omg.example
{
  "id": "123"
}
\`\`\`
`;
      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(1);
      expect(doc.blocks[0].exampleDescription).toBe('This describes the example.');
    });

    it('should extract omg.errors blocks', () => {
      const content = `# Test

\`\`\`omg.errors
{
  400: { error: string },
  404: { message: string }
}
\`\`\`
`;
      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(1);
      expect(doc.blocks[0].type).toBe('omg.errors');
    });

    it('should extract omg.config blocks', () => {
      const content = `# Test

\`\`\`omg.config
{
  baseUrl: "https://api.example.com"
}
\`\`\`
`;
      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(1);
      expect(doc.blocks[0].type).toBe('omg.config');
    });
  });

  describe('@when annotation parsing', () => {
    it('parses @when annotation on omg.body block', () => {
      const content = `---
method: POST
path: /pets
expandVariants: petType
---

# Create Pet

\`\`\`omg.body @when(petType = "cat")
{
  name: string,
  meowVolume: integer
}
\`\`\`
`;

      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(1);
      expect(doc.blocks[0].type).toBe('omg.body');
      expect(doc.blocks[0].whenCondition).toEqual({
        field: 'petType',
        value: 'cat',
      });
    });

    it('parses multiple @when annotations for different variants', () => {
      const content = `---
method: POST
path: /pets
expandVariants: petType
---

# Create Pet

\`\`\`omg.body @when(petType = "cat")
{
  name: string,
  meowVolume: integer
}
\`\`\`

\`\`\`omg.body @when(petType = "dog")
{
  name: string,
  barkVolume: integer
}
\`\`\`
`;

      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(2);

      expect(doc.blocks[0].type).toBe('omg.body');
      expect(doc.blocks[0].whenCondition).toEqual({
        field: 'petType',
        value: 'cat',
      });

      expect(doc.blocks[1].type).toBe('omg.body');
      expect(doc.blocks[1].whenCondition).toEqual({
        field: 'petType',
        value: 'dog',
      });
    });

    it('handles blocks without @when annotation', () => {
      const content = `---
method: POST
path: /pets
---

# Create Pet

\`\`\`omg.body
{
  name: string
}
\`\`\`
`;

      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(1);
      expect(doc.blocks[0].type).toBe('omg.body');
      expect(doc.blocks[0].whenCondition).toBeUndefined();
    });

    it('parses @when annotation on omg.response block', () => {
      const content = `---
method: POST
path: /pets
expandVariants: petType
---

# Create Pet

\`\`\`omg.response @when(petType = "cat")
{
  id: uuid,
  type: "cat"
}
\`\`\`
`;

      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(1);
      expect(doc.blocks[0].type).toBe('omg.response');
      expect(doc.blocks[0].whenCondition).toEqual({
        field: 'petType',
        value: 'cat',
      });
    });

    it('parses @when annotation with status code', () => {
      const content = `---
method: POST
path: /pets
expandVariants: petType
---

# Create Pet

\`\`\`omg.response.201 @when(petType = "cat")
{
  id: uuid
}
\`\`\`
`;

      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(1);
      expect(doc.blocks[0].type).toBe('omg.response');
      expect(doc.blocks[0].statusCode).toBe(201);
      expect(doc.blocks[0].whenCondition).toEqual({
        field: 'petType',
        value: 'cat',
      });
    });
  });

  describe('partial parsing', () => {
    it('parses Handlebars-style partial references', () => {
      const content = `---
method: GET
path: /test
---

# Test

{{> params/company }}
{{> responses/errors }}
`;

      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.partials).toHaveLength(2);
      expect(doc.partials[0].path).toBe('params/company');
      expect(doc.partials[1].path).toBe('responses/errors');
    });

    it('parses OMG-style @ partial references', () => {
      const content = `---
method: GET
path: /test
---

# Test

@params/company
@responses/errors
`;

      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.partials).toHaveLength(2);
      expect(doc.partials[0].path).toBe('params/company');
      expect(doc.partials[1].path).toBe('responses/errors');
    });

    it('parses mixed partial syntaxes in the same document', () => {
      const content = `---
method: GET
path: /test
---

# Test

{{> params/company }}
@responses/errors
`;

      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.partials).toHaveLength(2);
      expect(doc.partials[0].path).toBe('params/company');
      expect(doc.partials[1].path).toBe('responses/errors');
    });

    it('tracks correct line numbers for @ partials', () => {
      const content = `---
method: GET
path: /test
---

# Test

Some description.

@params/company
`;

      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.partials).toHaveLength(1);
      expect(doc.partials[0].path).toBe('params/company');
      // Line number is relative to the markdown content after frontmatter extraction
      expect(doc.partials[0].line).toBe(6);
    });

    it('handles @ partials with underscores and hyphens', () => {
      const content = `---
method: GET
path: /test
---

# Test

@common_params/user-id
`;

      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.partials).toHaveLength(1);
      expect(doc.partials[0].path).toBe('common_params/user-id');
    });

    it('should not parse @ symbols in code blocks as partials', () => {
      const content = `---
method: GET
path: /test
---

# Test

\`\`\`omg.response
{
  email: string @format("email")
}
\`\`\`
`;

      const doc = parseDocument(content, 'test.omg.md');

      // The @format annotation should NOT be parsed as a partial
      expect(doc.partials).toHaveLength(0);
    });
  });

  describe('file path handling', () => {
    it('should store the file path in the document', () => {
      const content = `# Test`;
      const doc = parseDocument(content, 'path/to/file.omg.md');

      expect(doc.filePath).toBe('path/to/file.omg.md');
    });
  });

  describe('edge cases', () => {
    it('should handle empty content', () => {
      const doc = parseDocument('', 'empty.omg.md');

      expect(doc.frontMatter).toBeNull();
      expect(doc.title).toBeNull();
      expect(doc.description).toBe('');
      expect(doc.blocks).toHaveLength(0);
      expect(doc.partials).toHaveLength(0);
    });

    it('should handle content with only front matter', () => {
      const content = `---
method: GET
path: /test
---
`;
      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.frontMatter).toEqual({
        method: 'GET',
        path: '/test',
      });
      expect(doc.title).toBeNull();
    });

    it('should handle content with only a title', () => {
      const content = `# Just a Title`;
      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.title).toBe('Just a Title');
      expect(doc.frontMatter).toBeNull();
    });

    it('should handle nested code blocks in content', () => {
      const content = `---
method: GET
path: /test
---

# Test

Description with inline \`code\` snippets.

\`\`\`omg.response
{
  id: string
}
\`\`\`
`;
      const doc = parseDocument(content, 'test.omg.md');

      expect(doc.blocks).toHaveLength(1);
      expect(doc.description).toContain('inline `code` snippets');
    });
  });
});

describe('parseHttpBlock', () => {
  it('should parse GET request', () => {
    const result = parseHttpBlock('GET /users');

    expect(result).toEqual({
      method: 'GET',
      path: '/users',
    });
  });

  it('should parse POST request', () => {
    const result = parseHttpBlock('POST /users');

    expect(result).toEqual({
      method: 'POST',
      path: '/users',
    });
  });

  it('should parse all HTTP methods', () => {
    const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];

    for (const method of methods) {
      const result = parseHttpBlock(`${method} /test`);
      expect(result?.method).toBe(method);
    }
  });

  it('should handle lowercase method names', () => {
    const result = parseHttpBlock('get /users');

    expect(result).toEqual({
      method: 'GET',
      path: '/users',
    });
  });

  it('should handle complex paths', () => {
    const result = parseHttpBlock('GET /users/{id}/posts?limit=10');

    expect(result).toEqual({
      method: 'GET',
      path: '/users/{id}/posts?limit=10',
    });
  });

  it('should return null for invalid format', () => {
    expect(parseHttpBlock('invalid')).toBeNull();
    expect(parseHttpBlock('/users')).toBeNull();
    expect(parseHttpBlock('UNKNOWN /test')).toBeNull();
  });

  it('should handle whitespace', () => {
    const result = parseHttpBlock('  GET   /users  ');

    expect(result).toEqual({
      method: 'GET',
      path: '/users',
    });
  });

  it('should handle paths with fragments', () => {
    const result = parseHttpBlock('GET /users#section');

    expect(result).toEqual({
      method: 'GET',
      path: '/users#section',
    });
  });
});
