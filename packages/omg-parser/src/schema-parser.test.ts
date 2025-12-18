import { describe, it, expect } from 'vitest';
import { parseSchema } from './schema-parser.js';
import type { OmgIntersection, OmgUnion, OmgReference, OmgPrimitive, OmgObject } from './types.js';

describe('parseSchema - intersection types', () => {
  describe('basic intersection parsing', () => {
    it('should parse two types intersected with &', () => {
      const result = parseSchema('TypeA & TypeB');

      expect(result.kind).toBe('intersection');
      const intersection = result as OmgIntersection;
      expect(intersection.types).toHaveLength(2);
      expect((intersection.types[0] as OmgReference).name).toBe('TypeA');
      expect((intersection.types[1] as OmgReference).name).toBe('TypeB');
    });

    it('should parse three types intersected with &', () => {
      const result = parseSchema('TypeA & TypeB & TypeC');

      expect(result.kind).toBe('intersection');
      const intersection = result as OmgIntersection;
      expect(intersection.types).toHaveLength(3);
      expect((intersection.types[0] as OmgReference).name).toBe('TypeA');
      expect((intersection.types[1] as OmgReference).name).toBe('TypeB');
      expect((intersection.types[2] as OmgReference).name).toBe('TypeC');
    });

    it('should parse intersection of primitives', () => {
      const result = parseSchema('string & integer');

      expect(result.kind).toBe('intersection');
      const intersection = result as OmgIntersection;
      expect(intersection.types).toHaveLength(2);
      expect((intersection.types[0] as OmgPrimitive).type).toBe('string');
      expect((intersection.types[1] as OmgPrimitive).type).toBe('integer');
    });

    it('should parse intersection with inline objects', () => {
      const result = parseSchema('{ id: string } & { name: string }');

      expect(result.kind).toBe('intersection');
      const intersection = result as OmgIntersection;
      expect(intersection.types).toHaveLength(2);
      expect(intersection.types[0].kind).toBe('object');
      expect(intersection.types[1].kind).toBe('object');
      expect((intersection.types[0] as OmgObject).properties).toHaveProperty('id');
      expect((intersection.types[1] as OmgObject).properties).toHaveProperty('name');
    });

    it('should parse intersection of reference and inline object', () => {
      const result = parseSchema('BaseType & { extraField: boolean }');

      expect(result.kind).toBe('intersection');
      const intersection = result as OmgIntersection;
      expect(intersection.types).toHaveLength(2);
      expect((intersection.types[0] as OmgReference).name).toBe('BaseType');
      expect(intersection.types[1].kind).toBe('object');
    });
  });

  describe('operator precedence (& binds tighter than |)', () => {
    it('should parse A & B | C as (A & B) | C', () => {
      const result = parseSchema('TypeA & TypeB | TypeC');

      expect(result.kind).toBe('union');
      const union = result as OmgUnion;
      expect(union.types).toHaveLength(2);

      // First member should be intersection of A & B
      expect(union.types[0].kind).toBe('intersection');
      const intersection = union.types[0] as OmgIntersection;
      expect((intersection.types[0] as OmgReference).name).toBe('TypeA');
      expect((intersection.types[1] as OmgReference).name).toBe('TypeB');

      // Second member should be TypeC
      expect((union.types[1] as OmgReference).name).toBe('TypeC');
    });

    it('should parse A | B & C as A | (B & C)', () => {
      const result = parseSchema('TypeA | TypeB & TypeC');

      expect(result.kind).toBe('union');
      const union = result as OmgUnion;
      expect(union.types).toHaveLength(2);

      // First member should be TypeA
      expect((union.types[0] as OmgReference).name).toBe('TypeA');

      // Second member should be intersection of B & C
      expect(union.types[1].kind).toBe('intersection');
      const intersection = union.types[1] as OmgIntersection;
      expect((intersection.types[0] as OmgReference).name).toBe('TypeB');
      expect((intersection.types[1] as OmgReference).name).toBe('TypeC');
    });

    it('should parse A & B | C & D as (A & B) | (C & D)', () => {
      const result = parseSchema('TypeA & TypeB | TypeC & TypeD');

      expect(result.kind).toBe('union');
      const union = result as OmgUnion;
      expect(union.types).toHaveLength(2);

      // First member: A & B
      expect(union.types[0].kind).toBe('intersection');
      const intersection1 = union.types[0] as OmgIntersection;
      expect((intersection1.types[0] as OmgReference).name).toBe('TypeA');
      expect((intersection1.types[1] as OmgReference).name).toBe('TypeB');

      // Second member: C & D
      expect(union.types[1].kind).toBe('intersection');
      const intersection2 = union.types[1] as OmgIntersection;
      expect((intersection2.types[0] as OmgReference).name).toBe('TypeC');
      expect((intersection2.types[1] as OmgReference).name).toBe('TypeD');
    });
  });

  describe('nullable intersections', () => {
    it('should parse intersection with nullable suffix', () => {
      const result = parseSchema('TypeA & TypeB | null');

      // Should be a nullable intersection
      expect(result.kind).toBe('intersection');
      const intersection = result as OmgIntersection;
      expect(intersection.nullable).toBe(true);
      expect(intersection.types).toHaveLength(2);
    });

    it('should parse Type | null properly', () => {
      const result = parseSchema('TypeA | null');

      expect(result.kind).toBe('reference');
      expect((result as OmgReference).nullable).toBe(true);
    });

    it('should parse string | null properly', () => {
      const result = parseSchema('string | null');

      expect(result.kind).toBe('primitive');
      expect((result as OmgPrimitive).nullable).toBe(true);
    });
  });

  describe('complex intersection scenarios', () => {
    it('should parse nested objects in intersection', () => {
      const result = parseSchema('{ user: { id: string } } & { profile: { name: string } }');

      expect(result.kind).toBe('intersection');
      const intersection = result as OmgIntersection;
      expect(intersection.types).toHaveLength(2);

      const obj1 = intersection.types[0] as OmgObject;
      expect(obj1.properties).toHaveProperty('user');
      expect((obj1.properties.user as OmgObject).properties).toHaveProperty('id');

      const obj2 = intersection.types[1] as OmgObject;
      expect(obj2.properties).toHaveProperty('profile');
    });

    it('should parse intersection in array items', () => {
      const result = parseSchema('[TypeA & TypeB]');

      expect(result.kind).toBe('array');
      expect(result.kind === 'array' && result.items.kind).toBe('intersection');
    });

    it('should parse intersection in object property', () => {
      const result = parseSchema('{ data: TypeA & TypeB }');

      expect(result.kind).toBe('object');
      const obj = result as OmgObject;
      expect(obj.properties.data.kind).toBe('intersection');
    });

    it('should parse union containing intersections as members', () => {
      const result = parseSchema('TypeA & TypeB | TypeC & TypeD | TypeE');

      expect(result.kind).toBe('union');
      const union = result as OmgUnion;
      expect(union.types).toHaveLength(3);

      // First: A & B
      expect(union.types[0].kind).toBe('intersection');

      // Second: C & D
      expect(union.types[1].kind).toBe('intersection');

      // Third: E (simple reference)
      expect(union.types[2].kind).toBe('reference');
      expect((union.types[2] as OmgReference).name).toBe('TypeE');
    });
  });
});

describe('parseSchema - existing functionality preserved', () => {
  it('should still parse simple types', () => {
    expect(parseSchema('string').kind).toBe('primitive');
    expect(parseSchema('User').kind).toBe('reference');
  });

  it('should still parse unions without intersections', () => {
    const result = parseSchema('TypeA | TypeB');
    expect(result.kind).toBe('union');
  });

  it('should still parse enums', () => {
    const result = parseSchema('"a" | "b" | "c"');
    expect(result.kind).toBe('enum');
  });

  it('should still parse arrays', () => {
    const result = parseSchema('[string]');
    expect(result.kind).toBe('array');
  });

  it('should still parse objects', () => {
    const result = parseSchema('{ id: string, name: string }');
    expect(result.kind).toBe('object');
  });

  it('should still parse optional fields', () => {
    const result = parseSchema('{ id: string, name?: string }');
    expect(result.kind).toBe('object');
    const obj = result as OmgObject;
    expect(obj.properties.name.optional).toBe(true);
  });
});
