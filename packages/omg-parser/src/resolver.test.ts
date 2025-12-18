import { describe, it, expect } from 'vitest';
import { parseDocument } from './document-parser.js';
import { resolveDocument, buildEndpoints } from './resolver.js';

describe('buildEndpoints', () => {
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
      expect((catEndpoint!.requestBody as any).properties).toHaveProperty('meowVolume');

      // Check dog endpoint
      const dogEndpoint = endpoints.find((e) => e.path === '/pets#dog');
      expect(dogEndpoint).toBeDefined();
      expect(dogEndpoint!.operationId).toBe('create-pet-dog');
      expect(dogEndpoint!.summary).toBe('Create Pet (dog)');
      expect(dogEndpoint!.requestBody).toBeDefined();
      expect(dogEndpoint!.requestBody!.kind).toBe('object');
      expect((dogEndpoint!.requestBody as any).properties).toHaveProperty('barkVolume');
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
});
