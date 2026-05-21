import { describe, it, expect } from 'vitest';
import { validateResponse, validateStatusCode, validateRequiredFields } from './validator.js';

describe('validateStatusCode', () => {
  it('passes when the status is in the expected list', () => {
    const check = validateStatusCode(200, [200, 404], false);
    expect(check.passed).toBe(true);
    expect(check.message).toContain('200');
  });

  it('fails when the status is not expected and there is no default response', () => {
    const check = validateStatusCode(500, [200], false);
    expect(check.passed).toBe(false);
    expect(check.expected).toBe('200');
    expect(check.actual).toBe(500);
  });

  it('passes an unexpected status when a default response is declared', () => {
    const check = validateStatusCode(503, [200], true);
    expect(check.passed).toBe(true);
  });
});

describe('validateRequiredFields', () => {
  const schema = { type: 'object', required: ['id', 'name'] };

  it('passes when all required fields are present', () => {
    const checks = validateRequiredFields({ id: '1', name: 'a' }, schema);
    expect(checks).toHaveLength(1);
    expect(checks[0].passed).toBe(true);
  });

  it('reports each missing required field', () => {
    const checks = validateRequiredFields({ id: '1' }, schema);
    expect(checks).toHaveLength(1);
    expect(checks[0].passed).toBe(false);
    expect(checks[0].message).toContain('name');
    expect(checks[0].path).toBe('/name');
  });

  it('returns no checks for a non-object body', () => {
    expect(validateRequiredFields('not-an-object', schema)).toEqual([]);
  });

  it('returns no checks when the schema has no required array', () => {
    expect(validateRequiredFields({ id: '1' }, { type: 'object' })).toEqual([]);
  });
});

describe('validateResponse', () => {
  const schema = {
    type: 'object',
    properties: { id: { type: 'string' }, count: { type: 'integer' } },
    required: ['id'],
  };

  it('passes when the body matches the schema', () => {
    const checks = validateResponse({ id: 'abc', count: 3 }, schema, 200);
    expect(checks).toHaveLength(1);
    expect(checks[0].passed).toBe(true);
  });

  it('fails with a type error when a field has the wrong type', () => {
    const checks = validateResponse({ id: 123 }, schema, 200);
    expect(checks.some((c) => !c.passed)).toBe(true);
    const failure = checks.find((c) => !c.passed);
    expect(failure?.message).toContain('id');
  });

  it('skips validation when the schema is empty', () => {
    const checks = validateResponse({ anything: true }, {}, 204);
    expect(checks).toHaveLength(1);
    expect(checks[0].passed).toBe(true);
    expect(checks[0].name).toBe('Schema exists');
  });

  it('reports an enum violation in a readable way', () => {
    const enumSchema = { type: 'string', enum: ['a', 'b'] };
    const checks = validateResponse('c', enumSchema, 200);
    const failure = checks.find((c) => !c.passed);
    expect(failure?.message).toContain('must be one of');
  });

  it('resolves #/components/schemas $refs when components are provided', () => {
    const refSchema = { $ref: '#/components/schemas/User' };
    const components = {
      schemas: {
        User: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
      },
    };

    const ok = validateResponse({ id: 'abc' }, refSchema, 200, components);
    expect(ok.every((c) => c.passed)).toBe(true);

    const bad = validateResponse({ id: 42 }, refSchema, 200, components);
    expect(bad.some((c) => !c.passed)).toBe(true);
  });
});
