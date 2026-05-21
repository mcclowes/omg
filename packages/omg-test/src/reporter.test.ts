import { describe, it, expect } from 'vitest';
import { formatResults } from './reporter.js';
import type { TestSummary } from './types.js';

function summary(overrides: Partial<TestSummary> = {}): TestSummary {
  return {
    total: 1,
    passed: 1,
    failed: 0,
    skipped: 0,
    duration: 1234,
    results: [
      {
        operationId: 'get-thing',
        method: 'GET',
        path: '/things',
        passed: true,
        duration: 12,
        checks: [{ name: 'Status code', passed: true, message: 'ok' }],
      },
    ],
    ...overrides,
  };
}

describe('formatResults - json', () => {
  it('produces parseable JSON containing the summary', () => {
    const output = formatResults(summary(), 'json');
    expect(JSON.parse(output)).toMatchObject({ total: 1, passed: 1 });
  });
});

describe('formatResults - console', () => {
  it('shows pass and fail counts', () => {
    const output = formatResults(summary({ passed: 1, failed: 1, total: 2 }), 'console');
    expect(output).toContain('1 passed');
    expect(output).toContain('1 failed');
  });
});

describe('formatResults - junit', () => {
  it('emits a testsuite with the right counts', () => {
    const output = formatResults(summary(), 'junit');
    expect(output).toContain('<?xml version="1.0"');
    expect(output).toContain('<testsuite name="Contract Tests" tests="1" failures="0"');
    expect(output).toContain('<testcase name="GET /things"');
  });

  it('renders a failure element for a failed test', () => {
    const failing = summary({
      passed: 0,
      failed: 1,
      results: [
        {
          operationId: 'get-thing',
          method: 'GET',
          path: '/things',
          passed: false,
          duration: 5,
          checks: [{ name: 'Status code', passed: false, message: 'Unexpected status code' }],
        },
      ],
    });
    const output = formatResults(failing, 'junit');
    expect(output).toContain('<failure message="Unexpected status code">');
  });

  it('escapes XML-sensitive characters in test names', () => {
    const tricky = summary({
      results: [
        {
          operationId: 'op',
          method: 'GET',
          path: '/a?b=<c>&d',
          passed: true,
          duration: 1,
          checks: [],
        },
      ],
    });
    const output = formatResults(tricky, 'junit');
    expect(output).toContain('/a?b=&lt;c&gt;&amp;d');
    expect(output).not.toContain('/a?b=<c>&d');
  });

  it('renders a skipped element for a skipped test', () => {
    const skippedSummary = summary({
      passed: 0,
      skipped: 1,
      results: [
        {
          operationId: 'op',
          method: 'POST',
          path: '/things',
          passed: false,
          duration: 0,
          checks: [],
          error: 'Skipped: Missing required parameters: body',
        },
      ],
    });
    const output = formatResults(skippedSummary, 'junit');
    expect(output).toContain('<skipped message=');
  });
});
