import { describe, it, expect } from 'vitest';
import { buildRequest, extractEndpoints } from './request-builder.js';
import type { EndpointSpec } from './types.js';

function endpoint(overrides: Partial<EndpointSpec> = {}): EndpointSpec {
  return {
    operationId: 'op',
    method: 'GET',
    path: '/things',
    parameters: [],
    responses: { '200': { description: 'ok' } },
    ...overrides,
  };
}

describe('buildRequest', () => {
  it('joins the base URL and path, trimming a trailing slash', () => {
    const result = buildRequest(endpoint(), { baseUrl: 'https://api.test/' });
    expect(result.request?.url).toBe('https://api.test/things');
  });

  it('substitutes path parameters from env values', () => {
    const ep = endpoint({
      path: '/things/{thingId}',
      parameters: [{ name: 'thingId', in: 'path', required: true, schema: { type: 'string' } }],
    });
    const result = buildRequest(ep, { baseUrl: 'https://api.test', env: { thingId: '42' } });
    expect(result.request?.url).toBe('https://api.test/things/42');
  });

  it('returns an error when a required path parameter cannot be resolved', () => {
    const ep = endpoint({
      path: '/things/{thingId}',
      parameters: [{ name: 'thingId', in: 'path', required: true, schema: { type: 'object' } }],
    });
    const result = buildRequest(ep, { baseUrl: 'https://api.test' });
    expect(result.request).toBeUndefined();
    expect(result.missingParams).toContain('path.thingId');
  });

  it('appends required query parameters with declared examples', () => {
    const ep = endpoint({
      parameters: [
        { name: 'limit', in: 'query', required: true, schema: { type: 'integer' }, example: 10 },
      ],
    });
    const result = buildRequest(ep, { baseUrl: 'https://api.test' });
    expect(result.request?.url).toBe('https://api.test/things?limit=10');
  });

  it('adds a bearer Authorization header', () => {
    const result = buildRequest(endpoint(), {
      baseUrl: 'https://api.test',
      auth: { type: 'bearer', value: 'tok' },
    });
    expect(result.request?.headers.Authorization).toBe('Bearer tok');
  });

  it('adds a custom header for header-type auth', () => {
    const result = buildRequest(endpoint(), {
      baseUrl: 'https://api.test',
      auth: { type: 'header', headerName: 'X-API-Key', value: 'secret' },
    });
    expect(result.request?.headers['X-API-Key']).toBe('secret');
  });

  it('serializes a request body from its example', () => {
    const ep = endpoint({
      method: 'POST',
      requestBody: { required: true, schema: { type: 'object' }, example: { name: 'a' } },
    });
    const result = buildRequest(ep, { baseUrl: 'https://api.test' });
    expect(result.request?.body).toBe('{"name":"a"}');
    expect(result.request?.headers['Content-Type']).toBe('application/json');
  });

  it('flags a required body with no example as missing', () => {
    const ep = endpoint({
      method: 'POST',
      requestBody: { required: true, schema: { type: 'object' } },
    });
    const result = buildRequest(ep, { baseUrl: 'https://api.test' });
    expect(result.missingParams).toContain('body');
  });
});

describe('extractEndpoints', () => {
  it('extracts an operation per method with parameters and responses', () => {
    const endpoints = extractEndpoints({
      paths: {
        '/users/{id}': {
          get: {
            operationId: 'get-user',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: {
              '200': {
                description: 'ok',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } },
              },
            },
          },
        },
      },
      components: { schemas: { User: { type: 'object', required: ['id'] } } },
    });

    expect(endpoints).toHaveLength(1);
    expect(endpoints[0].operationId).toBe('get-user');
    expect(endpoints[0].method).toBe('GET');
    expect(endpoints[0].parameters[0].name).toBe('id');
    // $ref should be resolved against components.schemas
    expect(endpoints[0].responses['200'].schema).toMatchObject({ type: 'object' });
  });

  it('falls back to a generated operationId when none is declared', () => {
    const endpoints = extractEndpoints({
      paths: { '/health': { get: { responses: { '200': { description: 'ok' } } } } },
    });
    expect(endpoints[0].operationId).toBe('get-/health');
  });
});
