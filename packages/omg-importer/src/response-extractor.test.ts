/**
 * Tests for response-extractor.ts
 */

import { describe, it, expect } from 'vitest';
import type { OmgDocument, OmgBlock } from 'omg-parser';
import { extractRepeatedResponses } from './response-extractor.js';

/** Build a response block with the given status code and metadata. */
function responseBlock(
  statusCode: number | 'default' | undefined,
  parsedResponse?: OmgBlock['parsedResponse'],
  parsed?: OmgBlock['parsed']
): OmgBlock {
  return { type: 'omg.response', statusCode, content: '', parsed, parsedResponse, line: 0 };
}

/** Build a minimal endpoint document carrying the given blocks. */
function endpoint(blocks: OmgBlock[]): OmgDocument {
  return {
    filePath: './endpoints/x.omg.md',
    frontMatter: null,
    title: null,
    description: '',
    blocks,
    partials: [],
  };
}

const unauthorized = (): OmgBlock =>
  responseBlock(401, { schema: null, description: 'Unauthorized' });

describe('extractRepeatedResponses', () => {
  it('extracts a response shared by at least `threshold` endpoints', () => {
    const endpoints = [
      endpoint([unauthorized()]),
      endpoint([unauthorized()]),
      endpoint([unauthorized()]),
    ];

    const partials = extractRepeatedResponses(endpoints, { baseDir: '.', threshold: 3 });

    expect(partials.has('responses/401')).toBe(true);
    for (const ep of endpoints) {
      expect(ep.blocks).toHaveLength(0);
      expect(ep.partials.map((p) => p.path)).toEqual(['responses/401']);
    }
  });

  it('leaves a response inline when it is below the threshold', () => {
    const endpoints = [endpoint([unauthorized()]), endpoint([unauthorized()])];

    const partials = extractRepeatedResponses(endpoints, { baseDir: '.', threshold: 3 });

    expect(partials.size).toBe(0);
    expect(endpoints[0].blocks).toHaveLength(1);
    expect(endpoints[0].partials).toHaveLength(0);
  });

  it('produces a partial document containing the response block', () => {
    const endpoints = [
      endpoint([unauthorized()]),
      endpoint([unauthorized()]),
      endpoint([unauthorized()]),
    ];

    const partials = extractRepeatedResponses(endpoints, { baseDir: 'out', threshold: 3 });
    const partial = partials.get('responses/401')!;

    expect(partial.filePath).toBe('out/partials/responses/401.omg.md');
    expect(partial.frontMatter).toBeNull();
    expect(partial.blocks).toHaveLength(1);
    expect(partial.blocks[0].type).toBe('omg.response');
    expect(partial.blocks[0].statusCode).toBe(401);
    expect(partial.description).toContain('reused by 3 endpoints');
  });

  it('disambiguates distinct response shapes that share a status code', () => {
    const bad = (): OmgBlock => responseBlock(400, { schema: null, description: 'Bad Request' });
    const invalid = (): OmgBlock =>
      responseBlock(400, { schema: null, description: 'Invalid Input' });
    const endpoints = [
      endpoint([bad()]),
      endpoint([bad()]),
      endpoint([bad()]),
      endpoint([invalid()]),
      endpoint([invalid()]),
      endpoint([invalid()]),
    ];

    const partials = extractRepeatedResponses(endpoints, { baseDir: '.', threshold: 3 });

    expect(partials.has('responses/400')).toBe(true);
    expect(partials.has('responses/400-2')).toBe(true);
    expect(partials.size).toBe(2);
  });

  it('does not extract responses that are all distinct', () => {
    const endpoints = [
      endpoint([responseBlock(undefined, { schema: null, description: 'one' })]),
      endpoint([responseBlock(undefined, { schema: null, description: 'two' })]),
      endpoint([responseBlock(undefined, { schema: null, description: 'three' })]),
    ];

    const partials = extractRepeatedResponses(endpoints, { baseDir: '.', threshold: 3 });

    expect(partials.size).toBe(0);
    expect(endpoints[0].blocks).toHaveLength(1);
  });

  it('extracts the shared block while keeping unique blocks inline', () => {
    const mk = (n: number): OmgDocument =>
      endpoint([
        responseBlock(undefined, { schema: null, description: `ok-${n}` }),
        unauthorized(),
      ]);
    const endpoints = [mk(1), mk(2), mk(3)];

    const partials = extractRepeatedResponses(endpoints, { baseDir: '.', threshold: 3 });

    expect(partials.has('responses/401')).toBe(true);
    for (const ep of endpoints) {
      expect(ep.blocks).toHaveLength(1);
      expect(ep.blocks[0].statusCode).toBeUndefined();
      expect(ep.partials.map((p) => p.path)).toEqual(['responses/401']);
    }
  });

  it('names a default-response partial `responses/default`', () => {
    const def = (): OmgBlock => responseBlock('default', { schema: null, description: 'Error' });
    const endpoints = [endpoint([def()]), endpoint([def()]), endpoint([def()])];

    const partials = extractRepeatedResponses(endpoints, { baseDir: '.', threshold: 3 });

    expect(partials.has('responses/default')).toBe(true);
  });
});
