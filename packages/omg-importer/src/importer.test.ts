/**
 * Tests for importer.ts
 */

import { describe, it, expect } from 'vitest';
import { importOpenApi } from './importer.js';
import type { OpenApiSpec } from './types.js';

describe('importOpenApi', () => {
  const minimalSpec: OpenApiSpec = {
    openapi: '3.1.0',
    info: {
      title: 'Test API',
      version: '1.0.0',
    },
    paths: {},
  };

  it('creates API document from spec info', () => {
    const result = importOpenApi(minimalSpec);

    expect(result.api.frontMatter).toEqual({
      name: 'Test API',
      version: '1.0.0',
    });
    expect(result.api.title).toBe('Test API');
  });

  it('includes baseUrl from servers', () => {
    const spec: OpenApiSpec = {
      ...minimalSpec,
      servers: [{ url: 'https://api.example.com/v1' }],
    };

    const result = importOpenApi(spec);

    expect((result.api.frontMatter as any).baseUrl).toBe('https://api.example.com/v1');
  });

  it('includes contact info', () => {
    const spec: OpenApiSpec = {
      ...minimalSpec,
      info: {
        ...minimalSpec.info,
        contact: {
          name: 'API Support',
          email: 'support@example.com',
          url: 'https://example.com/support',
        },
      },
    };

    const result = importOpenApi(spec);

    expect((result.api.frontMatter as any).contact).toEqual({
      name: 'API Support',
      email: 'support@example.com',
      url: 'https://example.com/support',
    });
  });

  describe('endpoint conversion', () => {
    it('converts GET endpoint', () => {
      const spec: OpenApiSpec = {
        ...minimalSpec,
        paths: {
          '/users': {
            get: {
              operationId: 'list-users',
              summary: 'List all users',
              tags: ['Users'],
            },
          },
        },
      };

      const result = importOpenApi(spec);

      expect(result.endpoints).toHaveLength(1);
      const endpoint = result.endpoints[0];
      expect((endpoint.frontMatter as any).method).toBe('GET');
      expect((endpoint.frontMatter as any).path).toBe('/users');
      expect((endpoint.frontMatter as any).operationId).toBe('list-users');
      expect((endpoint.frontMatter as any).tags).toEqual(['Users']);
    });

    it('converts multiple methods on same path', () => {
      const spec: OpenApiSpec = {
        ...minimalSpec,
        paths: {
          '/users': {
            get: { operationId: 'list-users' },
            post: { operationId: 'create-user' },
          },
        },
      };

      const result = importOpenApi(spec);

      expect(result.endpoints).toHaveLength(2);
      const methods = result.endpoints.map((e) => (e.frontMatter as any).method);
      expect(methods).toContain('GET');
      expect(methods).toContain('POST');
    });

    it('generates operationId if not provided', () => {
      const spec: OpenApiSpec = {
        ...minimalSpec,
        paths: {
          '/users/{id}': {
            get: {},
          },
        },
      };

      const result = importOpenApi(spec);

      expect((result.endpoints[0].frontMatter as any).operationId).toBe('get-users-by-id');
    });

    it('converts path parameters', () => {
      const spec: OpenApiSpec = {
        ...minimalSpec,
        paths: {
          '/users/{id}': {
            get: {
              operationId: 'get-user',
              parameters: [
                {
                  name: 'id',
                  in: 'path',
                  required: true,
                  schema: { type: 'string', format: 'uuid' },
                },
              ],
            },
          },
        },
      };

      const result = importOpenApi(spec);

      const pathBlock = result.endpoints[0].blocks.find((b) => b.type === 'omg.path');
      expect(pathBlock).toBeDefined();
      expect(pathBlock?.parsed?.kind).toBe('object');
      expect((pathBlock?.parsed as any).properties.id.type).toBe('uuid');
    });

    it('converts query parameters', () => {
      const spec: OpenApiSpec = {
        ...minimalSpec,
        paths: {
          '/users': {
            get: {
              operationId: 'list-users',
              parameters: [
                {
                  name: 'limit',
                  in: 'query',
                  schema: { type: 'integer' },
                },
                {
                  name: 'offset',
                  in: 'query',
                  schema: { type: 'integer' },
                },
              ],
            },
          },
        },
      };

      const result = importOpenApi(spec);

      const queryBlock = result.endpoints[0].blocks.find((b) => b.type === 'omg.query');
      expect(queryBlock).toBeDefined();
      expect(queryBlock?.parsed?.kind).toBe('object');
      expect((queryBlock?.parsed as any).properties.limit).toBeDefined();
      expect((queryBlock?.parsed as any).properties.offset).toBeDefined();
    });

    it('converts request body', () => {
      const spec: OpenApiSpec = {
        ...minimalSpec,
        paths: {
          '/users': {
            post: {
              operationId: 'create-user',
              requestBody: {
                required: true,
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        name: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                      },
                      required: ['name', 'email'],
                    },
                  },
                },
              },
            },
          },
        },
      };

      const result = importOpenApi(spec);

      const bodyBlock = result.endpoints[0].blocks.find((b) => b.type === 'omg.body');
      expect(bodyBlock).toBeDefined();
      expect(bodyBlock?.parsed?.kind).toBe('object');
      expect((bodyBlock?.parsed as any).properties.name).toBeDefined();
    });

    it('converts responses', () => {
      const spec: OpenApiSpec = {
        ...minimalSpec,
        paths: {
          '/users/{id}': {
            get: {
              operationId: 'get-user',
              responses: {
                '200': {
                  description: 'Success',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          id: { type: 'string', format: 'uuid' },
                          name: { type: 'string' },
                        },
                      },
                    },
                  },
                },
                '404': {
                  description: 'Not Found',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          error: { type: 'string' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      };

      const result = importOpenApi(spec);

      const responseBlocks = result.endpoints[0].blocks.filter((b) => b.type === 'omg.response');
      expect(responseBlocks).toHaveLength(2);

      const response200 = responseBlocks.find((b) => !b.statusCode);
      const response404 = responseBlocks.find((b) => b.statusCode === 404);

      expect(response200).toBeDefined();
      expect(response404).toBeDefined();
    });

    it('handles deprecated flag', () => {
      const spec: OpenApiSpec = {
        ...minimalSpec,
        paths: {
          '/old-endpoint': {
            get: {
              operationId: 'old-endpoint',
              deprecated: true,
            },
          },
        },
      };

      const result = importOpenApi(spec);

      expect((result.endpoints[0].frontMatter as any).deprecated).toBe(true);
    });

    it('handles x-follows extension', () => {
      const spec: OpenApiSpec = {
        ...minimalSpec,
        paths: {
          '/order': {
            post: {
              operationId: 'create-order',
              'x-follows': ['create-cart', 'add-items'],
            },
          },
        },
      };

      const result = importOpenApi(spec);

      expect((result.endpoints[0].frontMatter as any).follows).toEqual([
        'create-cart',
        'add-items',
      ]);
    });
  });

  describe('named types', () => {
    it('extracts component schemas as named types', () => {
      const spec: OpenApiSpec = {
        ...minimalSpec,
        components: {
          schemas: {
            User: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid' },
                name: { type: 'string' },
              },
            },
          },
        },
      };

      const result = importOpenApi(spec);

      expect(result.types.has('User')).toBe(true);
      const userType = result.types.get('User')!;
      expect(userType.schema.kind).toBe('object');
    });
  });

  describe('warnings', () => {
    it('warns on unresolved references', () => {
      const spec: OpenApiSpec = {
        ...minimalSpec,
        paths: {
          '/users': {
            get: {
              operationId: 'list-users',
              parameters: [{ $ref: '#/components/parameters/NonExistent' }],
            },
          },
        },
      };

      const result = importOpenApi(spec);

      expect(result.warnings).toHaveLength(1);
      expect(result.warnings[0].message).toContain('Could not resolve parameter reference');
    });
  });

  describe('partial extraction', () => {
    it('extracts repeated header parameters as partials', () => {
      const spec: OpenApiSpec = {
        ...minimalSpec,
        paths: {
          '/users': {
            get: {
              operationId: 'list-users',
              parameters: [
                { name: 'X-Tenant-ID', in: 'header', required: true, schema: { type: 'string' } },
              ],
            },
            post: {
              operationId: 'create-user',
              parameters: [
                { name: 'X-Tenant-ID', in: 'header', required: true, schema: { type: 'string' } },
              ],
            },
          },
          '/accounts': {
            get: {
              operationId: 'list-accounts',
              parameters: [
                { name: 'X-Tenant-ID', in: 'header', required: true, schema: { type: 'string' } },
              ],
            },
          },
        },
      };

      const result = importOpenApi(spec);

      // Should extract the repeated header as a partial
      expect(result.partials.size).toBe(1);
      const partial = [...result.partials.values()][0];
      expect(partial.filePath).toContain('partials/headers/x-tenant-id.omg.md');

      // Endpoints should reference the partial
      const endpoint = result.endpoints[0];
      expect(endpoint.partials.length).toBeGreaterThan(0);
      expect(endpoint.partials[0].path).toBe('headers/x-tenant-id');
    });

    it('respects extractPartials option', () => {
      const spec: OpenApiSpec = {
        ...minimalSpec,
        paths: {
          '/users': {
            get: {
              operationId: 'list-users',
              parameters: [
                { name: 'X-Tenant-ID', in: 'header', required: true, schema: { type: 'string' } },
              ],
            },
            post: {
              operationId: 'create-user',
              parameters: [
                { name: 'X-Tenant-ID', in: 'header', required: true, schema: { type: 'string' } },
              ],
            },
          },
          '/accounts': {
            get: {
              operationId: 'list-accounts',
              parameters: [
                { name: 'X-Tenant-ID', in: 'header', required: true, schema: { type: 'string' } },
              ],
            },
          },
        },
      };

      // With extraction disabled
      const result = importOpenApi(spec, { extractPartials: false });

      expect(result.partials.size).toBe(0);
      // Endpoints should have inline blocks instead
      const endpoint = result.endpoints[0];
      expect(endpoint.partials.length).toBe(0);
      expect(endpoint.blocks.some((b) => b.type === 'omg.headers')).toBe(true);
    });

    it('respects partialThreshold option', () => {
      const spec: OpenApiSpec = {
        ...minimalSpec,
        paths: {
          '/users': {
            get: {
              operationId: 'list-users',
              parameters: [
                { name: 'X-Tenant-ID', in: 'header', required: true, schema: { type: 'string' } },
              ],
            },
            post: {
              operationId: 'create-user',
              parameters: [
                { name: 'X-Tenant-ID', in: 'header', required: true, schema: { type: 'string' } },
              ],
            },
          },
        },
      };

      // With high threshold - should not extract
      const result = importOpenApi(spec, { partialThreshold: 5 });
      expect(result.partials.size).toBe(0);

      // With low threshold - should extract
      const result2 = importOpenApi(spec, { partialThreshold: 2 });
      expect(result2.partials.size).toBe(1);
    });
  });
});
