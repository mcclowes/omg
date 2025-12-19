/**
 * Tests for schema-converter.ts
 */
import { describe, it, expect } from 'vitest';
import { convertSchema, createConversionContext } from './schema-converter.js';
describe('convertSchema', () => {
    const ctx = createConversionContext();
    describe('primitives', () => {
        it('converts string type', () => {
            const schema = { type: 'string' };
            const result = convertSchema(schema, ctx);
            expect(result).toEqual({
                kind: 'primitive',
                type: 'string',
                nullable: false,
                annotations: [],
                description: undefined,
            });
        });
        it('converts integer type', () => {
            const schema = { type: 'integer' };
            const result = convertSchema(schema, ctx);
            expect(result.kind).toBe('primitive');
            expect(result.type).toBe('integer');
        });
        it('converts number type', () => {
            const schema = { type: 'number' };
            const result = convertSchema(schema, ctx);
            expect(result.kind).toBe('primitive');
            expect(result.type).toBe('number');
        });
        it('converts boolean type', () => {
            const schema = { type: 'boolean' };
            const result = convertSchema(schema, ctx);
            expect(result.kind).toBe('primitive');
            expect(result.type).toBe('boolean');
        });
    });
    describe('special formats', () => {
        it('converts uuid format to uuid primitive', () => {
            const schema = { type: 'string', format: 'uuid' };
            const result = convertSchema(schema, ctx);
            expect(result.kind).toBe('primitive');
            expect(result.type).toBe('uuid');
        });
        it('converts date format to date primitive', () => {
            const schema = { type: 'string', format: 'date' };
            const result = convertSchema(schema, ctx);
            expect(result.kind).toBe('primitive');
            expect(result.type).toBe('date');
        });
        it('converts date-time format to datetime primitive', () => {
            const schema = { type: 'string', format: 'date-time' };
            const result = convertSchema(schema, ctx);
            expect(result.kind).toBe('primitive');
            expect(result.type).toBe('datetime');
        });
        it('converts decimal format to decimal primitive', () => {
            const schema = { type: 'number', format: 'decimal' };
            const result = convertSchema(schema, ctx);
            expect(result.kind).toBe('primitive');
            expect(result.type).toBe('decimal');
        });
    });
    describe('nullable handling', () => {
        it('handles nullable: true (OpenAPI 3.0)', () => {
            const schema = { type: 'string', nullable: true };
            const result = convertSchema(schema, ctx);
            expect(result.nullable).toBe(true);
        });
        it('handles type array with null (OpenAPI 3.1)', () => {
            const schema = { type: ['string', 'null'] };
            const result = convertSchema(schema, ctx);
            expect(result.nullable).toBe(true);
        });
    });
    describe('annotations', () => {
        it('converts minimum/maximum to annotations', () => {
            const schema = { type: 'integer', minimum: 0, maximum: 100 };
            const result = convertSchema(schema, ctx);
            expect(result.annotations).toContainEqual({ name: 'min', args: [0] });
            expect(result.annotations).toContainEqual({ name: 'max', args: [100] });
        });
        it('converts minLength/maxLength to annotations', () => {
            const schema = { type: 'string', minLength: 1, maxLength: 50 };
            const result = convertSchema(schema, ctx);
            expect(result.annotations).toContainEqual({ name: 'minLength', args: [1] });
            expect(result.annotations).toContainEqual({ name: 'maxLength', args: [50] });
        });
        it('converts pattern to annotation', () => {
            const schema = { type: 'string', pattern: '^[a-z]+$' };
            const result = convertSchema(schema, ctx);
            expect(result.annotations).toContainEqual({ name: 'pattern', args: ['^[a-z]+$'] });
        });
    });
    describe('objects', () => {
        it('converts simple object', () => {
            const schema = {
                type: 'object',
                properties: {
                    id: { type: 'string', format: 'uuid' },
                    name: { type: 'string' },
                },
                required: ['id'],
            };
            const result = convertSchema(schema, ctx);
            expect(result.kind).toBe('object');
            expect(result.properties.id.kind).toBe('primitive');
            expect(result.properties.id.type).toBe('uuid');
            expect(result.properties.id.optional).toBeFalsy();
            expect(result.properties.name.optional).toBe(true);
        });
        it('infers object type from properties', () => {
            const schema = {
                properties: {
                    name: { type: 'string' },
                },
            };
            const result = convertSchema(schema, ctx);
            expect(result.kind).toBe('object');
        });
    });
    describe('arrays', () => {
        it('converts array with items', () => {
            const schema = {
                type: 'array',
                items: { type: 'string' },
            };
            const result = convertSchema(schema, ctx);
            expect(result.kind).toBe('array');
            expect(result.items.kind).toBe('primitive');
            expect(result.items.type).toBe('string');
        });
        it('converts array with minItems/maxItems', () => {
            const schema = {
                type: 'array',
                items: { type: 'string' },
                minItems: 1,
                maxItems: 10,
            };
            const result = convertSchema(schema, ctx);
            expect(result.annotations).toContainEqual({ name: 'minItems', args: [1] });
            expect(result.annotations).toContainEqual({ name: 'maxItems', args: [10] });
        });
    });
    describe('enums', () => {
        it('converts string enum', () => {
            const schema = {
                type: 'string',
                enum: ['draft', 'published', 'archived'],
            };
            const result = convertSchema(schema, ctx);
            expect(result.kind).toBe('enum');
            expect(result.values).toEqual(['draft', 'published', 'archived']);
        });
        it('handles enum with null value', () => {
            const schema = {
                type: 'string',
                enum: ['active', 'inactive', null],
            };
            const result = convertSchema(schema, ctx);
            expect(result.kind).toBe('enum');
            expect(result.values).toEqual(['active', 'inactive']);
            expect(result.nullable).toBe(true);
        });
    });
    describe('composition', () => {
        it('converts oneOf to union', () => {
            const schema = {
                oneOf: [{ type: 'string' }, { type: 'integer' }],
            };
            const result = convertSchema(schema, ctx);
            expect(result.kind).toBe('union');
            expect(result.types).toHaveLength(2);
            expect(result.types[0].kind).toBe('primitive');
            expect(result.types[1].kind).toBe('primitive');
        });
        it('converts anyOf to union', () => {
            const schema = {
                anyOf: [{ type: 'string' }, { type: 'number' }],
            };
            const result = convertSchema(schema, ctx);
            expect(result.kind).toBe('union');
        });
        it('converts allOf to intersection', () => {
            const schema = {
                allOf: [
                    { type: 'object', properties: { id: { type: 'string' } } },
                    { type: 'object', properties: { name: { type: 'string' } } },
                ],
            };
            const result = convertSchema(schema, ctx);
            expect(result.kind).toBe('intersection');
            expect(result.types).toHaveLength(2);
        });
    });
    describe('references', () => {
        it('converts $ref to reference', () => {
            const schema = {
                $ref: '#/components/schemas/User',
            };
            const result = convertSchema(schema, ctx);
            expect(result.kind).toBe('reference');
            expect(result.name).toBe('User');
        });
        it('resolves references when inlineRefs is true', () => {
            const ctx = createConversionContext({
                User: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                    },
                },
            }, { inlineRefs: true });
            const schema = {
                $ref: '#/components/schemas/User',
            };
            const result = convertSchema(schema, ctx);
            expect(result.kind).toBe('object');
        });
    });
});
//# sourceMappingURL=schema-converter.test.js.map