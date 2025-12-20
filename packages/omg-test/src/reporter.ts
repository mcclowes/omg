/**
 * Test Reporters
 *
 * Format test results for different output formats.
 */

import type { TestSummary, TestResult, CheckResult, ReportFormat } from './types.js';

/**
 * Format test results based on report type
 */
export function formatResults(
  summary: TestSummary,
  format: ReportFormat,
  verbose: boolean = false
): string {
  switch (format) {
    case 'json':
      return formatJson(summary);
    case 'junit':
      return formatJunit(summary);
    case 'console':
    default:
      return formatConsole(summary, verbose);
  }
}

/**
 * Console-friendly output with colors (via chalk or ANSI codes)
 */
function formatConsole(summary: TestSummary, verbose: boolean): string {
  const lines: string[] = [];

  // ANSI color codes
  const green = '\x1b[32m';
  const red = '\x1b[31m';
  const yellow = '\x1b[33m';
  const gray = '\x1b[90m';
  const reset = '\x1b[0m';
  const bold = '\x1b[1m';

  lines.push('');

  for (const result of summary.results) {
    const icon = result.passed ? `${green}✓${reset}` : `${red}✗${reset}`;
    const status = result.passed ? green : red;

    lines.push(`${icon} ${status}${result.method} ${result.path}${reset}`);

    if (result.error) {
      lines.push(`  ${yellow}${result.error}${reset}`);
      continue;
    }

    // Show checks
    for (const check of result.checks) {
      if (check.passed) {
        if (verbose) {
          lines.push(`  ${green}✓${reset} ${check.name}: ${check.message || 'passed'}`);
        }
      } else {
        lines.push(`  ${red}✗${reset} ${check.name}: ${check.message}`);
        if (check.path) {
          lines.push(`    ${gray}Path: ${check.path}${reset}`);
        }
        if (check.expected !== undefined) {
          lines.push(`    ${gray}Expected: ${formatValue(check.expected)}${reset}`);
        }
        if (check.actual !== undefined) {
          lines.push(`    ${gray}Actual: ${formatValue(check.actual)}${reset}`);
        }
      }
    }

    if (verbose && result.response) {
      lines.push(`  ${gray}Response: ${result.response.status} (${result.duration}ms)${reset}`);
    }
  }

  lines.push('');

  // Summary line
  const summaryParts: string[] = [];
  if (summary.passed > 0) {
    summaryParts.push(`${green}${summary.passed} passed${reset}`);
  }
  if (summary.failed > 0) {
    summaryParts.push(`${red}${summary.failed} failed${reset}`);
  }
  if (summary.skipped > 0) {
    summaryParts.push(`${yellow}${summary.skipped} skipped${reset}`);
  }

  lines.push(`${bold}Tests:${reset} ${summaryParts.join(', ')}`);
  lines.push(`${bold}Time:${reset} ${(summary.duration / 1000).toFixed(2)}s`);
  lines.push('');

  return lines.join('\n');
}

/**
 * JSON output for programmatic consumption
 */
function formatJson(summary: TestSummary): string {
  return JSON.stringify(summary, null, 2);
}

/**
 * JUnit XML output for CI/CD integration
 */
function formatJunit(summary: TestSummary): string {
  const lines: string[] = [];

  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push(
    `<testsuite name="Contract Tests" tests="${summary.total}" failures="${summary.failed}" skipped="${summary.skipped}" time="${(summary.duration / 1000).toFixed(3)}">`
  );

  for (const result of summary.results) {
    const testName = escapeXml(`${result.method} ${result.path}`);
    const className = escapeXml(result.operationId);
    const time = (result.duration / 1000).toFixed(3);

    lines.push(`  <testcase name="${testName}" classname="${className}" time="${time}">`);

    if (result.error?.includes('skipped')) {
      lines.push(`    <skipped message="${escapeXml(result.error)}"/>`);
    } else if (!result.passed) {
      const failedChecks = result.checks.filter((c) => !c.passed);
      const message = failedChecks.map((c) => c.message).join('; ');
      const details = formatFailureDetails(result);

      lines.push(`    <failure message="${escapeXml(message)}">`);
      lines.push(`      ${escapeXml(details)}`);
      lines.push('    </failure>');
    }

    lines.push('  </testcase>');
  }

  lines.push('</testsuite>');

  return lines.join('\n');
}

/**
 * Format failure details for JUnit
 */
function formatFailureDetails(result: TestResult): string {
  const lines: string[] = [];

  lines.push(`Endpoint: ${result.method} ${result.path}`);

  if (result.request) {
    lines.push(`Request URL: ${result.request.url}`);
  }

  if (result.response) {
    lines.push(`Response Status: ${result.response.status}`);
  }

  lines.push('');
  lines.push('Failed Checks:');

  for (const check of result.checks) {
    if (!check.passed) {
      lines.push(`  - ${check.name}: ${check.message}`);
      if (check.expected !== undefined) {
        lines.push(`    Expected: ${formatValue(check.expected)}`);
      }
      if (check.actual !== undefined) {
        lines.push(`    Actual: ${formatValue(check.actual)}`);
      }
    }
  }

  return lines.join('\n');
}

/**
 * Format a value for display
 */
function formatValue(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  return JSON.stringify(value);
}

/**
 * Escape special XML characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
