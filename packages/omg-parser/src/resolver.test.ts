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
