/**
 * Test Reporter
 *
 * Formats test results for output (console, JSON, JUnit XML)
 */

import * as fs from 'fs';
import type {
  TestSuiteResult,
  EndpointTestResult,
  ReportFormat,
  ReporterOptions,
} from './types.js';

/**
 * Format and output test results
 */
export function reportResults(results: TestSuiteResult, options: ReporterOptions): void {
  const output = formatResults(results, options);

  if (options.outputPath) {
    fs.writeFileSync(options.outputPath, output, 'utf-8');
  } else {
    console.log(output);
  }
}

/**
 * Format results based on the specified format
 */
export function formatResults(results: TestSuiteResult, options: ReporterOptions): string {
  switch (options.format) {
    case 'json':
      return formatJson(results);
    case 'junit':
      return formatJunit(results);
    case 'console':
    default:
      return formatConsole(results, options);
  }
}

/**
 * Format results as JSON
 */
function formatJson(results: TestSuiteResult): string {
  return JSON.stringify(results, null, 2);
}

/**
 * Format results for console output with colors
 */
function formatConsole(results: TestSuiteResult, options: ReporterOptions): string {
  const lines: string[] = [];
  const colors = options.colors !== false;

  // ANSI color codes
  const green = colors ? '\x1b[32m' : '';
  const red = colors ? '\x1b[31m' : '';
  const yellow = colors ? '\x1b[33m' : '';
  const gray = colors ? '\x1b[90m' : '';
  const bold = colors ? '\x1b[1m' : '';
  const reset = colors ? '\x1b[0m' : '';

  // Header
  lines.push('');
  lines.push(`${bold}Contract Tests: ${results.apiName} v${results.apiVersion}${reset}`);
  lines.push(`${gray}Testing against: ${results.baseUrl}${reset}`);
  lines.push('');

  // Results
  for (const result of results.results) {
    const statusIcon = getStatusIcon(result.status, { green, red, yellow, gray, reset });
    const method = result.endpoint.method.padEnd(7);
    const path = result.endpoint.path;
    const duration = `${result.duration}ms`;

    let line = `${statusIcon} ${method} ${path} ${gray}(${duration})${reset}`;

    if (result.status === 'failed' || result.status === 'error') {
      lines.push(line);

      // Show error details
      if (result.error) {
        lines.push(`  ${red}Error: ${result.error}${reset}`);
      }

      if (result.statusCode !== undefined) {
        const expectedCodes = result.expectedStatusCodes.join(', ');
        if (!result.expectedStatusCodes.includes(result.statusCode)) {
          lines.push(`  ${red}Status: ${result.statusCode} (expected: ${expectedCodes})${reset}`);
        }
      }

      if (result.validation && !result.validation.valid) {
        for (const error of result.validation.errors) {
          lines.push(`  ${red}${error.path}: ${error.message}${reset}`);
        }
      }

      // Verbose mode: show request/response details
      if (options.verbose && result.response) {
        lines.push(`  ${gray}Response body:${reset}`);
        const body = JSON.stringify(result.response.body, null, 2);
        for (const bodyLine of body.split('\n').slice(0, 10)) {
          lines.push(`    ${gray}${bodyLine}${reset}`);
        }
        if (body.split('\n').length > 10) {
          lines.push(`    ${gray}...${reset}`);
        }
      }
    } else if (result.status === 'skipped') {
      line += ` ${yellow}(skipped: ${result.skipReason || 'no reason'})${reset}`;
      lines.push(line);
    } else {
      lines.push(line);
    }
  }

  // Summary
  lines.push('');
  lines.push(`${bold}Summary${reset}`);
  lines.push(`  Total:   ${results.summary.total}`);
  lines.push(`  ${green}Passed:  ${results.summary.passed}${reset}`);
  if (results.summary.failed > 0) {
    lines.push(`  ${red}Failed:  ${results.summary.failed}${reset}`);
  }
  if (results.summary.errors > 0) {
    lines.push(`  ${red}Errors:  ${results.summary.errors}${reset}`);
  }
  if (results.summary.skipped > 0) {
    lines.push(`  ${yellow}Skipped: ${results.summary.skipped}${reset}`);
  }
  lines.push(`  Duration: ${results.duration}ms`);
  lines.push('');

  // Overall result
  if (results.summary.failed === 0 && results.summary.errors === 0) {
    lines.push(`${green}${bold}All tests passed!${reset}`);
  } else {
    const failCount = results.summary.failed + results.summary.errors;
    lines.push(`${red}${bold}${failCount} test(s) failed${reset}`);
  }
  lines.push('');

  return lines.join('\n');
}

/**
 * Get status icon for console output
 */
function getStatusIcon(
  status: string,
  colors: { green: string; red: string; yellow: string; gray: string; reset: string }
): string {
  switch (status) {
    case 'passed':
      return `${colors.green}✓${colors.reset}`;
    case 'failed':
      return `${colors.red}✗${colors.reset}`;
    case 'error':
      return `${colors.red}!${colors.reset}`;
    case 'skipped':
      return `${colors.yellow}○${colors.reset}`;
    default:
      return `${colors.gray}?${colors.reset}`;
  }
}

/**
 * Format results as JUnit XML
 */
function formatJunit(results: TestSuiteResult): string {
  const lines: string[] = [];

  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push(
    `<testsuites name="${escapeXml(results.apiName)}" tests="${results.summary.total}" failures="${results.summary.failed}" errors="${results.summary.errors}" skipped="${results.summary.skipped}" time="${(results.duration / 1000).toFixed(3)}">`
  );

  // Group by operationId
  lines.push(
    `  <testsuite name="Contract Tests" tests="${results.summary.total}" failures="${results.summary.failed}" errors="${results.summary.errors}" skipped="${results.summary.skipped}" time="${(results.duration / 1000).toFixed(3)}" timestamp="${results.startedAt.toISOString()}">`
  );

  for (const result of results.results) {
    const testName = `${result.endpoint.method} ${result.endpoint.path}`;
    const className = result.endpoint.operationId;
    const time = (result.duration / 1000).toFixed(3);

    lines.push(
      `    <testcase name="${escapeXml(testName)}" classname="${escapeXml(className)}" time="${time}">`
    );

    if (result.status === 'failed') {
      const message = formatFailureMessage(result);
      lines.push(`      <failure message="${escapeXml(message)}" type="AssertionError">`);
      lines.push(`<![CDATA[${formatFailureDetails(result)}]]>`);
      lines.push(`      </failure>`);
    } else if (result.status === 'error') {
      const message = result.error || 'Unknown error';
      lines.push(`      <error message="${escapeXml(message)}" type="Error">`);
      lines.push(`<![CDATA[${result.error || 'Unknown error'}]]>`);
      lines.push(`      </error>`);
    } else if (result.status === 'skipped') {
      lines.push(`      <skipped message="${escapeXml(result.skipReason || 'Skipped')}" />`);
    }

    lines.push(`    </testcase>`);
  }

  lines.push(`  </testsuite>`);
  lines.push(`</testsuites>`);

  return lines.join('\n');
}

/**
 * Format failure message for JUnit
 */
function formatFailureMessage(result: EndpointTestResult): string {
  const messages: string[] = [];

  if (result.statusCode !== undefined && !result.expectedStatusCodes.includes(result.statusCode)) {
    messages.push(
      `Expected status ${result.expectedStatusCodes.join(' or ')}, got ${result.statusCode}`
    );
  }

  if (result.validation && !result.validation.valid) {
    messages.push(`${result.validation.errors.length} validation error(s)`);
  }

  return messages.join('; ') || 'Test failed';
}

/**
 * Format failure details for JUnit CDATA
 */
function formatFailureDetails(result: EndpointTestResult): string {
  const lines: string[] = [];

  if (result.statusCode !== undefined && !result.expectedStatusCodes.includes(result.statusCode)) {
    lines.push(`Status Code:`);
    lines.push(`  Expected: ${result.expectedStatusCodes.join(' or ')}`);
    lines.push(`  Actual: ${result.statusCode}`);
    lines.push('');
  }

  if (result.validation && !result.validation.valid) {
    lines.push('Validation Errors:');
    for (const error of result.validation.errors) {
      lines.push(`  ${error.path}: ${error.message}`);
    }
    lines.push('');
  }

  if (result.request) {
    lines.push('Request:');
    lines.push(`  ${result.request.method} ${result.request.url}`);
    lines.push('');
  }

  if (result.response) {
    lines.push('Response Body:');
    lines.push(JSON.stringify(result.response.body, null, 2));
  }

  return lines.join('\n');
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

/**
 * Create a reporter instance
 */
export function createReporter(options: Partial<ReporterOptions> = {}) {
  const resolvedOptions: ReporterOptions = {
    format: options.format || 'console',
    outputPath: options.outputPath,
    colors: options.colors !== false,
    verbose: options.verbose || false,
  };

  return {
    /**
     * Report test results
     */
    report(results: TestSuiteResult): void {
      reportResults(results, resolvedOptions);
    },

    /**
     * Format results without outputting
     */
    format(results: TestSuiteResult): string {
      return formatResults(results, resolvedOptions);
    },

    /**
     * Report a single endpoint result (for streaming output)
     */
    reportEndpoint(result: EndpointTestResult): void {
      if (resolvedOptions.format !== 'console') {
        return; // Only console format supports streaming
      }

      const colors = resolvedOptions.colors !== false;
      const green = colors ? '\x1b[32m' : '';
      const red = colors ? '\x1b[31m' : '';
      const yellow = colors ? '\x1b[33m' : '';
      const gray = colors ? '\x1b[90m' : '';
      const reset = colors ? '\x1b[0m' : '';

      const statusIcon = getStatusIcon(result.status, { green, red, yellow, gray, reset });
      const method = result.endpoint.method.padEnd(7);
      const path = result.endpoint.path;
      const duration = `${result.duration}ms`;

      let line = `${statusIcon} ${method} ${path} ${gray}(${duration})${reset}`;

      if (result.status === 'skipped') {
        line += ` ${yellow}(${result.skipReason || 'skipped'})${reset}`;
      }

      console.log(line);

      if (result.status === 'failed' || result.status === 'error') {
        if (result.error) {
          console.log(`  ${red}Error: ${result.error}${reset}`);
        }

        if (result.statusCode !== undefined) {
          if (!result.expectedStatusCodes.includes(result.statusCode)) {
            console.log(
              `  ${red}Status: ${result.statusCode} (expected: ${result.expectedStatusCodes.join(', ')})${reset}`
            );
          }
        }

        if (result.validation && !result.validation.valid) {
          for (const error of result.validation.errors) {
            console.log(`  ${red}${error.path}: ${error.message}${reset}`);
          }
        }
      }
    },
  };
}
