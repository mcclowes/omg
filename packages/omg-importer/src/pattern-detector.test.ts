/**
 * Tests for pattern-detector.ts
 */

import { describe, it, expect } from 'vitest';
import { detectPatterns, findMatchingPatterns } from './pattern-detector.js';
import type { OpenApiSpec } from './types.js';

describe('detectPatterns', () => {
  const baseSpec: OpenApiSpec = {
    openapi: '3.1.0',
    info: {
      title: 'Test API',
      version: '1.0.0',
    },
    paths: {},
  };

  it('detects repeated header parameters', () => {
    const spec: OpenApiSpec = {
      ...baseSpec,
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

    const result = detectPatterns(spec, {
      categories: ['header'],
      threshold: 3,
    });

    expect(result.patterns.size).toBe(1);
    const pattern = [...result.patterns.values()][0];
    expect(pattern.parameter.name).toBe('X-Tenant-ID');
    expect(pattern.occurrences).toBe(3);
    expect(pattern.category).toBe('header');
  });

  it('detects repeated query parameters', () => {
    const spec: OpenApiSpec = {
      ...baseSpec,
      paths: {
        '/users': {
          get: {
            operationId: 'list-users',
            parameters: [
              { name: 'page', in: 'query', schema: { type: 'integer' } },
              { name: 'limit', in: 'query', schema: { type: 'integer' } },
            ],
          },
        },
        '/accounts': {
          get: {
            operationId: 'list-accounts',
            parameters: [
              { name: 'page', in: 'query', schema: { type: 'integer' } },
              { name: 'limit', in: 'query', schema: { type: 'integer' } },
            ],
          },
        },
        '/orders': {
          get: {
            operationId: 'list-orders',
            parameters: [{ name: 'page', in: 'query', schema: { type: 'integer' } }],
          },
        },
      },
    };

    const result = detectPatterns(spec, {
      categories: ['query'],
      threshold: 3,
    });

    expect(result.patterns.size).toBe(1);
    const pattern = [...result.patterns.values()][0];
    expect(pattern.parameter.name).toBe('page');
    expect(pattern.occurrences).toBe(3);
  });

  it('respects threshold', () => {
    const spec: OpenApiSpec = {
      ...baseSpec,
      paths: {
        '/users': {
          get: {
            operationId: 'list-users',
            parameters: [{ name: 'page', in: 'query', schema: { type: 'integer' } }],
          },
        },
        '/accounts': {
          get: {
            operationId: 'list-accounts',
            parameters: [{ name: 'page', in: 'query', schema: { type: 'integer' } }],
          },
        },
      },
    };

    // With threshold 3, should find nothing
    const result1 = detectPatterns(spec, {
      categories: ['query'],
      threshold: 3,
    });
    expect(result1.patterns.size).toBe(0);

    // With threshold 2, should find the pattern
    const result2 = detectPatterns(spec, {
      categories: ['query'],
      threshold: 2,
    });
    expect(result2.patterns.size).toBe(1);
  });

  it('handles path-level parameters', () => {
    const spec: OpenApiSpec = {
      ...baseSpec,
      paths: {
        '/users': {
          parameters: [
            { name: 'X-Tenant-ID', in: 'header', required: true, schema: { type: 'string' } },
          ],
          get: { operationId: 'list-users' },
          post: { operationId: 'create-user' },
          put: { operationId: 'update-user' },
        },
      },
    };

    const result = detectPatterns(spec, {
      categories: ['header'],
      threshold: 3,
    });

    expect(result.patterns.size).toBe(1);
    expect([...result.patterns.values()][0].occurrences).toBe(3);
  });

  it('filters by category', () => {
    const spec: OpenApiSpec = {
      ...baseSpec,
      paths: {
        '/users': {
          get: {
            operationId: 'list-users',
            parameters: [
              { name: 'X-Tenant-ID', in: 'header', required: true, schema: { type: 'string' } },
              { name: 'page', in: 'query', schema: { type: 'integer' } },
            ],
          },
        },
        '/accounts': {
          get: {
            operationId: 'list-accounts',
            parameters: [
              { name: 'X-Tenant-ID', in: 'header', required: true, schema: { type: 'string' } },
              { name: 'page', in: 'query', schema: { type: 'integer' } },
            ],
          },
        },
        '/orders': {
          get: {
            operationId: 'list-orders',
            parameters: [
              { name: 'X-Tenant-ID', in: 'header', required: true, schema: { type: 'string' } },
              { name: 'page', in: 'query', schema: { type: 'integer' } },
            ],
          },
        },
      },
    };

    // Only headers
    const headerResult = detectPatterns(spec, {
      categories: ['header'],
      threshold: 3,
    });
    expect(headerResult.patterns.size).toBe(1);
    expect([...headerResult.patterns.values()][0].category).toBe('header');

    // Only query
    const queryResult = detectPatterns(spec, {
      categories: ['query'],
      threshold: 3,
    });
    expect(queryResult.patterns.size).toBe(1);
    expect([...queryResult.patterns.values()][0].category).toBe('query');

    // Both
    const bothResult = detectPatterns(spec, {
      categories: ['header', 'query'],
      threshold: 3,
    });
    expect(bothResult.patterns.size).toBe(2);
  });
});

describe('findMatchingPatterns', () => {
  it('finds matching patterns', () => {
    const patterns = new Map([
      [
        'header:X-Tenant-ID:required:{"type":"string"}',
        {
          key: 'header:X-Tenant-ID:required:{"type":"string"}',
          category: 'header' as const,
          parameter: {
            name: 'X-Tenant-ID',
            in: 'header' as const,
            required: true,
            schema: { type: 'string' },
          },
          suggestedName: 'x-tenant-id',
          occurrences: 10,
          usedBy: [],
        },
      ],
    ]);

    const params = [
      { name: 'X-Tenant-ID', in: 'header' as const, required: true, schema: { type: 'string' } },
      { name: 'X-Request-ID', in: 'header' as const, schema: { type: 'string' } },
    ];

    const result = findMatchingPatterns(params, patterns);

    expect(result.matchedPatternKeys).toHaveLength(1);
    expect(result.matchedPatternKeys[0]).toBe('header:X-Tenant-ID:required:{"type":"string"}');
    expect(result.remainingParams).toHaveLength(1);
    expect(result.remainingParams[0].name).toBe('X-Request-ID');
  });

  it('returns all params when no patterns match', () => {
    const patterns = new Map<string, any>();
    const params = [{ name: 'X-Custom', in: 'header' as const, schema: { type: 'string' } }];

    const result = findMatchingPatterns(params, patterns);

    expect(result.matchedPatternKeys).toHaveLength(0);
    expect(result.remainingParams).toEqual(params);
  });
});
