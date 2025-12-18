"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const schema_parser_js_1 = require("./schema-parser.js");
(0, vitest_1.describe)('parseSchema - intersection types', () => {
    (0, vitest_1.describe)('basic intersection parsing', () => {
        (0, vitest_1.it)('should parse two types intersected with &', () => {
            const result = (0, schema_parser_js_1.parseSchema)('TypeA & TypeB');
            (0, vitest_1.expect)(result.kind).toBe('intersection');
            const intersection = result;
            (0, vitest_1.expect)(intersection.types).toHaveLength(2);
            (0, vitest_1.expect)(intersection.types[0].name).toBe('TypeA');
            (0, vitest_1.expect)(intersection.types[1].name).toBe('TypeB');
        });
        (0, vitest_1.it)('should parse three types intersected with &', () => {
            const result = (0, schema_parser_js_1.parseSchema)('TypeA & TypeB & TypeC');
            (0, vitest_1.expect)(result.kind).toBe('intersection');
            const intersection = result;
            (0, vitest_1.expect)(intersection.types).toHaveLength(3);
            (0, vitest_1.expect)(intersection.types[0].name).toBe('TypeA');
            (0, vitest_1.expect)(intersection.types[1].name).toBe('TypeB');
            (0, vitest_1.expect)(intersection.types[2].name).toBe('TypeC');
        });
        (0, vitest_1.it)('should parse intersection of primitives', () => {
            const result = (0, schema_parser_js_1.parseSchema)('string & integer');
            (0, vitest_1.expect)(result.kind).toBe('intersection');
            const intersection = result;
            (0, vitest_1.expect)(intersection.types).toHaveLength(2);
            (0, vitest_1.expect)(intersection.types[0].type).toBe('string');
            (0, vitest_1.expect)(intersection.types[1].type).toBe('integer');
        });
        (0, vitest_1.it)('should parse intersection with inline objects', () => {
            const result = (0, schema_parser_js_1.parseSchema)('{ id: string } & { name: string }');
            (0, vitest_1.expect)(result.kind).toBe('intersection');
            const intersection = result;
            (0, vitest_1.expect)(intersection.types).toHaveLength(2);
            (0, vitest_1.expect)(intersection.types[0].kind).toBe('object');
            (0, vitest_1.expect)(intersection.types[1].kind).toBe('object');
            (0, vitest_1.expect)(intersection.types[0].properties).toHaveProperty('id');
            (0, vitest_1.expect)(intersection.types[1].properties).toHaveProperty('name');
        });
        (0, vitest_1.it)('should parse intersection of reference and inline object', () => {
            const result = (0, schema_parser_js_1.parseSchema)('BaseType & { extraField: boolean }');
            (0, vitest_1.expect)(result.kind).toBe('intersection');
            const intersection = result;
            (0, vitest_1.expect)(intersection.types).toHaveLength(2);
            (0, vitest_1.expect)(intersection.types[0].name).toBe('BaseType');
            (0, vitest_1.expect)(intersection.types[1].kind).toBe('object');
        });
    });
    (0, vitest_1.describe)('operator precedence (& binds tighter than |)', () => {
        (0, vitest_1.it)('should parse A & B | C as (A & B) | C', () => {
            const result = (0, schema_parser_js_1.parseSchema)('TypeA & TypeB | TypeC');
            (0, vitest_1.expect)(result.kind).toBe('union');
            const union = result;
            (0, vitest_1.expect)(union.types).toHaveLength(2);
            // First member should be intersection of A & B
            (0, vitest_1.expect)(union.types[0].kind).toBe('intersection');
            const intersection = union.types[0];
            (0, vitest_1.expect)(intersection.types[0].name).toBe('TypeA');
            (0, vitest_1.expect)(intersection.types[1].name).toBe('TypeB');
            // Second member should be TypeC
            (0, vitest_1.expect)(union.types[1].name).toBe('TypeC');
        });
        (0, vitest_1.it)('should parse A | B & C as A | (B & C)', () => {
            const result = (0, schema_parser_js_1.parseSchema)('TypeA | TypeB & TypeC');
            (0, vitest_1.expect)(result.kind).toBe('union');
            const union = result;
            (0, vitest_1.expect)(union.types).toHaveLength(2);
            // First member should be TypeA
            (0, vitest_1.expect)(union.types[0].name).toBe('TypeA');
            // Second member should be intersection of B & C
            (0, vitest_1.expect)(union.types[1].kind).toBe('intersection');
            const intersection = union.types[1];
            (0, vitest_1.expect)(intersection.types[0].name).toBe('TypeB');
            (0, vitest_1.expect)(intersection.types[1].name).toBe('TypeC');
        });
        (0, vitest_1.it)('should parse A & B | C & D as (A & B) | (C & D)', () => {
            const result = (0, schema_parser_js_1.parseSchema)('TypeA & TypeB | TypeC & TypeD');
            (0, vitest_1.expect)(result.kind).toBe('union');
            const union = result;
            (0, vitest_1.expect)(union.types).toHaveLength(2);
            // First member: A & B
            (0, vitest_1.expect)(union.types[0].kind).toBe('intersection');
            const intersection1 = union.types[0];
            (0, vitest_1.expect)(intersection1.types[0].name).toBe('TypeA');
            (0, vitest_1.expect)(intersection1.types[1].name).toBe('TypeB');
            // Second member: C & D
            (0, vitest_1.expect)(union.types[1].kind).toBe('intersection');
            const intersection2 = union.types[1];
            (0, vitest_1.expect)(intersection2.types[0].name).toBe('TypeC');
            (0, vitest_1.expect)(intersection2.types[1].name).toBe('TypeD');
        });
    });
    (0, vitest_1.describe)('nullable intersections', () => {
        (0, vitest_1.it)('should parse intersection with nullable suffix', () => {
            const result = (0, schema_parser_js_1.parseSchema)('TypeA & TypeB | null');
            // Should be a nullable intersection
            (0, vitest_1.expect)(result.kind).toBe('intersection');
            const intersection = result;
            (0, vitest_1.expect)(intersection.nullable).toBe(true);
            (0, vitest_1.expect)(intersection.types).toHaveLength(2);
        });
        (0, vitest_1.it)('should parse Type | null properly', () => {
            const result = (0, schema_parser_js_1.parseSchema)('TypeA | null');
            (0, vitest_1.expect)(result.kind).toBe('reference');
            (0, vitest_1.expect)(result.nullable).toBe(true);
        });
        (0, vitest_1.it)('should parse string | null properly', () => {
            const result = (0, schema_parser_js_1.parseSchema)('string | null');
            (0, vitest_1.expect)(result.kind).toBe('primitive');
            (0, vitest_1.expect)(result.nullable).toBe(true);
        });
    });
    (0, vitest_1.describe)('complex intersection scenarios', () => {
        (0, vitest_1.it)('should parse nested objects in intersection', () => {
            const result = (0, schema_parser_js_1.parseSchema)('{ user: { id: string } } & { profile: { name: string } }');
            (0, vitest_1.expect)(result.kind).toBe('intersection');
            const intersection = result;
            (0, vitest_1.expect)(intersection.types).toHaveLength(2);
            const obj1 = intersection.types[0];
            (0, vitest_1.expect)(obj1.properties).toHaveProperty('user');
            (0, vitest_1.expect)(obj1.properties.user.properties).toHaveProperty('id');
            const obj2 = intersection.types[1];
            (0, vitest_1.expect)(obj2.properties).toHaveProperty('profile');
        });
        (0, vitest_1.it)('should parse intersection in array items', () => {
            const result = (0, schema_parser_js_1.parseSchema)('[TypeA & TypeB]');
            (0, vitest_1.expect)(result.kind).toBe('array');
            (0, vitest_1.expect)(result.kind === 'array' && result.items.kind).toBe('intersection');
        });
        (0, vitest_1.it)('should parse intersection in object property', () => {
            const result = (0, schema_parser_js_1.parseSchema)('{ data: TypeA & TypeB }');
            (0, vitest_1.expect)(result.kind).toBe('object');
            const obj = result;
            (0, vitest_1.expect)(obj.properties.data.kind).toBe('intersection');
        });
        (0, vitest_1.it)('should parse union containing intersections as members', () => {
            const result = (0, schema_parser_js_1.parseSchema)('TypeA & TypeB | TypeC & TypeD | TypeE');
            (0, vitest_1.expect)(result.kind).toBe('union');
            const union = result;
            (0, vitest_1.expect)(union.types).toHaveLength(3);
            // First: A & B
            (0, vitest_1.expect)(union.types[0].kind).toBe('intersection');
            // Second: C & D
            (0, vitest_1.expect)(union.types[1].kind).toBe('intersection');
            // Third: E (simple reference)
            (0, vitest_1.expect)(union.types[2].kind).toBe('reference');
            (0, vitest_1.expect)(union.types[2].name).toBe('TypeE');
        });
    });
});
(0, vitest_1.describe)('parseSchema - existing functionality preserved', () => {
    (0, vitest_1.it)('should still parse simple types', () => {
        (0, vitest_1.expect)((0, schema_parser_js_1.parseSchema)('string').kind).toBe('primitive');
        (0, vitest_1.expect)((0, schema_parser_js_1.parseSchema)('User').kind).toBe('reference');
    });
    (0, vitest_1.it)('should still parse unions without intersections', () => {
        const result = (0, schema_parser_js_1.parseSchema)('TypeA | TypeB');
        (0, vitest_1.expect)(result.kind).toBe('union');
    });
    (0, vitest_1.it)('should still parse enums', () => {
        const result = (0, schema_parser_js_1.parseSchema)('"a" | "b" | "c"');
        (0, vitest_1.expect)(result.kind).toBe('enum');
    });
    (0, vitest_1.it)('should still parse arrays', () => {
        const result = (0, schema_parser_js_1.parseSchema)('[string]');
        (0, vitest_1.expect)(result.kind).toBe('array');
    });
    (0, vitest_1.it)('should still parse objects', () => {
        const result = (0, schema_parser_js_1.parseSchema)('{ id: string, name: string }');
        (0, vitest_1.expect)(result.kind).toBe('object');
    });
    (0, vitest_1.it)('should still parse optional fields', () => {
        const result = (0, schema_parser_js_1.parseSchema)('{ id: string, name?: string }');
        (0, vitest_1.expect)(result.kind).toBe('object');
        const obj = result;
        (0, vitest_1.expect)(obj.properties.name.optional).toBe(true);
    });
});
//# sourceMappingURL=schema-parser.test.js.map