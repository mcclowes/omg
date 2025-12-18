"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const linter_js_1 = require("./linter.js");
(0, vitest_1.describe)('checkCasing', () => {
    (0, vitest_1.describe)('camelCase', () => {
        (0, vitest_1.it)('should accept valid camelCase', () => {
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('myVariable', 'camel')).toBe(true);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('firstName', 'camel')).toBe(true);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('userId', 'camel')).toBe(true);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('id', 'camel')).toBe(true);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('x', 'camel')).toBe(true);
        });
        (0, vitest_1.it)('should reject invalid camelCase', () => {
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('MyVariable', 'camel')).toBe(false);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('my_variable', 'camel')).toBe(false);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('my-variable', 'camel')).toBe(false);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('CONSTANT', 'camel')).toBe(false);
        });
    });
    (0, vitest_1.describe)('PascalCase', () => {
        (0, vitest_1.it)('should accept valid PascalCase', () => {
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('MyClass', 'pascal')).toBe(true);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('FirstName', 'pascal')).toBe(true);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('UserId', 'pascal')).toBe(true);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('Id', 'pascal')).toBe(true);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('X', 'pascal')).toBe(true);
        });
        (0, vitest_1.it)('should reject invalid PascalCase', () => {
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('myClass', 'pascal')).toBe(false);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('my_class', 'pascal')).toBe(false);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('my-class', 'pascal')).toBe(false);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('MY_CLASS', 'pascal')).toBe(false);
        });
    });
    (0, vitest_1.describe)('snake_case', () => {
        (0, vitest_1.it)('should accept valid snake_case', () => {
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('my_variable', 'snake')).toBe(true);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('first_name', 'snake')).toBe(true);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('user_id', 'snake')).toBe(true);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('id', 'snake')).toBe(true);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('x', 'snake')).toBe(true);
        });
        (0, vitest_1.it)('should reject invalid snake_case', () => {
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('myVariable', 'snake')).toBe(false);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('MyVariable', 'snake')).toBe(false);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('my-variable', 'snake')).toBe(false);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('MY_VARIABLE', 'snake')).toBe(false);
        });
    });
    (0, vitest_1.describe)('kebab-case', () => {
        (0, vitest_1.it)('should accept valid kebab-case', () => {
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('my-variable', 'kebab')).toBe(true);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('first-name', 'kebab')).toBe(true);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('user-id', 'kebab')).toBe(true);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('id', 'kebab')).toBe(true);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('x', 'kebab')).toBe(true);
        });
        (0, vitest_1.it)('should reject invalid kebab-case', () => {
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('myVariable', 'kebab')).toBe(false);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('MyVariable', 'kebab')).toBe(false);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('my_variable', 'kebab')).toBe(false);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('MY-VARIABLE', 'kebab')).toBe(false);
        });
    });
    (0, vitest_1.describe)('CONSTANT_CASE', () => {
        (0, vitest_1.it)('should accept valid CONSTANT_CASE', () => {
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('MY_CONSTANT', 'constant')).toBe(true);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('FIRST_NAME', 'constant')).toBe(true);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('USER_ID', 'constant')).toBe(true);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('ID', 'constant')).toBe(true);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('X', 'constant')).toBe(true);
        });
        (0, vitest_1.it)('should reject invalid CONSTANT_CASE', () => {
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('myConstant', 'constant')).toBe(false);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('My_Constant', 'constant')).toBe(false);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('my-constant', 'constant')).toBe(false);
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('my_constant', 'constant')).toBe(false);
        });
    });
    (0, vitest_1.describe)('unknown casing', () => {
        (0, vitest_1.it)('should return true for unknown casing types', () => {
            (0, vitest_1.expect)((0, linter_js_1.checkCasing)('anything', 'unknown')).toBe(true);
        });
    });
});
(0, vitest_1.describe)('evaluateOalPropertyCasing', () => {
    (0, vitest_1.it)('should pass when all properties are camelCase', () => {
        const doc = {
            resolvedBlocks: [
                {
                    type: 'omg.body',
                    parsed: {
                        kind: 'object',
                        properties: {
                            firstName: { kind: 'primitive', type: 'string' },
                            lastName: { kind: 'primitive', type: 'string' },
                            userId: { kind: 'primitive', type: 'string' },
                        },
                    },
                },
            ],
        };
        (0, vitest_1.expect)((0, linter_js_1.evaluateOalPropertyCasing)(doc, { casing: 'camel' })).toBe(true);
    });
    (0, vitest_1.it)('should fail when properties are not camelCase', () => {
        const doc = {
            resolvedBlocks: [
                {
                    type: 'omg.body',
                    parsed: {
                        kind: 'object',
                        properties: {
                            first_name: { kind: 'primitive', type: 'string' },
                            lastName: { kind: 'primitive', type: 'string' },
                        },
                    },
                },
            ],
        };
        (0, vitest_1.expect)((0, linter_js_1.evaluateOalPropertyCasing)(doc, { casing: 'camel' })).toBe(false);
    });
    (0, vitest_1.it)('should check nested object properties', () => {
        const doc = {
            resolvedBlocks: [
                {
                    type: 'omg.body',
                    parsed: {
                        kind: 'object',
                        properties: {
                            user: {
                                kind: 'object',
                                properties: {
                                    first_name: { kind: 'primitive', type: 'string' }, // Invalid!
                                },
                            },
                        },
                    },
                },
            ],
        };
        (0, vitest_1.expect)((0, linter_js_1.evaluateOalPropertyCasing)(doc, { casing: 'camel' })).toBe(false);
    });
    (0, vitest_1.it)('should check array item properties', () => {
        const doc = {
            resolvedBlocks: [
                {
                    type: 'omg.body',
                    parsed: {
                        kind: 'array',
                        items: {
                            kind: 'object',
                            properties: {
                                invalid_prop: { kind: 'primitive', type: 'string' },
                            },
                        },
                    },
                },
            ],
        };
        (0, vitest_1.expect)((0, linter_js_1.evaluateOalPropertyCasing)(doc, { casing: 'camel' })).toBe(false);
    });
    (0, vitest_1.it)('should check union type members', () => {
        const doc = {
            resolvedBlocks: [
                {
                    type: 'omg.body',
                    parsed: {
                        kind: 'union',
                        types: [
                            {
                                kind: 'object',
                                properties: {
                                    validProp: { kind: 'primitive', type: 'string' },
                                },
                            },
                            {
                                kind: 'object',
                                properties: {
                                    invalid_prop: { kind: 'primitive', type: 'string' },
                                },
                            },
                        ],
                    },
                },
            ],
        };
        (0, vitest_1.expect)((0, linter_js_1.evaluateOalPropertyCasing)(doc, { casing: 'camel' })).toBe(false);
    });
    (0, vitest_1.it)('should check intersection type members', () => {
        const doc = {
            resolvedBlocks: [
                {
                    type: 'omg.body',
                    parsed: {
                        kind: 'intersection',
                        types: [
                            {
                                kind: 'object',
                                properties: {
                                    validProp: { kind: 'primitive', type: 'string' },
                                },
                            },
                            {
                                kind: 'object',
                                properties: {
                                    another_invalid: { kind: 'primitive', type: 'string' },
                                },
                            },
                        ],
                    },
                },
            ],
        };
        (0, vitest_1.expect)((0, linter_js_1.evaluateOalPropertyCasing)(doc, { casing: 'camel' })).toBe(false);
    });
    (0, vitest_1.it)('should use camel as default casing', () => {
        const doc = {
            resolvedBlocks: [
                {
                    type: 'omg.body',
                    parsed: {
                        kind: 'object',
                        properties: {
                            camelCase: { kind: 'primitive', type: 'string' },
                        },
                    },
                },
            ],
        };
        (0, vitest_1.expect)((0, linter_js_1.evaluateOalPropertyCasing)(doc)).toBe(true);
    });
    (0, vitest_1.it)('should support snake_case option', () => {
        const doc = {
            resolvedBlocks: [
                {
                    type: 'omg.body',
                    parsed: {
                        kind: 'object',
                        properties: {
                            snake_case: { kind: 'primitive', type: 'string' },
                            another_prop: { kind: 'primitive', type: 'string' },
                        },
                    },
                },
            ],
        };
        (0, vitest_1.expect)((0, linter_js_1.evaluateOalPropertyCasing)(doc, { casing: 'snake' })).toBe(true);
    });
});
(0, vitest_1.describe)('lintDocument', () => {
    (0, vitest_1.describe)('oal-property-casing rule', () => {
        (0, vitest_1.it)('should report violations for non-camelCase properties', () => {
            // The document structure passed to lintDocument should be the wrapper { document: ... }
            const doc = {
                document: {
                    frontMatter: { method: 'GET', path: '/test', operationId: 'get-test', tags: ['Test'] },
                    title: 'Test',
                    description: 'Test endpoint',
                    resolvedBlocks: [
                        {
                            type: 'omg.response',
                            parsed: {
                                kind: 'object',
                                properties: {
                                    invalid_property: { kind: 'primitive', type: 'string' },
                                },
                            },
                        },
                    ],
                },
            };
            // Directly test the function first to verify it works
            (0, vitest_1.expect)((0, linter_js_1.evaluateOalPropertyCasing)(doc.document, { casing: 'camel' })).toBe(false);
            // Force using a non-existent config path to use built-in rules
            const results = (0, linter_js_1.lintDocument)(doc, { configPath: '/nonexistent/.spectral.yaml' });
            // Check that the oal-property-casing or omg-property-casing rule fired
            const casingResults = results.filter(r => r.rule === 'oal-property-casing' || r.rule === 'omg-property-casing');
            (0, vitest_1.expect)(casingResults.length).toBeGreaterThan(0);
        });
        (0, vitest_1.it)('should pass for camelCase properties', () => {
            const doc = {
                document: {
                    frontMatter: { method: 'GET', path: '/test', operationId: 'get-test', tags: ['Test'] },
                    title: 'Test',
                    description: 'Test endpoint',
                    resolvedBlocks: [
                        {
                            type: 'omg.response',
                            parsed: {
                                kind: 'object',
                                properties: {
                                    validProperty: { kind: 'primitive', type: 'string' },
                                    anotherValid: { kind: 'primitive', type: 'string' },
                                },
                            },
                        },
                    ],
                },
            };
            // Force using a non-existent config path to use built-in rules
            const results = (0, linter_js_1.lintDocument)(doc, { configPath: '/nonexistent/.spectral.yaml' });
            // Check that no property casing errors
            const casingResults = results.filter(r => r.rule === 'oal-property-casing' || r.rule === 'omg-property-casing');
            (0, vitest_1.expect)(casingResults).toHaveLength(0);
        });
    });
});
//# sourceMappingURL=linter.test.js.map