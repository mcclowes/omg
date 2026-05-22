/**
 * Vague Generator Tests
 *
 * Covers the `@vague(...)` annotation override.
 */

import { describe, it, expect } from 'vitest';
import { generateWithVague } from '../src/vague-generator.js';
import type { OmgSchema } from 'omg-parser';

/** Build a single-field object schema for `field`. */
function objectWith(field: OmgSchema): OmgSchema {
  return {
    kind: 'object',
    properties: { field },
    annotations: [],
  };
}

describe('vague-generator @vague annotation', () => {
  it('uses an @vague integer expression verbatim', async () => {
    const schema = objectWith({
      kind: 'primitive',
      type: 'integer',
      annotations: [{ name: 'vague', args: ['int in 7..7'] }],
    });

    const result = (await generateWithVague(schema, { seed: 1 })) as Record<string, unknown>;

    expect(result.field).toBe(7);
  });

  it('uses an @vague string-literal expression verbatim', async () => {
    const schema = objectWith({
      kind: 'primitive',
      type: 'string',
      annotations: [{ name: 'vague', args: ['"ACTIVE"'] }],
    });

    const result = (await generateWithVague(schema, { seed: 1 })) as Record<string, unknown>;

    expect(result.field).toBe('ACTIVE');
  });

  it('overrides the field-name heuristic when @vague is present', async () => {
    // A field named `email` would normally generate via the `email()` faker;
    // the @vague annotation must win.
    const schema: OmgSchema = {
      kind: 'object',
      properties: {
        email: {
          kind: 'primitive',
          type: 'string',
          annotations: [{ name: 'vague', args: ['"noreply@example.test"'] }],
        },
      },
      annotations: [],
    };

    const result = (await generateWithVague(schema, { seed: 1 })) as Record<string, unknown>;

    expect(result.email).toBe('noreply@example.test');
  });

  it('falls back to heuristics when no @vague annotation is present', async () => {
    const schema: OmgSchema = {
      kind: 'object',
      properties: {
        email: { kind: 'primitive', type: 'string', annotations: [] },
      },
      annotations: [],
    };

    const result = (await generateWithVague(schema, { seed: 1 })) as Record<string, unknown>;

    // The `email` field-name heuristic produces a real-looking email address.
    expect(typeof result.email).toBe('string');
    expect(result.email).toMatch(/@/);
  });

  it('honours a weighted-union @vague expression', async () => {
    const schema = objectWith({
      kind: 'primitive',
      type: 'string',
      annotations: [{ name: 'vague', args: ['0.5: "paid" | 0.5: "overdue"'] }],
    });

    const result = (await generateWithVague(schema, { seed: 3 })) as Record<string, unknown>;

    expect(['paid', 'overdue']).toContain(result.field);
  });
});
