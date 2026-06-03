import { describe, it, expect } from 'vitest';
import { formatDocument } from './formatter.js';

describe('formatDocument', () => {
  describe('empty response blocks', () => {
    it('inserts "// no response body" into an empty response block', () => {
      const input = ['```omg.response.401', '', '```', ''].join('\n');
      const formatted = formatDocument(input);
      expect(formatted).toContain('```omg.response.401\n// no response body\n```');
    });

    it('handles a block whose body is only whitespace', () => {
      const input = ['```omg.response.204', '   ', '```', ''].join('\n');
      const formatted = formatDocument(input);
      expect(formatted).toContain('```omg.response.204\n// no response body\n```');
    });

    it('applies to the default response block', () => {
      const input = ['```omg.response.default', '', '```', ''].join('\n');
      const formatted = formatDocument(input);
      expect(formatted).toContain('```omg.response.default\n// no response body\n```');
    });

    it('is idempotent — a comment-only block is left unchanged', () => {
      const input = ['```omg.response.401', '// no response body', '```', ''].join('\n');
      const formatted = formatDocument(input);
      expect(formatted).toContain('```omg.response.401\n// no response body\n```');
      // Formatting again is stable
      expect(formatDocument(formatted)).toBe(formatted);
    });

    it('does not touch response blocks that have a body', () => {
      const input = ['```omg.response.200', '{ id: string }', '```', ''].join('\n');
      const formatted = formatDocument(input);
      expect(formatted).not.toContain('// no response body');
      expect(formatted).toContain('id: string');
    });

    it('does not add the comment to non-response empty blocks', () => {
      const input = ['```omg.path', '', '```', ''].join('\n');
      const formatted = formatDocument(input);
      expect(formatted).not.toContain('// no response body');
    });
  });
});
