/**
 * Mock Generator Tests
 */

import { describe, it, expect } from 'vitest';
import { MockGenerator } from '../src/mock-generator.js';
import type { OmgSchema } from 'omg-parser';

describe('MockGenerator', () => {
  describe('primitive types', () => {
    it('generates string values', () => {
      const generator = new MockGenerator({ seed: 12345 });
      const schema: OmgSchema = {
        kind: 'primitive',
        type: 'string',
        annotations: [],
      };

      const result = generator.generate(schema);
      expect(typeof result).toBe('string');
      expect((result as string).length).toBeGreaterThan(0);
    });

    it('generates integer values', () => {
      const generator = new MockGenerator({ seed: 12345 });
      const schema: OmgSchema = {
        kind: 'primitive',
        type: 'integer',
        annotations: [],
      };

      const result = generator.generate(schema);
      expect(typeof result).toBe('number');
      expect(Number.isInteger(result)).toBe(true);
    });

    it('generates number values', () => {
      const generator = new MockGenerator({ seed: 12345 });
      const schema: OmgSchema = {
        kind: 'primitive',
        type: 'number',
        annotations: [],
      };

      const result = generator.generate(schema);
      expect(typeof result).toBe('number');
    });

    it('generates boolean values', () => {
      const generator = new MockGenerator({ seed: 12345 });
      const schema: OmgSchema = {
        kind: 'primitive',
        type: 'boolean',
        annotations: [],
      };

      const result = generator.generate(schema);
      expect(typeof result).toBe('boolean');
    });

    it('generates date values', () => {
      const generator = new MockGenerator({ seed: 12345 });
      const schema: OmgSchema = {
        kind: 'primitive',
        type: 'date',
        annotations: [],
      };

      const result = generator.generate(schema);
      expect(typeof result).toBe('string');
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('generates datetime values', () => {
      const generator = new MockGenerator({ seed: 12345 });
      const schema: OmgSchema = {
        kind: 'primitive',
        type: 'datetime',
        annotations: [],
      };

      const result = generator.generate(schema);
      expect(typeof result).toBe('string');
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
    });

    it('generates UUID values', () => {
      const generator = new MockGenerator({ seed: 12345 });
      const schema: OmgSchema = {
        kind: 'primitive',
        type: 'uuid',
        annotations: [],
      };

      const result = generator.generate(schema);
      expect(typeof result).toBe('string');
      expect(result).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
      );
    });
  });

  describe('constraints', () => {
    it('respects minLength constraint', () => {
      const generator = new MockGenerator({ seed: 12345 });
      const schema: OmgSchema = {
        kind: 'primitive',
        type: 'string',
        annotations: [{ name: 'minLength', args: [10] }],
      };

      const result = generator.generate(schema) as string;
      expect(result.length).toBeGreaterThanOrEqual(10);
    });

    it('respects maxLength constraint', () => {
      const generator = new MockGenerator({ seed: 12345 });
      const schema: OmgSchema = {
        kind: 'primitive',
        type: 'string',
        annotations: [{ name: 'maxLength', args: [5] }],
      };

      const result = generator.generate(schema) as string;
      expect(result.length).toBeLessThanOrEqual(5);
    });

    it('respects min/max constraints for integers', () => {
      const generator = new MockGenerator({ seed: 12345 });
      const schema: OmgSchema = {
        kind: 'primitive',
        type: 'integer',
        annotations: [
          { name: 'min', args: [100] },
          { name: 'max', args: [200] },
        ],
      };

      const result = generator.generate(schema) as number;
      expect(result).toBeGreaterThanOrEqual(100);
      expect(result).toBeLessThanOrEqual(200);
    });
  });

  describe('complex types', () => {
    it('generates objects', () => {
      const generator = new MockGenerator({ seed: 12345 });
      const schema: OmgSchema = {
        kind: 'object',
        properties: {
          name: { kind: 'primitive', type: 'string', annotations: [] },
          age: { kind: 'primitive', type: 'integer', annotations: [] },
        },
        annotations: [],
      };

      const result = generator.generate(schema) as Record<string, unknown>;
      expect(typeof result).toBe('object');
      expect(typeof result.name).toBe('string');
      expect(typeof result.age).toBe('number');
    });

    it('generates arrays', () => {
      const generator = new MockGenerator({ seed: 12345, minArrayLength: 2, maxArrayLength: 5 });
      const schema: OmgSchema = {
        kind: 'array',
        items: { kind: 'primitive', type: 'string', annotations: [] },
        annotations: [],
      };

      const result = generator.generate(schema) as unknown[];
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(2);
      expect(result.length).toBeLessThanOrEqual(5);
      result.forEach((item) => expect(typeof item).toBe('string'));
    });

    it('generates enums', () => {
      const generator = new MockGenerator({ seed: 12345 });
      const schema: OmgSchema = {
        kind: 'enum',
        values: ['low', 'medium', 'high'],
        annotations: [],
      };

      const result = generator.generate(schema);
      expect(['low', 'medium', 'high']).toContain(result);
    });

    it('generates unions by picking one type', () => {
      const generator = new MockGenerator({ seed: 12345 });
      const schema: OmgSchema = {
        kind: 'union',
        types: [
          { kind: 'primitive', type: 'string', annotations: [] },
          { kind: 'primitive', type: 'integer', annotations: [] },
        ],
        annotations: [],
      };

      const result = generator.generate(schema);
      expect(['string', 'number']).toContain(typeof result);
    });
  });

  describe('deterministic generation', () => {
    it('produces same results with same seed', () => {
      const schema: OmgSchema = {
        kind: 'object',
        properties: {
          id: { kind: 'primitive', type: 'uuid', annotations: [] },
          name: { kind: 'primitive', type: 'string', annotations: [] },
          count: { kind: 'primitive', type: 'integer', annotations: [] },
        },
        annotations: [],
      };

      const generator1 = new MockGenerator({ seed: 99999 });
      const result1 = generator1.generate(schema);

      const generator2 = new MockGenerator({ seed: 99999 });
      const result2 = generator2.generate(schema);

      expect(result1).toEqual(result2);
    });
  });

  describe('type references', () => {
    it('resolves type references', () => {
      const types = {
        Address: {
          kind: 'object' as const,
          properties: {
            street: { kind: 'primitive' as const, type: 'string' as const, annotations: [] },
            city: { kind: 'primitive' as const, type: 'string' as const, annotations: [] },
          },
          annotations: [],
        },
      };

      const generator = new MockGenerator({ seed: 12345, types });
      const schema: OmgSchema = {
        kind: 'reference',
        name: 'Address',
        annotations: [],
      };

      const result = generator.generate(schema) as Record<string, unknown>;
      expect(typeof result).toBe('object');
      expect(typeof result.street).toBe('string');
      expect(typeof result.city).toBe('string');
    });
  });
});
