/**
 * Test command - Run contract tests against a live API
 */

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { loadApi } from 'omg-parser';
import {
  createTestRunner,
  createReporter,
  parseAuth,
  parseEnvFile,
  type ReportFormat,
} from 'omg-test';
import { validatePath, handleError } from './utils.js';

interface TestOptions {
  against: string;
  auth?: string;
  env?: string;
  timeout?: string;
  retries?: string;
  endpoints?: string[];
  skip?: string[];
  bail?: boolean;
  verbose?: boolean;
  report?: string;
  output?: string;
  noColors?: boolean;
}

export function registerTestCommand(program: Command): void {
  program
    .command('test <input>')
    .description('Run contract tests against a live API')
    .requiredOption('-a, --against <url>', 'Base URL of the API to test against')
    .option('--auth <auth>', 'Authentication (e.g., "Bearer TOKEN" or "X-API-Key: VALUE")')
    .option('--env <file>', 'Environment file with parameter values')
    .option('-t, --timeout <ms>', 'Request timeout in milliseconds', '30000')
    .option('-r, --retries <count>', 'Number of retries on network failures', '3')
    .option('-e, --endpoints <ids...>', 'Filter to specific endpoint operationIds')
    .option('-s, --skip <ids...>', 'Skip specific endpoint operationIds')
    .option('--bail', 'Stop on first failure')
    .option('-v, --verbose', 'Verbose output with request/response details')
    .option('--report <format>', 'Output format: console, json, junit', 'console')
    .option('-o, --output <file>', 'Output file (stdout if not specified)')
    .option('--no-colors', 'Disable colored output')
    .action(async (input: string, options: TestOptions) => {
      try {
        const inputPath = path.resolve(input);
        validatePath(inputPath);

        console.error(chalk.blue(`Loading API from ${inputPath}...`));

        // Load and parse the API
        const api = loadApi(inputPath);

        console.error(chalk.blue(`Found ${api.endpoints.length} endpoints`));
        console.error(chalk.blue(`Testing against: ${options.against}`));
        console.error('');

        // Load environment file if specified
        let env: Record<string, string> = {};
        if (options.env) {
          const envPath = path.resolve(options.env);
          validatePath(envPath, 'Environment file');
          const envContent = fs.readFileSync(envPath, 'utf-8');
          env = parseEnvFile(envContent);
          console.error(chalk.gray(`Loaded ${Object.keys(env).length} environment variables`));
        }

        // Parse authentication
        const auth = options.auth ? parseAuth(options.auth) : undefined;

        // Create test runner
        const runner = createTestRunner(api, {
          baseUrl: options.against,
          auth,
          env,
          timeout: parseInt(options.timeout || '30000', 10),
          retries: parseInt(options.retries || '3', 10),
          endpoints: options.endpoints,
          skip: options.skip,
          bail: options.bail,
          verbose: options.verbose,
        });

        // Run tests
        const results = await runner.run();

        // Create reporter
        const reporter = createReporter({
          format: (options.report || 'console') as ReportFormat,
          outputPath: options.output,
          colors: options.noColors !== true,
          verbose: options.verbose,
        });

        // For console format with output file, we need to suppress the inline output
        // and write the full report to the file
        if (options.report !== 'console' || options.output) {
          console.error(''); // Add newline after streaming output
          reporter.report(results);
        } else {
          // Console format without file - summary already printed
          console.log('');
          console.log(chalk.bold('Summary'));
          console.log(`  Total:   ${results.summary.total}`);
          console.log(chalk.green(`  Passed:  ${results.summary.passed}`));
          if (results.summary.failed > 0) {
            console.log(chalk.red(`  Failed:  ${results.summary.failed}`));
          }
          if (results.summary.errors > 0) {
            console.log(chalk.red(`  Errors:  ${results.summary.errors}`));
          }
          if (results.summary.skipped > 0) {
            console.log(chalk.yellow(`  Skipped: ${results.summary.skipped}`));
          }
          console.log(`  Duration: ${results.duration}ms`);
          console.log('');

          if (results.summary.failed === 0 && results.summary.errors === 0) {
            console.log(chalk.green.bold('All tests passed!'));
          } else {
            const failCount = results.summary.failed + results.summary.errors;
            console.log(chalk.red.bold(`${failCount} test(s) failed`));
          }
        }

        // Exit with appropriate code
        if (results.summary.failed > 0 || results.summary.errors > 0) {
          process.exit(1);
        }
      } catch (error) {
        handleError(error);
      }
    });
}
