import { describe, expect, it } from 'vitest';
import { Agent, createServer, get } from 'node:http';
import type { ParsedApi, ParsedEndpoint } from 'omg-parser';
import { createMockServer, selectMockResponse } from '../src/server.js';

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

  it('closes idle keep-alive connections and allows concurrent/repeated stops', async () => {
    const reservation = createServer();
    await new Promise<void>((resolve) => reservation.listen(0, '127.0.0.1', resolve));
    const address = reservation.address();
    if (!address || typeof address === 'string') throw new Error('Missing reserved port');
    await new Promise<void>((resolve) => reservation.close(() => resolve()));
    const api: ParsedApi = {
      name: 'Lifecycle fixture',
      version: '1.0.0',
      baseUrl: '',
      description: '',
      endpoints: [],
      types: {},
    };
    const mock = createMockServer(api, { port: address.port, logging: false, useVague: false });
    const agent = new Agent({ keepAlive: true });
    let stops: Promise<void>[] = [];
    let timeout: ReturnType<typeof setTimeout> | undefined;
    await mock.start();
    try {
      await new Promise<void>((resolve, reject) => {
        get({ host: '127.0.0.1', port: address.port, path: '/', agent }, (response) => {
          response.resume();
          response.once('end', resolve);
          response.once('error', reject);
        }).once('error', reject);
      });
      stops = [mock.stop(), mock.stop()];
      await Promise.race([
        Promise.all(stops),
        new Promise((_, reject) => {
          timeout = setTimeout(() => reject(new Error('Idle connection blocked shutdown')), 2000);
        }),
      ]);
      await mock.stop();
    } finally {
      if (timeout) clearTimeout(timeout);
      agent.destroy();
      await Promise.allSettled(stops);
    }
  });
});
