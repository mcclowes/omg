import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import * as fs from 'node:fs/promises';
import * as os from 'node:os';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const cliPath = fileURLToPath(new URL('../dist/cli.js', import.meta.url));
const waitTimeoutMs = 5000;

const apiDocument = (name: string) => `---
name: ${name}
title: ${name}
version: 1.0.0
---
# ${name}
`;

const endpointDocument = (operationId: string) => `---
method: GET
path: /health
operationId: ${operationId}
---
# Health
{{> responses/health }}
`;

const responseDocument = (field: string) => `# Health response
\`\`\`omg.response
{ ${field}: string }
\`\`\`
`;

const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function availablePort(): Promise<number> {
  const server = createServer();
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Missing test server address');
  await new Promise<void>((resolve) => server.close(() => resolve()));
  return address.port;
}

async function startMock(directory: string, options: { delay?: number; quiet?: boolean } = {}) {
  const port = await availablePort();
  const child = spawn(
    process.execPath,
    [
      cliPath,
      'mock',
      path.join(directory, 'api.omg.md'),
      '--port',
      String(port),
      '--simple',
      ...(options.quiet === false ? [] : ['--quiet']),
      '--watch',
      '--delay',
      String(options.delay ?? 0),
    ],
    { stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, FORCE_COLOR: '0' } }
  );
  let output = '';
  let closed = false;
  child.stdout.on('data', (data) => (output += data));
  child.stderr.on('data', (data) => (output += data));
  const exited = new Promise<number | null>((resolve) => {
    child.once('exit', (code) => {
      closed = true;
      resolve(code);
    });
  });

  async function until(predicate: () => boolean | Promise<boolean>) {
    const deadline = Date.now() + waitTimeoutMs;
    while (Date.now() < deadline) {
      if (closed) throw new Error(`Mock exited before the expected change:\n${output}`);
      try {
        if (await predicate()) return;
      } catch {
        // Requests can briefly fail while the mock restarts.
      }
      await pause(30);
    }
    throw new Error(`Mock did not observe the expected change:\n${output}`);
  }

  return {
    port,
    until,
    ready: () => until(() => output.includes('Watching for changes')),
    starts: () => output.split('Mock server running at').length - 1,
    output: () => output,
    json: async (route: string, timeoutMs = 500) => {
      const response = await fetch(`http://127.0.0.1:${port}${route}`, {
        signal: AbortSignal.timeout(timeoutMs),
      });
      expect(response.status).toBe(200);
      return response.json();
    },
    stop: async (signal: NodeJS.Signals = 'SIGTERM') => {
      if (!closed) child.kill(signal);
      const code = await new Promise<number | null>((resolve, reject) => {
        const timeout = setTimeout(() => {
          if (!closed) child.kill('SIGKILL');
          reject(new Error(`Mock did not stop:\n${output}`));
        }, waitTimeoutMs);
        exited.then((exitCode) => {
          clearTimeout(timeout);
          resolve(exitCode);
        }, reject);
      });
      expect(code).toBe(0);
    },
  };
}

describe('mock --watch', () => {
  let directory: string;
  let mock: Awaited<ReturnType<typeof startMock>>;

  beforeEach(async () => {
    directory = await fs.mkdtemp(path.join(os.tmpdir(), 'omg-mock-watch-'));
    await fs.mkdir(path.join(directory, 'endpoints'));
    await fs.mkdir(path.join(directory, 'partials/responses'), { recursive: true });
    await fs.writeFile(path.join(directory, 'api.omg.md'), apiDocument('Watch fixture'));
    await fs.writeFile(path.join(directory, 'endpoints/health.omg.md'), endpointDocument('health'));
    await fs.writeFile(
      path.join(directory, 'partials/responses/health.omg.md'),
      responseDocument('before')
    );
    mock = await startMock(directory);
    await mock.ready();
  });

  afterEach(async () => {
    try {
      if (mock) await mock.stop();
    } finally {
      if (directory) await fs.rm(directory, { recursive: true });
    }
  });

  it('reloads the root API, endpoints, and nested response partials', async () => {
    expect(await mock.json('/health')).toHaveProperty('before');
    await fs.writeFile(
      path.join(directory, 'endpoints/health.omg.md'),
      endpointDocument('updated-health')
    );
    await mock.until(
      async () => (await mock.json('/')).endpoints[0].operationId === 'updated-health'
    );

    await fs.writeFile(
      path.join(directory, 'partials/responses/health.omg.md'),
      responseDocument('after')
    );
    await mock.until(async () => 'after' in (await mock.json('/health')));

    await fs.writeFile(path.join(directory, 'api.omg.md'), apiDocument('Reloaded fixture'));
    await mock.until(async () => (await mock.json('/')).name === 'Reloaded fixture');
  }, 20000);

  it('observes OMG additions/removals and ignores hidden or non-OMG files', async () => {
    const extra = path.join(directory, 'extra.omg.md');
    let starts = mock.starts();
    await fs.writeFile(extra, '# Extra document\n');
    await mock.until(() => mock.starts() > starts);
    starts = mock.starts();
    await fs.unlink(extra);
    await mock.until(() => mock.starts() > starts);

    starts = mock.starts();
    await fs.writeFile(path.join(directory, 'notes.txt'), 'not an OMG file');
    await fs.writeFile(path.join(directory, '.hidden.omg.md'), '# Hidden document\n');
    await pause(800);
    expect(mock.starts()).toBe(starts);
  }, 15000);

  it('serializes edits while an active request delays the current restart', async () => {
    await mock.stop();
    mock = await startMock(directory, { delay: 4000, quiet: false });
    await mock.ready();
    const active = mock.json('/health', 6000);
    await mock.until(() => mock.output().includes('GET /health'));
    await fs.writeFile(
      path.join(directory, 'endpoints/health.omg.md'),
      endpointDocument('latest-health')
    );
    await mock.until(() => mock.output().includes('Restarting server...'));
    await fs.writeFile(
      path.join(directory, 'partials/responses/health.omg.md'),
      responseDocument('latest')
    );
    expect(await active).toHaveProperty('before');
    await mock.until(
      async () => (await mock.json('/', 6000)).endpoints[0].operationId === 'latest-health'
    );
    await mock.until(async () => 'latest' in (await mock.json('/health', 6000)));
  }, 25000);

  it.each(['SIGINT', 'SIGTERM'] as const)(
    'stops cleanly on %s and releases its port',
    async (signal) => {
      await fs.writeFile(
        path.join(directory, 'partials/responses/health.omg.md'),
        responseDocument('pending')
      );
      await pause(100);
      await mock.stop(signal);
      const server = createServer();
      try {
        await new Promise<void>((resolve, reject) => {
          server.once('error', reject);
          server.listen(mock.port, '127.0.0.1', resolve);
        });
      } finally {
        await new Promise<void>((resolve) => server.close(() => resolve()));
      }
    }
  );
});
