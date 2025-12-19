/**
 * Tests for generator.ts
 */

import { describe, it, expect } from 'vitest';
import { generateDocument, generateSchema } from './generator.js';
import type { OmgDocument, EndpointFrontMatter, ApiFrontMatter, OmgSchema } from 'omg-parser';

describe('generateDocument', () => {
  it('generates API document with front matter', () => {
    const doc: OmgDocument = {
      filePath: 'api.omg.md',
      frontMatter: {
        name: 'Test API',
        version: '1.0.0',
        baseUrl: 'https://api.example.com',
      } as ApiFrontMatter,
      title: 'Test API',
      description: 'A test API for demonstration.',
      blocks: [],
      partials: [],
    };

    const result = generateDocument(doc);

    expect(result).toContain('---');
    expect(result).toContain('name: Test API');
    expect(result).toContain('version: 1.0.0');
    expect(result).toContain('baseUrl: https://api.example.com');
    expect(result).toContain('# Test API');
    expect(result).toContain('A test API for demonstration.');
  });

  it('generates endpoint document', () => {
    const doc: OmgDocument = {
      filePath: 'endpoints/get-user.omg.md',
      frontMatter: {
        method: 'GET',
        path: '/users/{id}',
        operationId: 'get-user',
        tags: ['Users'],
      } as EndpointFrontMatter,
      title: 'Get User',
      description: 'Retrieve a user by ID.',
      blocks: [
        {
          type: 'omg.path',
          content: '',
          parsed: {
            kind: 'object',
            properties: {
              id: {
                kind: 'primitive',
                type: 'uuid',
                annotations: [],
                description: 'User ID',
              },
            },
            annotations: [],
          },
          line: 0,
        },
        {
          type: 'omg.response',
          content: '',
          parsed: {
            kind: 'object',
            properties: {
              id: { kind: 'primitive', type: 'uuid', annotations: [] },
              name: { kind: 'primitive', type: 'string', annotations: [] },
            },
            annotations: [],
          },
          line: 0,
        },
      ],
      partials: [],
    };

    const result = generateDocument(doc);

    expect(result).toContain('method: GET');
    expect(result).toContain('path: /users/{id}');
    expect(result).toContain('operationId: get-user');
    expect(result).toContain('```omg.path');
    expect(result).toContain('```omg.response');
    expect(result).toContain('id: uuid');
    expect(result).toContain('name: string');
  });

  it('generates status code specific responses', () => {
    const doc: OmgDocument = {
      filePath: 'endpoints/get-user.omg.md',
      frontMatter: {
        method: 'GET',
        path: '/users/{id}',
        operationId: 'get-user',
      } as EndpointFrontMatter,
      title: 'Get User',
      description: '',
      blocks: [
        {
          type: 'omg.response',
          statusCode: 404,
          content: '',
          parsed: {
            kind: 'object',
            properties: {
              error: { kind: 'primitive', type: 'string', annotations: [] },
            },
            annotations: [],
          },
          line: 0,
        },
      ],
      partials: [],
    };

    const result = generateDocument(doc);

    expect(result).toContain('```omg.response.404');
  });
});

describe('generateSchema', () => {
  const opts = { indent: 2 };

  describe('primitives', () => {
    it('generates primitive types', () => {
      const schema: OmgSchema = {
        kind: 'primitive',
        type: 'string',
        annotations: [],
      };

      expect(generateSchema(schema, opts, 0)).toBe('string');
    });

    it('generates primitive with nullable', () => {
      const schema: OmgSchema = {
        kind: 'primitive',
        type: 'string',
        nullable: true,
        annotations: [],
      };

      expect(generateSchema(schema, opts, 0)).toBe('string | null');
    });

    it('generates primitive with annotations', () => {
      const schema: OmgSchema = {
        kind: 'primitive',
        type: 'string',
        annotations: [
          { name: 'minLength', args: [1] },
          { name: 'maxLength', args: [100] },
        ],
      };

      expect(generateSchema(schema, opts, 0)).toBe('string @minLength(1) @maxLength(100)');
    });

    it('generates uuid type', () => {
      const schema: OmgSchema = {
        kind: 'primitive',
        type: 'uuid',
        annotations: [],
      };

      expect(generateSchema(schema, opts, 0)).toBe('uuid');
    });
  });

  describe('objects', () => {
    it('generates simple object', () => {
      const schema: OmgSchema = {
        kind: 'object',
        properties: {
          id: { kind: 'primitive', type: 'uuid', annotations: [] },
          name: { kind: 'primitive', type: 'string', annotations: [] },
        },
        annotations: [],
      };

      const result = generateSchema(schema, opts, 0);

      expect(result).toContain('{');
      expect(result).toContain('}');
      expect(result).toContain('id: uuid');
      expect(result).toContain('name: string');
    });

    it('generates optional fields', () => {
      const schema: OmgSchema = {
        kind: 'object',
        properties: {
          required: { kind: 'primitive', type: 'string', annotations: [] },
          optional: { kind: 'primitive', type: 'string', optional: true, annotations: [] },
        },
        annotations: [],
      };

      const result = generateSchema(schema, opts, 0);

      expect(result).toContain('required: string');
      expect(result).toContain('optional?: string');
    });

    it('generates field descriptions as comments', () => {
      const schema: OmgSchema = {
        kind: 'object',
        properties: {
          id: {
            kind: 'primitive',
            type: 'uuid',
            annotations: [],
            description: 'Unique identifier',
          },
        },
        annotations: [],
      };

      const result = generateSchema(schema, opts, 0);

      expect(result).toContain('// Unique identifier');
    });
  });

  describe('arrays', () => {
    it('generates array with simple items', () => {
      const schema: OmgSchema = {
        kind: 'array',
        items: { kind: 'primitive', type: 'string', annotations: [] },
        annotations: [],
      };

      expect(generateSchema(schema, opts, 0)).toBe('string[]');
    });

    it('generates array with annotations', () => {
      const schema: OmgSchema = {
        kind: 'array',
        items: { kind: 'primitive', type: 'string', annotations: [] },
        annotations: [{ name: 'minItems', args: [1] }],
      };

      expect(generateSchema(schema, opts, 0)).toBe('string[] @minItems(1)');
    });
  });

  describe('enums', () => {
    it('generates string enum', () => {
      const schema: OmgSchema = {
        kind: 'enum',
        values: ['draft', 'published', 'archived'],
        annotations: [],
      };

      expect(generateSchema(schema, opts, 0)).toBe('"draft" | "published" | "archived"');
    });

    it('generates number enum', () => {
      const schema: OmgSchema = {
        kind: 'enum',
        values: [1, 2, 3],
        annotations: [],
      };

      expect(generateSchema(schema, opts, 0)).toBe('1 | 2 | 3');
    });
  });

  describe('unions', () => {
    it('generates union type', () => {
      const schema: OmgSchema = {
        kind: 'union',
        types: [
          { kind: 'primitive', type: 'string', annotations: [] },
          { kind: 'primitive', type: 'integer', annotations: [] },
        ],
        annotations: [],
      };

      expect(generateSchema(schema, opts, 0)).toBe('string | integer');
    });
  });

  describe('intersections', () => {
    it('generates intersection type', () => {
      const schema: OmgSchema = {
        kind: 'intersection',
        types: [
          { kind: 'reference', name: 'BaseEntity', annotations: [] },
          { kind: 'reference', name: 'UserFields', annotations: [] },
        ],
        annotations: [],
      };

      expect(generateSchema(schema, opts, 0)).toBe('BaseEntity & UserFields');
    });
  });

  describe('references', () => {
    it('generates reference type', () => {
      const schema: OmgSchema = {
        kind: 'reference',
        name: 'User',
        annotations: [],
      };

      expect(generateSchema(schema, opts, 0)).toBe('User');
    });

    it('generates nullable reference', () => {
      const schema: OmgSchema = {
        kind: 'reference',
        name: 'User',
        nullable: true,
        annotations: [],
      };

      expect(generateSchema(schema, opts, 0)).toBe('User | null');
    });
  });
});
