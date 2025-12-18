import { describe, it, expect } from 'vitest';
import { lintDocument, checkCasing, evaluateOalPropertyCasing } from './linter.js';

describe('checkCasing', () => {
  describe('camelCase', () => {
    it('should accept valid camelCase', () => {
      expect(checkCasing('myVariable', 'camel')).toBe(true);
      expect(checkCasing('firstName', 'camel')).toBe(true);
      expect(checkCasing('userId', 'camel')).toBe(true);
      expect(checkCasing('id', 'camel')).toBe(true);
      expect(checkCasing('x', 'camel')).toBe(true);
    });

    it('should reject invalid camelCase', () => {
      expect(checkCasing('MyVariable', 'camel')).toBe(false);
      expect(checkCasing('my_variable', 'camel')).toBe(false);
      expect(checkCasing('my-variable', 'camel')).toBe(false);
      expect(checkCasing('CONSTANT', 'camel')).toBe(false);
    });
  });

  describe('PascalCase', () => {
    it('should accept valid PascalCase', () => {
      expect(checkCasing('MyClass', 'pascal')).toBe(true);
      expect(checkCasing('FirstName', 'pascal')).toBe(true);
      expect(checkCasing('UserId', 'pascal')).toBe(true);
      expect(checkCasing('Id', 'pascal')).toBe(true);
      expect(checkCasing('X', 'pascal')).toBe(true);
    });

    it('should reject invalid PascalCase', () => {
      expect(checkCasing('myClass', 'pascal')).toBe(false);
      expect(checkCasing('my_class', 'pascal')).toBe(false);
      expect(checkCasing('my-class', 'pascal')).toBe(false);
      expect(checkCasing('MY_CLASS', 'pascal')).toBe(false);
    });
  });

  describe('snake_case', () => {
    it('should accept valid snake_case', () => {
      expect(checkCasing('my_variable', 'snake')).toBe(true);
      expect(checkCasing('first_name', 'snake')).toBe(true);
      expect(checkCasing('user_id', 'snake')).toBe(true);
      expect(checkCasing('id', 'snake')).toBe(true);
      expect(checkCasing('x', 'snake')).toBe(true);
    });

    it('should reject invalid snake_case', () => {
      expect(checkCasing('myVariable', 'snake')).toBe(false);
      expect(checkCasing('MyVariable', 'snake')).toBe(false);
      expect(checkCasing('my-variable', 'snake')).toBe(false);
      expect(checkCasing('MY_VARIABLE', 'snake')).toBe(false);
    });
  });

  describe('kebab-case', () => {
    it('should accept valid kebab-case', () => {
      expect(checkCasing('my-variable', 'kebab')).toBe(true);
      expect(checkCasing('first-name', 'kebab')).toBe(true);
      expect(checkCasing('user-id', 'kebab')).toBe(true);
      expect(checkCasing('id', 'kebab')).toBe(true);
      expect(checkCasing('x', 'kebab')).toBe(true);
    });

    it('should reject invalid kebab-case', () => {
      expect(checkCasing('myVariable', 'kebab')).toBe(false);
      expect(checkCasing('MyVariable', 'kebab')).toBe(false);
      expect(checkCasing('my_variable', 'kebab')).toBe(false);
      expect(checkCasing('MY-VARIABLE', 'kebab')).toBe(false);
    });
  });

  describe('CONSTANT_CASE', () => {
    it('should accept valid CONSTANT_CASE', () => {
      expect(checkCasing('MY_CONSTANT', 'constant')).toBe(true);
      expect(checkCasing('FIRST_NAME', 'constant')).toBe(true);
      expect(checkCasing('USER_ID', 'constant')).toBe(true);
      expect(checkCasing('ID', 'constant')).toBe(true);
      expect(checkCasing('X', 'constant')).toBe(true);
    });

    it('should reject invalid CONSTANT_CASE', () => {
      expect(checkCasing('myConstant', 'constant')).toBe(false);
      expect(checkCasing('My_Constant', 'constant')).toBe(false);
      expect(checkCasing('my-constant', 'constant')).toBe(false);
      expect(checkCasing('my_constant', 'constant')).toBe(false);
    });
  });

  describe('unknown casing', () => {
    it('should return true for unknown casing types', () => {
      expect(checkCasing('anything', 'unknown')).toBe(true);
    });
  });
});

describe('evaluateOalPropertyCasing', () => {
  it('should pass when all properties are camelCase', () => {
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

    expect(evaluateOalPropertyCasing(doc, { casing: 'camel' })).toBe(true);
  });

  it('should fail when properties are not camelCase', () => {
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

    expect(evaluateOalPropertyCasing(doc, { casing: 'camel' })).toBe(false);
  });

  it('should check nested object properties', () => {
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

    expect(evaluateOalPropertyCasing(doc, { casing: 'camel' })).toBe(false);
  });

  it('should check array item properties', () => {
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

    expect(evaluateOalPropertyCasing(doc, { casing: 'camel' })).toBe(false);
  });

  it('should check union type members', () => {
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

    expect(evaluateOalPropertyCasing(doc, { casing: 'camel' })).toBe(false);
  });

  it('should check intersection type members', () => {
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

    expect(evaluateOalPropertyCasing(doc, { casing: 'camel' })).toBe(false);
  });

  it('should use camel as default casing', () => {
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

    expect(evaluateOalPropertyCasing(doc)).toBe(true);
  });

  it('should support snake_case option', () => {
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

    expect(evaluateOalPropertyCasing(doc, { casing: 'snake' })).toBe(true);
  });
});

describe('lintDocument', () => {
  describe('oal-property-casing rule', () => {
    it('should report violations for non-camelCase properties', () => {
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
      expect(evaluateOalPropertyCasing(doc.document, { casing: 'camel' })).toBe(false);

      // Force using a non-existent config path to use built-in rules
      const results = lintDocument(doc, { configPath: '/nonexistent/.spectral.yaml' });

      // Check that the oal-property-casing or omg-property-casing rule fired
      const casingResults = results.filter(
        (r) => r.rule === 'oal-property-casing' || r.rule === 'omg-property-casing'
      );
      expect(casingResults.length).toBeGreaterThan(0);
    });

    it('should pass for camelCase properties', () => {
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
      const results = lintDocument(doc, { configPath: '/nonexistent/.spectral.yaml' });

      // Check that no property casing errors
      const casingResults = results.filter(
        (r) => r.rule === 'oal-property-casing' || r.rule === 'omg-property-casing'
      );
      expect(casingResults).toHaveLength(0);
    });
  });
});
