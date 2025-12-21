import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { parseDocument } from './document-parser.js';
import {
  resolveDocument,
  buildEndpoints,
  buildEndpoint,
  extractTypeName,
  loadApi,
  clearDocumentCache,
  getDocumentCacheSize,
} from './resolver.js';

// Mock fs module for partial resolution tests
vi.mock('fs', async () => {
  const actual = await vi.importActual<typeof fs>('fs');
  return {
    ...actual,
    existsSync: vi.fn(),
    readFileSync: vi.fn(),
    readdirSync: vi.fn(),
  };
});

describe('resolveDocument', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('partial resolution', () => {
    it('resolves partials and merges blocks', () => {
      const mainContent = `---
method: GET
path: /users
---

# Get Users

@responses/errors
`;

      const partialContent = `# Standard Errors

\`\`\`omg.response.400
{
  error: string
}
\`\`\`

\`\`\`omg.response.500
{
  error: string
}
\`\`\`
`;

      vi.mocked(fs.existsSync).mockImplementation((p: fs.PathLike) => {
        const pathStr = p.toString();
        return pathStr.includes('partials/responses/errors.omg.md') || pathStr.includes('partials');
      });

      vi.mocked(fs.readFileSync).mockImplementation((p: fs.PathOrFileDescriptor) => {
        const pathStr = p.toString();
        if (pathStr.includes('errors.omg.md')) {
          return partialContent;
        }
        return '';
      });

      const doc = parseDocument(mainContent, 'test.omg.md');
      const resolved = resolveDocument(doc, { basePath: '/project' });

      // Should have blocks from both main and partial
      expect(resolved.resolvedBlocks.length).toBeGreaterThan(0);
    });

    it('throws error for missing partial', () => {
      const content = `---
method: GET
path: /test
---

# Test

@nonexistent/partial
`;

      vi.mocked(fs.existsSync).mockReturnValue(false);

      const doc = parseDocument(content, 'test.omg.md');

      expect(() => resolveDocument(doc, { basePath: '/project' })).toThrow(/Partial not found/);
    });

    it('throws error for circular partial references', () => {
      const mainContent = `# Main

@partials/a
`;
      const partialAContent = `# Partial A

@partials/b
`;
      const partialBContent = `# Partial B

@partials/a
`;

      let callCount = 0;
      vi.mocked(fs.existsSync).mockImplementation((p: fs.PathLike) => {
        const pathStr = p.toString();
        return pathStr.includes('partials');
      });

      vi.mocked(fs.readFileSync).mockImplementation((p: fs.PathOrFileDescriptor) => {
        const pathStr = p.toString();
        callCount++;
        // Prevent infinite loop in test
        if (callCount > 10) {
          throw new Error('Circular partial reference detected');
        }
        if (pathStr.includes('a.omg.md')) return partialAContent;
        if (pathStr.includes('b.omg.md')) return partialBContent;
        return '';
      });

      const doc = parseDocument(mainContent, 'test.omg.md');

      expect(() => resolveDocument(doc, { basePath: '/project' })).toThrow(/Circular/);
    });
  });

  describe('schema parsing in blocks', () => {
    it('parses schemas in omg.response blocks', () => {
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

      vi.mocked(fs.existsSync).mockReturnValue(false);

      const doc = parseDocument(content, 'test.omg.md');
      const resolved = resolveDocument(doc, { basePath: '/tmp' });

      expect(resolved.resolvedBlocks[0].parsed).toBeDefined();
      expect(resolved.resolvedBlocks[0].parsed?.kind).toBe('object');
    });

    it('skips empty content blocks', () => {
      const content = `---
method: DELETE
path: /test/{id}
---

# Delete Test

\`\`\`omg.response.204
\`\`\`
`;

      vi.mocked(fs.existsSync).mockReturnValue(false);

      const doc = parseDocument(content, 'test.omg.md');
      const resolved = resolveDocument(doc, { basePath: '/tmp' });

      // Should not throw on empty 204 response
      expect(resolved.resolvedBlocks).toHaveLength(1);
      expect(resolved.resolvedBlocks[0].parsed).toBeUndefined();
    });

    it('handles omg.type blocks by stripping type prefix', () => {
      const content = `# Types

\`\`\`omg.type
type User = {
  id: string,
  name: string
}
\`\`\`
`;

      vi.mocked(fs.existsSync).mockReturnValue(false);

      const doc = parseDocument(content, 'test.omg.md');
      const resolved = resolveDocument(doc, { basePath: '/tmp' });

      expect(resolved.resolvedBlocks[0].parsed).toBeDefined();
      expect(resolved.resolvedBlocks[0].parsed?.kind).toBe('object');
    });

    it('falls back to JSON parsing when schema parsing fails', () => {
      const content = `---
method: GET
path: /test
---

# Test

\`\`\`omg.example
{
  "id": "123",
  "active": true,
  "count": 42
}
\`\`\`
`;

      vi.mocked(fs.existsSync).mockReturnValue(false);

      const doc = parseDocument(content, 'test.omg.md');
      const resolved = resolveDocument(doc, { basePath: '/tmp' });

      expect(resolved.resolvedBlocks[0].parsed).toBeDefined();
    });

    it('throws descriptive error for invalid schema', () => {
      const content = `---
method: GET
path: /test
---

# Test

\`\`\`omg.response
{ invalid :: syntax }
\`\`\`
`;

      vi.mocked(fs.existsSync).mockReturnValue(false);

      const doc = parseDocument(content, 'test.omg.md');

      expect(() => resolveDocument(doc, { basePath: '/tmp' })).toThrow(
        /Failed to parse omg.response block/
      );
    });
  });

  describe('omg.returns block parsing', () => {
    it('parses omg.returns blocks with parsedResponses', () => {
      const content = `---
method: GET
path: /users/{id}
---

# Get User

\`\`\`omg.returns
200: Success
  { id: string, name: string }
404: Not found
  { error: string }
\`\`\`
`;

      vi.mocked(fs.existsSync).mockReturnValue(false);

      const doc = parseDocument(content, 'test.omg.md');
      const resolved = resolveDocument(doc, { basePath: '/tmp' });

      const returnsBlock = resolved.resolvedBlocks.find((b) => b.type === 'omg.returns');
      expect(returnsBlock?.parsedResponses).toBeDefined();
      expect(returnsBlock?.parsedResponses?.responses).toHaveLength(2);
    });
  });

  describe('example block handling', () => {
    it('preserves exampleValue and exampleName after resolution', () => {
      const content = `---
method: GET
path: /test
---

# Test

\`\`\`omg.example.success
{
  "id": "123"
}
\`\`\`
`;

      vi.mocked(fs.existsSync).mockReturnValue(false);

      const doc = parseDocument(content, 'test.omg.md');
      const resolved = resolveDocument(doc, { basePath: '/tmp' });

      const exampleBlock = resolved.resolvedBlocks.find((b) => b.type === 'omg.example');
      expect(exampleBlock).toBeDefined();
      expect(exampleBlock?.exampleName).toBe('success');
      expect(exampleBlock?.exampleValue).toEqual({ id: '123' });
    });

    it('preserves statusCode for status-specific examples', () => {
      const content = `---
method: POST
path: /test
---

# Test

\`\`\`omg.example.201
{
  "id": "456",
  "created": true
}
\`\`\`
`;

      vi.mocked(fs.existsSync).mockReturnValue(false);

      const doc = parseDocument(content, 'test.omg.md');
      const resolved = resolveDocument(doc, { basePath: '/tmp' });

      const exampleBlock = resolved.resolvedBlocks.find((b) => b.type === 'omg.example');
      expect(exampleBlock).toBeDefined();
      expect(exampleBlock?.statusCode).toBe(201);
      expect(exampleBlock?.exampleValue).toEqual({ id: '456', created: true });
    });
  });
});

describe('buildEndpoints', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(fs.existsSync).mockReturnValue(false);
  });

  describe('expandVariants', () => {
    it('expands single document into multiple endpoints based on @when conditions', () => {
      const content = `---
method: POST
path: /pets
operationId: create-pet
expandVariants: petType
tags: [Pets]
---

# Create Pet

Creates a new pet.

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

\`\`\`omg.response
{
  id: uuid,
  createdAt: datetime
}
\`\`\`
`;

      const doc = parseDocument(content, 'test.omg.md');
      const resolved = resolveDocument(doc, { basePath: '/tmp' });
      const endpoints = buildEndpoints(resolved);

      expect(endpoints).toHaveLength(2);

      // Check cat endpoint
      const catEndpoint = endpoints.find((e) => e.path === '/pets#cat');
      expect(catEndpoint).toBeDefined();
      expect(catEndpoint!.operationId).toBe('create-pet-cat');
      expect(catEndpoint!.summary).toBe('Create Pet (cat)');
      expect(catEndpoint!.tags).toEqual(['Pets']);
      expect(catEndpoint!.requestBody).toBeDefined();
      expect(catEndpoint!.requestBody!.kind).toBe('object');
      expect(
        (catEndpoint!.requestBody as { properties: Record<string, unknown> }).properties
      ).toHaveProperty('meowVolume');

      // Check dog endpoint
      const dogEndpoint = endpoints.find((e) => e.path === '/pets#dog');
      expect(dogEndpoint).toBeDefined();
      expect(dogEndpoint!.operationId).toBe('create-pet-dog');
      expect(dogEndpoint!.summary).toBe('Create Pet (dog)');
      expect(dogEndpoint!.requestBody).toBeDefined();
      expect(dogEndpoint!.requestBody!.kind).toBe('object');
      expect(
        (dogEndpoint!.requestBody as { properties: Record<string, unknown> }).properties
      ).toHaveProperty('barkVolume');
    });

    it('includes shared blocks (without @when) in all variants', () => {
      const content = `---
method: POST
path: /pets
operationId: create-pet
expandVariants: petType
---

# Create Pet

\`\`\`omg.body @when(petType = "cat")
{
  name: string
}
\`\`\`

\`\`\`omg.body @when(petType = "dog")
{
  name: string
}
\`\`\`

\`\`\`omg.response
{
  id: uuid
}
\`\`\`
`;

      const doc = parseDocument(content, 'test.omg.md');
      const resolved = resolveDocument(doc, { basePath: '/tmp' });
      const endpoints = buildEndpoints(resolved);

      // Both endpoints should have the shared response
      for (const endpoint of endpoints) {
        expect(endpoint.responses[200]).toBeDefined();
        expect(endpoint.responses[200].schema).toBeDefined();
      }
    });

    it('returns empty array if no @when conditions match expandVariants field', () => {
      const content = `---
method: POST
path: /pets
operationId: create-pet
expandVariants: petType
---

# Create Pet

\`\`\`omg.body
{
  name: string
}
\`\`\`
`;

      const doc = parseDocument(content, 'test.omg.md');
      const resolved = resolveDocument(doc, { basePath: '/tmp' });
      const endpoints = buildEndpoints(resolved);

      // No endpoints because no @when conditions match the expandVariants field
      expect(endpoints).toHaveLength(0);
    });

    it('returns single endpoint when expandVariants is not set', () => {
      const content = `---
method: POST
path: /pets
operationId: create-pet
---

# Create Pet

\`\`\`omg.body
{
  name: string
}
\`\`\`
`;

      const doc = parseDocument(content, 'test.omg.md');
      const resolved = resolveDocument(doc, { basePath: '/tmp' });
      const endpoints = buildEndpoints(resolved);

      expect(endpoints).toHaveLength(1);
      expect(endpoints[0].path).toBe('/pets');
      expect(endpoints[0].operationId).toBe('create-pet');
    });

    it('handles variant-specific responses', () => {
      const content = `---
method: POST
path: /pets
operationId: create-pet
expandVariants: petType
---

# Create Pet

\`\`\`omg.body @when(petType = "cat")
{
  name: string
}
\`\`\`

\`\`\`omg.response @when(petType = "cat")
{
  id: uuid,
  type: "cat"
}
\`\`\`

\`\`\`omg.body @when(petType = "dog")
{
  name: string
}
\`\`\`

\`\`\`omg.response @when(petType = "dog")
{
  id: uuid,
  type: "dog"
}
\`\`\`
`;

      const doc = parseDocument(content, 'test.omg.md');
      const resolved = resolveDocument(doc, { basePath: '/tmp' });
      const endpoints = buildEndpoints(resolved);

      expect(endpoints).toHaveLength(2);

      const catEndpoint = endpoints.find((e) => e.path === '/pets#cat');
      const dogEndpoint = endpoints.find((e) => e.path === '/pets#dog');

      // Each endpoint should have its own response schema
      expect(catEndpoint!.responses[200]).toBeDefined();
      expect(dogEndpoint!.responses[200]).toBeDefined();
    });
  });

  describe('single endpoint building', () => {
    it('generates operationId from method and path when not provided', () => {
      const content = `---
method: GET
path: /users/{id}/posts
---

# Get User Posts
`;

      const doc = parseDocument(content, 'test.omg.md');
      const resolved = resolveDocument(doc, { basePath: '/tmp' });
      const endpoints = buildEndpoints(resolved);

      expect(endpoints[0].operationId).toBe('get-users-id-posts');
    });

    it('extracts method and path from http block when frontmatter is missing', () => {
      const content = `# Get Users

\`\`\`http
GET /users
\`\`\`

\`\`\`omg.response
[{ id: string }]
\`\`\`
`;

      const doc = parseDocument(content, 'test.omg.md');
      const resolved = resolveDocument(doc, { basePath: '/tmp' });
      const endpoints = buildEndpoints(resolved);

      expect(endpoints).toHaveLength(1);
      expect(endpoints[0].method).toBe('GET');
      expect(endpoints[0].path).toBe('/users');
    });

    it('returns empty array for non-endpoint documents', () => {
      const content = `# Just a Partial

\`\`\`omg.type
type User = { id: string }
\`\`\`
`;

      const doc = parseDocument(content, 'test.omg.md');
      const resolved = resolveDocument(doc, { basePath: '/tmp' });
      const endpoints = buildEndpoints(resolved);

      expect(endpoints).toHaveLength(0);
    });

    it('collects all parameter types', () => {
      const content = `---
method: GET
path: /users/{id}
---

# Get User

\`\`\`omg.path
{
  id: string
}
\`\`\`

\`\`\`omg.query
{
  include?: string
}
\`\`\`

\`\`\`omg.headers
{
  Authorization: string
}
\`\`\`
`;

      const doc = parseDocument(content, 'test.omg.md');
      const resolved = resolveDocument(doc, { basePath: '/tmp' });
      const endpoints = buildEndpoints(resolved);

      expect(endpoints[0].parameters.path).toBeDefined();
      expect(endpoints[0].parameters.query).toBeDefined();
      expect(endpoints[0].parameters.headers).toBeDefined();
    });

    it('collects multiple response status codes', () => {
      const content = `---
method: GET
path: /users/{id}
---

# Get User

\`\`\`omg.response
{ id: string }
\`\`\`

\`\`\`omg.response.404
{ error: string }
\`\`\`

\`\`\`omg.response.500
{ error: string }
\`\`\`
`;

      const doc = parseDocument(content, 'test.omg.md');
      const resolved = resolveDocument(doc, { basePath: '/tmp' });
      const endpoints = buildEndpoints(resolved);

      expect(endpoints[0].responses[200]).toBeDefined();
      expect(endpoints[0].responses[404]).toBeDefined();
      expect(endpoints[0].responses[500]).toBeDefined();
    });

    it('passes through endpoint-level OAS fields from frontmatter', () => {
      const content = `---
method: GET
path: /users
deprecated: true
security:
  - bearerAuth: []
servers:
  - url: https://api.example.com
externalDocs:
  url: https://docs.example.com
---

# Get Users
`;

      const doc = parseDocument(content, 'test.omg.md');
      const resolved = resolveDocument(doc, { basePath: '/tmp' });
      const endpoints = buildEndpoints(resolved);

      expect(endpoints[0].deprecated).toBe(true);
      expect(endpoints[0].security).toBeDefined();
      expect(endpoints[0].servers).toBeDefined();
      expect(endpoints[0].externalDocs).toBeDefined();
    });
  });

  describe('example association', () => {
    it('associates unnamed example with response', () => {
      const content = `---
method: GET
path: /users/{id}
---

# Get User

\`\`\`omg.response
{
  id: string,
  name: string
}
\`\`\`

\`\`\`omg.example
{
  "id": "123",
  "name": "John"
}
\`\`\`
`;

      const doc = parseDocument(content, 'test.omg.md');
      const resolved = resolveDocument(doc, { basePath: '/tmp' });
      const endpoints = buildEndpoints(resolved);

      expect(endpoints[0].responses[200].example).toEqual({ id: '123', name: 'John' });
    });

    it('associates named examples with response', () => {
      const content = `---
method: GET
path: /users/{id}
---

# Get User

\`\`\`omg.response
{
  id: string,
  name: string
}
\`\`\`

\`\`\`omg.example.success
{
  "id": "123",
  "name": "John"
}
\`\`\`

\`\`\`omg.example.admin
{
  "id": "456",
  "name": "Admin"
}
\`\`\`
`;

      const doc = parseDocument(content, 'test.omg.md');
      const resolved = resolveDocument(doc, { basePath: '/tmp' });
      const endpoints = buildEndpoints(resolved);

      expect(endpoints[0].responses[200].examples).toBeDefined();
      expect(endpoints[0].responses[200].examples!['success']).toBeDefined();
      expect(endpoints[0].responses[200].examples!['success'].value).toEqual({
        id: '123',
        name: 'John',
      });
      expect(endpoints[0].responses[200].examples!['admin']).toBeDefined();
      expect(endpoints[0].responses[200].examples!['admin'].value).toEqual({
        id: '456',
        name: 'Admin',
      });
    });

    it('associates status-specific examples with correct response', () => {
      const content = `---
method: POST
path: /users
---

# Create User

\`\`\`omg.response.201
{
  id: string,
  created: boolean
}
\`\`\`

\`\`\`omg.response.400
{
  error: string
}
\`\`\`

\`\`\`omg.example.201
{
  "id": "new-123",
  "created": true
}
\`\`\`

\`\`\`omg.example.400
{
  "error": "Validation failed"
}
\`\`\`
`;

      const doc = parseDocument(content, 'test.omg.md');
      const resolved = resolveDocument(doc, { basePath: '/tmp' });
      const endpoints = buildEndpoints(resolved);

      expect(endpoints[0].responses[201].example).toEqual({ id: 'new-123', created: true });
      expect(endpoints[0].responses[400].example).toEqual({ error: 'Validation failed' });
    });

    it('associates named status-specific examples', () => {
      const content = `---
method: POST
path: /todos
---

# Create Todo

\`\`\`omg.response.201
{
  id: string,
  title: string
}
\`\`\`

\`\`\`omg.example.201.minimal
{
  "id": "1",
  "title": "Minimal"
}
\`\`\`

\`\`\`omg.example.201.complete
{
  "id": "2",
  "title": "Complete"
}
\`\`\`
`;

      const doc = parseDocument(content, 'test.omg.md');
      const resolved = resolveDocument(doc, { basePath: '/tmp' });
      const endpoints = buildEndpoints(resolved);

      expect(endpoints[0].responses[201].examples).toBeDefined();
      expect(endpoints[0].responses[201].examples!['minimal'].value).toEqual({
        id: '1',
        title: 'Minimal',
      });
      expect(endpoints[0].responses[201].examples!['complete'].value).toEqual({
        id: '2',
        title: 'Complete',
      });
    });

    it('preserves example description from preceding markdown', () => {
      const content = `---
method: GET
path: /test
---

# Test

\`\`\`omg.response
{ id: string }
\`\`\`

This is a successful response example.

\`\`\`omg.example.success
{
  "id": "123"
}
\`\`\`
`;

      const doc = parseDocument(content, 'test.omg.md');
      const resolved = resolveDocument(doc, { basePath: '/tmp' });
      const endpoints = buildEndpoints(resolved);

      expect(endpoints[0].responses[200].examples).toBeDefined();
      expect(endpoints[0].responses[200].examples!['success'].description).toBe(
        'This is a successful response example.'
      );
    });
  });
});

describe('buildEndpoint', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(fs.existsSync).mockReturnValue(false);
  });

  it('returns first endpoint from buildEndpoints', () => {
    const content = `---
method: GET
path: /test
---

# Test
`;

    const doc = parseDocument(content, 'test.omg.md');
    const resolved = resolveDocument(doc, { basePath: '/tmp' });
    const endpoint = buildEndpoint(resolved);

    expect(endpoint).toBeDefined();
    expect(endpoint?.method).toBe('GET');
    expect(endpoint?.path).toBe('/test');
  });

  it('returns null for non-endpoint documents', () => {
    const content = `# Just a Type

\`\`\`omg.type
type User = { id: string }
\`\`\`
`;

    const doc = parseDocument(content, 'test.omg.md');
    const resolved = resolveDocument(doc, { basePath: '/tmp' });
    const endpoint = buildEndpoint(resolved);

    expect(endpoint).toBeNull();
  });
});

describe('extractTypeName', () => {
  it('extracts type name from type = { } syntax', () => {
    expect(extractTypeName('type User = { id: string }')).toBe('User');
    expect(extractTypeName('type UserProfile = { name: string }')).toBe('UserProfile');
  });

  it('requires type keyword for extraction', () => {
    // Without "type" keyword, should return null
    expect(extractTypeName('User { id: string }')).toBeNull();
  });

  it('returns null for non-type content', () => {
    expect(extractTypeName('{ id: string }')).toBeNull();
    expect(extractTypeName('some random text')).toBeNull();
  });

  it('handles whitespace', () => {
    expect(extractTypeName('  type  User  =  { id: string }')).toBe('User');
  });
});

describe('document caching', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    clearDocumentCache();
  });

  afterEach(() => {
    clearDocumentCache();
  });

  it('caches parsed partials for reuse', () => {
    const mainContent = `---
method: GET
path: /users
---

# Get Users

@shared/errors
`;

    const partialContent = `\`\`\`omg.response.500
{
  error: string
}
\`\`\`
`;

    vi.mocked(fs.existsSync).mockImplementation((p: fs.PathLike) => {
      const pathStr = p.toString();
      return pathStr.includes('partials/shared/errors.omg.md') || pathStr.includes('partials');
    });

    vi.mocked(fs.readFileSync).mockImplementation((p: fs.PathOrFileDescriptor) => {
      const pathStr = p.toString();
      if (pathStr.includes('errors.omg.md')) {
        return partialContent;
      }
      return '';
    });

    // First resolution
    const doc1 = parseDocument(mainContent, 'test1.omg.md');
    resolveDocument(doc1, { basePath: '/project' });

    // Cache should have the partial
    expect(getDocumentCacheSize()).toBe(1);

    // Second resolution with same partial
    const doc2 = parseDocument(mainContent, 'test2.omg.md');
    resolveDocument(doc2, { basePath: '/project' });

    // Cache should still have only one entry (same partial)
    expect(getDocumentCacheSize()).toBe(1);
  });

  it('invalidates cache when content changes', () => {
    const mainContent = `---
method: GET
path: /users
---

# Get Users

@shared/errors
`;

    let partialContent = `\`\`\`omg.response.500
{
  error: string
}
\`\`\`
`;

    vi.mocked(fs.existsSync).mockImplementation((p: fs.PathLike) => {
      const pathStr = p.toString();
      return pathStr.includes('partials/shared/errors.omg.md') || pathStr.includes('partials');
    });

    vi.mocked(fs.readFileSync).mockImplementation((p: fs.PathOrFileDescriptor) => {
      const pathStr = p.toString();
      if (pathStr.includes('errors.omg.md')) {
        return partialContent;
      }
      return '';
    });

    // First resolution
    const doc1 = parseDocument(mainContent, 'test.omg.md');
    resolveDocument(doc1, { basePath: '/project' });

    expect(getDocumentCacheSize()).toBe(1);

    // Change partial content
    partialContent = `\`\`\`omg.response.500
{
  error: string,
  code: integer
}
\`\`\`
`;

    // Second resolution should detect content change
    const doc2 = parseDocument(mainContent, 'test.omg.md');
    resolveDocument(doc2, { basePath: '/project' });

    // Cache entry was invalidated and replaced
    expect(getDocumentCacheSize()).toBe(1);
  });

  it('respects noCache option', () => {
    const mainContent = `---
method: GET
path: /users
---

# Get Users

@shared/errors
`;

    const partialContent = `\`\`\`omg.response.500
{
  error: string
}
\`\`\`
`;

    vi.mocked(fs.existsSync).mockImplementation((p: fs.PathLike) => {
      const pathStr = p.toString();
      return pathStr.includes('partials/shared/errors.omg.md') || pathStr.includes('partials');
    });

    vi.mocked(fs.readFileSync).mockImplementation((p: fs.PathOrFileDescriptor) => {
      const pathStr = p.toString();
      if (pathStr.includes('errors.omg.md')) {
        return partialContent;
      }
      return '';
    });

    // Resolution with noCache
    const doc = parseDocument(mainContent, 'test.omg.md');
    resolveDocument(doc, { basePath: '/project', noCache: true });

    // Cache should be empty
    expect(getDocumentCacheSize()).toBe(0);
  });

  it('clearDocumentCache empties the cache', () => {
    const mainContent = `---
method: GET
path: /users
---

# Get Users

@shared/errors
`;

    const partialContent = `\`\`\`omg.response.500
{
  error: string
}
\`\`\`
`;

    vi.mocked(fs.existsSync).mockImplementation((p: fs.PathLike) => {
      const pathStr = p.toString();
      return pathStr.includes('partials/shared/errors.omg.md') || pathStr.includes('partials');
    });

    vi.mocked(fs.readFileSync).mockImplementation((p: fs.PathOrFileDescriptor) => {
      const pathStr = p.toString();
      if (pathStr.includes('errors.omg.md')) {
        return partialContent;
      }
      return '';
    });

    // Resolve and populate cache
    const doc = parseDocument(mainContent, 'test.omg.md');
    resolveDocument(doc, { basePath: '/project' });

    expect(getDocumentCacheSize()).toBeGreaterThan(0);

    // Clear cache
    clearDocumentCache();

    expect(getDocumentCacheSize()).toBe(0);
  });
});
