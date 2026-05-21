/**
 * Tests for importer.ts
 */

import { describe, it, expect } from 'vitest';
import { importOpenApi } from './importer.js';
import type { OpenApiSpec, SchemaObject } from './types.js';

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

  describe('dereferenced inputs', () => {
    // Regression for #81: when the input spec has been fully dereferenced
    // (so usage sites contain anonymous structural copies instead of $refs)
    // but components.schemas is still populated, the importer should match
    // inline shapes against named components and emit references.
    const userSchema: SchemaObject = {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
      },
      required: ['id', 'name'],
    };

    it('replaces inline body schemas matching a named component with a reference', () => {
      const spec: OpenApiSpec = {
        ...minimalSpec,
        paths: {
          '/users': {
            post: {
              operationId: 'create-user',
              requestBody: {
                content: {
                  'application/json': {
                    schema: structuredClone(userSchema),
                  },
                },
              },
            },
          },
        },
        components: {
          schemas: { User: structuredClone(userSchema) },
        },
      };

      const result = importOpenApi(spec);

      const body = result.endpoints[0].blocks.find((b) => b.type === 'omg.body');
      expect(body?.parsed?.kind).toBe('reference');
      expect((body?.parsed as any).name).toBe('User');
    });

    it('replaces inline response schemas matching a named component with a reference', () => {
      const spec: OpenApiSpec = {
        ...minimalSpec,
        paths: {
          '/users/{id}': {
            get: {
              operationId: 'get-user',
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': {
                      schema: structuredClone(userSchema),
                    },
                  },
                },
              },
            },
          },
        },
        components: {
          schemas: { User: structuredClone(userSchema) },
        },
      };

      const result = importOpenApi(spec);

      const response = result.endpoints[0].blocks.find((b) => b.type === 'omg.response');
      expect(response?.parsed?.kind).toBe('reference');
      expect((response?.parsed as any).name).toBe('User');
    });

    it('replaces inline array items matching a named component', () => {
      const spec: OpenApiSpec = {
        ...minimalSpec,
        paths: {
          '/users': {
            post: {
              operationId: 'bulk-create-users',
              requestBody: {
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        users: {
                          type: 'array',
                          items: structuredClone(userSchema),
                        },
                      },
                      required: ['users'],
                    },
                  },
                },
              },
            },
          },
        },
        components: {
          schemas: { User: structuredClone(userSchema) },
        },
      };

      const result = importOpenApi(spec);

      const body = result.endpoints[0].blocks.find((b) => b.type === 'omg.body');
      const usersField = (body?.parsed as any).properties.users;
      expect(usersField.kind).toBe('array');
      expect(usersField.items.kind).toBe('reference');
      expect(usersField.items.name).toBe('User');
    });

    it('preserves the named type definition itself instead of collapsing to a self-reference', () => {
      const spec: OpenApiSpec = {
        ...minimalSpec,
        components: {
          schemas: { User: structuredClone(userSchema) },
        },
      };

      const result = importOpenApi(spec);

      const userType = result.types.get('User');
      expect(userType?.schema.kind).toBe('object');
    });

    it('replaces sub-schemas of a named type with references to other named types', () => {
      const child: SchemaObject = {
        type: 'object',
        properties: { value: { type: 'string' } },
        required: ['value'],
      };
      const spec: OpenApiSpec = {
        ...minimalSpec,
        components: {
          schemas: {
            Child: structuredClone(child),
            Parent: {
              oneOf: [
                structuredClone(child),
                {
                  type: 'object',
                  properties: { extra: { type: 'integer' } },
                  required: ['extra'],
                },
              ],
            },
          },
        },
      };

      const result = importOpenApi(spec);

      const parentType = result.types.get('Parent');
      expect(parentType?.schema.kind).toBe('union');
      const types = (parentType?.schema as any).types;
      expect(types.some((t: any) => t.kind === 'reference' && t.name === 'Child')).toBe(true);
    });

    describe('dereferenced-input warning', () => {
      // #81 fix #2: detect a fully dereferenced input (components.schemas
      // populated but zero $ref anywhere) and recommend bundling instead.
      it('warns when components.schemas is populated but no $ref is used', () => {
        const spec: OpenApiSpec = {
          ...minimalSpec,
          paths: {
            '/users': {
              post: {
                operationId: 'create-user',
                requestBody: {
                  content: {
                    'application/json': { schema: structuredClone(userSchema) },
                  },
                },
              },
            },
          },
          components: {
            schemas: { User: structuredClone(userSchema) },
          },
        };

        const result = importOpenApi(spec);

        const warning = result.warnings.find((w) => w.message.includes('fully dereferenced'));
        expect(warning).toBeDefined();
        expect(warning?.message).toContain('redocly bundle');
      });

      it('does not warn when the spec uses $ref (a bundled input)', () => {
        const spec: OpenApiSpec = {
          ...minimalSpec,
          paths: {
            '/users': {
              post: {
                operationId: 'create-user',
                requestBody: {
                  content: {
                    'application/json': {
                      schema: { $ref: '#/components/schemas/User' },
                    },
                  },
                },
              },
            },
          },
          components: {
            schemas: { User: structuredClone(userSchema) },
          },
        };

        const result = importOpenApi(spec);

        expect(result.warnings.some((w) => w.message.includes('fully dereferenced'))).toBe(false);
      });

      it('does not warn when there are no component schemas', () => {
        const result = importOpenApi(minimalSpec);

        expect(result.warnings.some((w) => w.message.includes('fully dereferenced'))).toBe(false);
      });

      it('does not warn when inlineRefs is requested', () => {
        const spec: OpenApiSpec = {
          ...minimalSpec,
          components: {
            schemas: { User: structuredClone(userSchema) },
          },
        };

        const result = importOpenApi(spec, { inlineRefs: true });

        expect(result.warnings.some((w) => w.message.includes('fully dereferenced'))).toBe(false);
      });
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

  describe('endpoint filename collisions', () => {
    it('POST and PATCH on the same path produce distinct filenames', () => {
      // Regression: previously POST mapped to `update` when the path had an
      // id param, colliding with PATCH on the same path. The collision
      // silently overwrote one of the generated files (saw this on Weavr's
      // Multi API where POST and PATCH /managed_cards/{id}/spend_rules both
      // produced spend-rule-update.omg.md).
      const spec: OpenApiSpec = {
        ...minimalSpec,
        paths: {
          '/accounts/{id}/rules': {
            get: { operationId: 'rules-get' },
            post: { operationId: 'rules-create' },
            patch: { operationId: 'rules-update' },
            delete: { operationId: 'rules-delete' },
          },
        },
      };

      const result = importOpenApi(spec);
      const paths = result.endpoints.map((e) => e.filePath).sort();

      // All four methods must produce distinct file paths
      expect(new Set(paths).size).toBe(4);
      expect(paths.some((p) => p.endsWith('rule-create.omg.md'))).toBe(true);
      expect(paths.some((p) => p.endsWith('rule-update.omg.md'))).toBe(true);
      expect(paths.some((p) => p.endsWith('rule-get.omg.md'))).toBe(true);
      expect(paths.some((p) => p.endsWith('rule-delete.omg.md'))).toBe(true);
    });
  });

  describe('per-endpoint security deduplication', () => {
    const securedSpec = (operationSecurity?: unknown): OpenApiSpec => ({
      ...minimalSpec,
      security: [{ 'api-key': [], auth_token: [] }],
      paths: {
        '/users': {
          get: {
            operationId: 'list-users',
            ...(operationSecurity !== undefined ? { security: operationSecurity } : {}),
          } as any,
        },
      },
    });

    it('omits per-endpoint security identical to global security', () => {
      const result = importOpenApi(securedSpec([{ 'api-key': [], auth_token: [] }]));
      expect((result.endpoints[0].frontMatter as any).security).toBeUndefined();
    });

    it('omits per-endpoint security identical to global despite key/scope order', () => {
      const result = importOpenApi(securedSpec([{ auth_token: [], 'api-key': [] }]));
      expect((result.endpoints[0].frontMatter as any).security).toBeUndefined();
    });

    it('keeps per-endpoint security when it differs from global', () => {
      const override = [{ 'admin-key': ['write'] }];
      const result = importOpenApi(securedSpec(override));
      expect((result.endpoints[0].frontMatter as any).security).toEqual(override);
    });

    it('keeps an explicit empty security override against non-empty global', () => {
      const result = importOpenApi(securedSpec([]));
      expect((result.endpoints[0].frontMatter as any).security).toEqual([]);
    });

    it('omits an empty security array when there is no global security', () => {
      const spec: OpenApiSpec = {
        ...minimalSpec,
        paths: {
          '/users': {
            get: { operationId: 'list-users', security: [] } as any,
          },
        },
      };
      const result = importOpenApi(spec);
      expect((result.endpoints[0].frontMatter as any).security).toBeUndefined();
    });

    it('keeps per-endpoint security when there is no global security', () => {
      const spec: OpenApiSpec = {
        ...minimalSpec,
        paths: {
          '/users': {
            get: { operationId: 'list-users', security: [{ 'api-key': [] }] } as any,
          },
        },
      };
      const result = importOpenApi(spec);
      expect((result.endpoints[0].frontMatter as any).security).toEqual([{ 'api-key': [] }]);
    });
  });

  describe('dropped discriminator warning', () => {
    const cardSchema = (): OpenApiSpec['components'] => ({
      schemas: {
        ManagedCard: {
          oneOf: [
            { $ref: '#/components/schemas/DebitCard' },
            { $ref: '#/components/schemas/PrepaidCard' },
          ],
          discriminator: {
            propertyName: 'mode',
            mapping: {
              DEBIT: '#/components/schemas/DebitCard',
              PREPAID: '#/components/schemas/PrepaidCard',
            },
          },
        },
        DebitCard: { type: 'object', properties: { mode: { type: 'string' } } },
        PrepaidCard: { type: 'object', properties: { mode: { type: 'string' } } },
      },
    });

    it('warns when a component schema declares a discriminator', () => {
      const result = importOpenApi({ ...minimalSpec, components: cardSchema() });

      const warning = result.warnings.find((w) => w.message.includes('discriminator'));
      expect(warning).toBeDefined();
      expect(warning!.message).toContain('ManagedCard');
    });

    it('does not warn when no schema declares a discriminator', () => {
      const result = importOpenApi({
        ...minimalSpec,
        components: {
          schemas: {
            Plain: { type: 'object', properties: { id: { type: 'string' } } },
          },
        },
      });

      expect(result.warnings.some((w) => w.message.includes('discriminator'))).toBe(false);
    });

    it('still imports the oneOf as a union despite the dropped discriminator', () => {
      const result = importOpenApi({ ...minimalSpec, components: cardSchema() });

      const managedCard = result.types.get('ManagedCard');
      expect(managedCard?.schema.kind).toBe('union');
    });
  });

  describe('repeated response extraction', () => {
    const errorResponse = { description: 'Unauthorized' };

    const specWithSharedErrors = (count: number): OpenApiSpec => {
      const paths: OpenApiSpec['paths'] = {};
      for (let i = 0; i < count; i++) {
        paths[`/resource-${i}`] = {
          get: {
            operationId: `get-resource-${i}`,
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: { type: 'object', properties: { [`field${i}`]: { type: 'string' } } },
                  },
                },
              },
              '401': errorResponse,
            },
          },
        };
      }
      return { ...minimalSpec, paths };
    };

    it('lifts an error response repeated across endpoints into a partial', () => {
      const result = importOpenApi(specWithSharedErrors(4));

      expect(result.partials.has('responses/401')).toBe(true);
      for (const endpoint of result.endpoints) {
        // The shared 401 block is gone; the unique 200 stays inline.
        const responseBlocks = endpoint.blocks.filter((b) => b.type === 'omg.response');
        expect(responseBlocks.every((b) => b.statusCode !== 401)).toBe(true);
        expect(endpoint.partials.some((p) => p.path === 'responses/401')).toBe(true);
      }
    });

    it('keeps responses inline when extraction is disabled', () => {
      const result = importOpenApi(specWithSharedErrors(4), { extractPartials: false });

      expect(result.partials.has('responses/401')).toBe(false);
      const has401 = result.endpoints[0].blocks.some(
        (b) => b.type === 'omg.response' && b.statusCode === 401
      );
      expect(has401).toBe(true);
    });

    it('leaves responses inline when they do not meet the threshold', () => {
      const result = importOpenApi(specWithSharedErrors(2), { partialThreshold: 3 });

      expect(result.partials.has('responses/401')).toBe(false);
      const has401 = result.endpoints[0].blocks.some(
        (b) => b.type === 'omg.response' && b.statusCode === 401
      );
      expect(has401).toBe(true);
    });
  });
});
