import { describe, expect, it } from 'vitest';
import type { ParsedEndpoint } from 'omg-parser';
import { selectMockResponse } from '../src/server.js';

describe('createMockServer', () => {
  it('serves a default response with a valid fallback status', async () => {
    const endpoint: ParsedEndpoint = {
      method: 'GET',
      path: '/fallback',
      operationId: 'get-fallback',
      tags: [],
      summary: '',
      description: '',
      deprecated: false,
      follows: [],
      webhooks: {},
      parameters: { path: null, query: null, headers: null },
      requestBody: null,
      responses: {
        default: {
          schema: { kind: 'primitive', type: 'boolean', annotations: [] },
        },
      },
    };

    const selected = selectMockResponse(endpoint);

    expect(selected.statusCode).toBe(200);
    expect(selected.response).toBe(endpoint.responses.default);
  });
});
