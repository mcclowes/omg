import { describe, it, expect } from 'vitest';
import { compileToOpenApi } from './openapi.js';
import type { ParsedApi, OmgIntersection, OmgReference, OmgObject } from 'omg-parser';

function createMinimalApi(types: ParsedApi['types'] = {}): ParsedApi {
  return {
    name: 'Test API',
    version: '1.0.0',
    baseUrl: 'https://api.example.com',
    description: 'Test API',
    endpoints: [],
    types,
  };
}

describe('compileToOpenApi - intersection types', () => {
  it('should compile intersection of two references to allOf', () => {
    const intersection: OmgIntersection = {
      kind: 'intersection',
      types: [
        { kind: 'reference', name: 'TypeA', annotations: [] },
        { kind: 'reference', name: 'TypeB', annotations: [] },
      ],
      annotations: [],
    };

    const api = createMinimalApi({
      TypeA: {
        kind: 'object',
        properties: { id: { kind: 'primitive', type: 'string', annotations: [] } },
        annotations: [],
      },
      TypeB: {
        kind: 'object',
        properties: { name: { kind: 'primitive', type: 'string', annotations: [] } },
        annotations: [],
      },
      CombinedType: intersection,
    });

    const result = compileToOpenApi(api);

    expect(result.components?.schemas?.CombinedType).toBeDefined();
    const schema = result.components?.schemas?.CombinedType;
    expect(schema?.allOf).toBeDefined();
    expect(schema?.allOf).toHaveLength(2);
    expect(schema?.allOf?.[0].$ref).toBe('#/components/schemas/TypeA');
    expect(schema?.allOf?.[1].$ref).toBe('#/components/schemas/TypeB');
  });

  it('should compile intersection with inline objects to allOf', () => {
    const intersection: OmgIntersection = {
      kind: 'intersection',
      types: [
        {
          kind: 'object',
          properties: { id: { kind: 'primitive', type: 'string', annotations: [] } },
          annotations: [],
        },
        {
          kind: 'object',
          properties: { name: { kind: 'primitive', type: 'string', annotations: [] } },
          annotations: [],
        },
      ],
      annotations: [],
    };

    const api = createMinimalApi({ MergedType: intersection });
    const result = compileToOpenApi(api);

    const schema = result.components?.schemas?.MergedType;
    expect(schema?.allOf).toBeDefined();
    expect(schema?.allOf).toHaveLength(2);
    expect(schema?.allOf?.[0].type).toBe('object');
    expect(schema?.allOf?.[0].properties?.id).toBeDefined();
    expect(schema?.allOf?.[1].type).toBe('object');
    expect(schema?.allOf?.[1].properties?.name).toBeDefined();
  });

  it('should compile nullable intersection', () => {
    const intersection: OmgIntersection = {
      kind: 'intersection',
      types: [
        { kind: 'reference', name: 'TypeA', annotations: [] },
        { kind: 'reference', name: 'TypeB', annotations: [] },
      ],
      nullable: true,
      annotations: [],
    };

    const api = createMinimalApi({
      TypeA: { kind: 'object', properties: {}, annotations: [] },
      TypeB: { kind: 'object', properties: {}, annotations: [] },
      NullableIntersection: intersection,
    });

    const result = compileToOpenApi(api);
    const schema = result.components?.schemas?.NullableIntersection;

    expect(schema?.nullable).toBe(true);
    expect(schema?.allOf).toHaveLength(2);
  });

  it('should compile three-way intersection', () => {
    const intersection: OmgIntersection = {
      kind: 'intersection',
      types: [
        { kind: 'reference', name: 'TypeA', annotations: [] },
        { kind: 'reference', name: 'TypeB', annotations: [] },
        { kind: 'reference', name: 'TypeC', annotations: [] },
      ],
      annotations: [],
    };

    const api = createMinimalApi({
      TypeA: { kind: 'object', properties: {}, annotations: [] },
      TypeB: { kind: 'object', properties: {}, annotations: [] },
      TypeC: { kind: 'object', properties: {}, annotations: [] },
      TripleIntersection: intersection,
    });

    const result = compileToOpenApi(api);
    const schema = result.components?.schemas?.TripleIntersection;

    expect(schema?.allOf).toHaveLength(3);
  });

  it('should properly handle intersection in endpoint response', () => {
    const intersection: OmgIntersection = {
      kind: 'intersection',
      types: [
        { kind: 'reference', name: 'BaseResponse', annotations: [] },
        {
          kind: 'object',
          properties: { data: { kind: 'primitive', type: 'string', annotations: [] } },
          annotations: [],
        },
      ],
      annotations: [],
    };

    const api: ParsedApi = {
      name: 'Test API',
      version: '1.0.0',
      baseUrl: 'https://api.example.com',
      description: 'Test API',
      endpoints: [
        {
          method: 'GET',
          path: '/test',
          operationId: 'get-test',
          tags: [],
          summary: 'Test endpoint',
          description: '',
          deprecated: false,
          follows: [],
          webhooks: {},
          parameters: { path: null, query: null, headers: null },
          requestBody: null,
          responses: {
            200: { schema: intersection },
          },
        },
      ],
      types: {
        BaseResponse: {
          kind: 'object',
          properties: { status: { kind: 'primitive', type: 'string', annotations: [] } },
          annotations: [],
        },
      },
    };

    const result = compileToOpenApi(api);

    const responseSchema =
      result.paths['/test']?.get?.responses?.['200']?.content?.['application/json']?.schema;
    expect(responseSchema?.allOf).toBeDefined();
    expect(responseSchema?.allOf).toHaveLength(2);
  });
});

describe('compileToOpenApi - unions still work', () => {
  it('should compile unions to oneOf', () => {
    const api = createMinimalApi({
      UnionType: {
        kind: 'union',
        types: [
          { kind: 'reference', name: 'TypeA', annotations: [] },
          { kind: 'reference', name: 'TypeB', annotations: [] },
        ],
        annotations: [],
      },
      TypeA: { kind: 'object', properties: {}, annotations: [] },
      TypeB: { kind: 'object', properties: {}, annotations: [] },
    });

    const result = compileToOpenApi(api);
    const schema = result.components?.schemas?.UnionType;

    expect(schema?.oneOf).toBeDefined();
    expect(schema?.oneOf).toHaveLength(2);
  });
});
