"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const document_parser_js_1 = require("./document-parser.js");
const resolver_js_1 = require("./resolver.js");
(0, vitest_1.describe)('buildEndpoints', () => {
    (0, vitest_1.describe)('expandVariants', () => {
        (0, vitest_1.it)('expands single document into multiple endpoints based on @when conditions', () => {
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
            const doc = (0, document_parser_js_1.parseDocument)(content, 'test.omg.md');
            const resolved = (0, resolver_js_1.resolveDocument)(doc, { basePath: '/tmp' });
            const endpoints = (0, resolver_js_1.buildEndpoints)(resolved);
            (0, vitest_1.expect)(endpoints).toHaveLength(2);
            // Check cat endpoint
            const catEndpoint = endpoints.find((e) => e.path === '/pets#cat');
            (0, vitest_1.expect)(catEndpoint).toBeDefined();
            (0, vitest_1.expect)(catEndpoint.operationId).toBe('create-pet-cat');
            (0, vitest_1.expect)(catEndpoint.summary).toBe('Create Pet (cat)');
            (0, vitest_1.expect)(catEndpoint.tags).toEqual(['Pets']);
            (0, vitest_1.expect)(catEndpoint.requestBody).toBeDefined();
            (0, vitest_1.expect)(catEndpoint.requestBody.kind).toBe('object');
            (0, vitest_1.expect)(catEndpoint.requestBody.properties).toHaveProperty('meowVolume');
            // Check dog endpoint
            const dogEndpoint = endpoints.find((e) => e.path === '/pets#dog');
            (0, vitest_1.expect)(dogEndpoint).toBeDefined();
            (0, vitest_1.expect)(dogEndpoint.operationId).toBe('create-pet-dog');
            (0, vitest_1.expect)(dogEndpoint.summary).toBe('Create Pet (dog)');
            (0, vitest_1.expect)(dogEndpoint.requestBody).toBeDefined();
            (0, vitest_1.expect)(dogEndpoint.requestBody.kind).toBe('object');
            (0, vitest_1.expect)(dogEndpoint.requestBody.properties).toHaveProperty('barkVolume');
        });
        (0, vitest_1.it)('includes shared blocks (without @when) in all variants', () => {
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
            const doc = (0, document_parser_js_1.parseDocument)(content, 'test.omg.md');
            const resolved = (0, resolver_js_1.resolveDocument)(doc, { basePath: '/tmp' });
            const endpoints = (0, resolver_js_1.buildEndpoints)(resolved);
            // Both endpoints should have the shared response
            for (const endpoint of endpoints) {
                (0, vitest_1.expect)(endpoint.responses[200]).toBeDefined();
                (0, vitest_1.expect)(endpoint.responses[200].schema).toBeDefined();
            }
        });
        (0, vitest_1.it)('returns empty array if no @when conditions match expandVariants field', () => {
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
            const doc = (0, document_parser_js_1.parseDocument)(content, 'test.omg.md');
            const resolved = (0, resolver_js_1.resolveDocument)(doc, { basePath: '/tmp' });
            const endpoints = (0, resolver_js_1.buildEndpoints)(resolved);
            // No endpoints because no @when conditions match the expandVariants field
            (0, vitest_1.expect)(endpoints).toHaveLength(0);
        });
        (0, vitest_1.it)('returns single endpoint when expandVariants is not set', () => {
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
            const doc = (0, document_parser_js_1.parseDocument)(content, 'test.omg.md');
            const resolved = (0, resolver_js_1.resolveDocument)(doc, { basePath: '/tmp' });
            const endpoints = (0, resolver_js_1.buildEndpoints)(resolved);
            (0, vitest_1.expect)(endpoints).toHaveLength(1);
            (0, vitest_1.expect)(endpoints[0].path).toBe('/pets');
            (0, vitest_1.expect)(endpoints[0].operationId).toBe('create-pet');
        });
        (0, vitest_1.it)('handles variant-specific responses', () => {
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
            const doc = (0, document_parser_js_1.parseDocument)(content, 'test.omg.md');
            const resolved = (0, resolver_js_1.resolveDocument)(doc, { basePath: '/tmp' });
            const endpoints = (0, resolver_js_1.buildEndpoints)(resolved);
            (0, vitest_1.expect)(endpoints).toHaveLength(2);
            const catEndpoint = endpoints.find((e) => e.path === '/pets#cat');
            const dogEndpoint = endpoints.find((e) => e.path === '/pets#dog');
            // Each endpoint should have its own response schema
            (0, vitest_1.expect)(catEndpoint.responses[200]).toBeDefined();
            (0, vitest_1.expect)(dogEndpoint.responses[200]).toBeDefined();
        });
    });
});
//# sourceMappingURL=resolver.test.js.map