import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as fs from 'node:fs';
import { resolveTextDocument } from './document-resolver.js';

vi.mock('node:fs', async () => {
  const actual = await vi.importActual<typeof fs>('node:fs');
  return {
    ...actual,
    existsSync: vi.fn(),
    readFileSync: vi.fn(),
  };
});

describe('resolveTextDocument', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('resolves relative partials from a file URI', () => {
    const text = `# Endpoint

[errors](./errors.omg.md)
`;
    const partialPath = '/project/endpoints/errors.omg.md';
    const partial = `\`\`\`omg.response.400
{ error: string }
\`\`\``;

    vi.mocked(fs.existsSync).mockImplementation(
      (candidate) => candidate.toString() === partialPath
    );
    vi.mocked(fs.readFileSync).mockImplementation((candidate) =>
      candidate.toString() === partialPath ? partial : ''
    );

    const resolved = resolveTextDocument(text, 'file:///project/endpoints/get-user.omg.md');

    expect(resolved.resolvedBlocks.some((block) => block.statusCode === 400)).toBe(true);
  });
});
