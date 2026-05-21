/**
 * Test command - Run contract tests against a live API
 */

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { runContractTests, formatResults, type ReportFormat, type AuthConfig } from 'omg-test';
import { validatePath, handleError } from './utils.js';

interface TestOptions {
  against: string;
  auth?: string;
  authHeader?: string;
  basicAuth?: string;
  endpoint?: string[];
  env?: string;
  header?: string[];
  timeout?: string;
  retries?: string;
  report?: string;
  output?: string;
  verbose?: boolean;
}

/**
 * Parse an .env-style file into a key/value record
 */
function parseEnvFile(content: string): Record<string, string> {
  const env: Record<string, string> = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...valueParts] = trimmed.split('=');
    if (key) {
      env[key.trim()] = valueParts.join('=').trim();
    }
  }
  return env;
}

/**
 * Parse `Name: value` style header strings into a record
 */
function parseHeaders(raw: string[] | undefined): Record<string, string> {
  const headers: Record<string, string> = {};
  for (const h of raw ?? []) {
    const [name, ...valueParts] = h.split(':');
    if (name) {
      headers[name.trim()] = valueParts.join(':').trim();
    }
  }
  return headers;
}

/**
 * Build an AuthConfig from the mutually-exclusive auth options
 */
function resolveAuth(options: TestOptions): AuthConfig | undefined {
  if (options.auth) {
    return { type: 'bearer', value: options.auth };
  }
  if (options.basicAuth) {
    return { type: 'basic', value: Buffer.from(options.basicAuth).toString('base64') };
  }
  if (options.authHeader) {
    const [name, ...valueParts] = options.authHeader.split(':');
    return { type: 'header', headerName: name, value: valueParts.join(':').trim() };
  }
  return undefined;
}

export function registerTestCommand(program: Command): void {
  program
    .command('test <input>')
    .description('Run contract tests against a live API')
    .requiredOption('-a, --against <url>', 'Base URL of the API to test against')
    .option('--auth <token>', 'Bearer token for authentication')
    .option('--auth-header <name:value>', 'Custom auth header (e.g., "X-API-Key:secret")')
    .option('--basic-auth <credentials>', 'Basic auth credentials (user:password)')
    .option('-e, --endpoint <endpoints...>', 'Filter to specific endpoints (operationId or path)')
    .option('--env <file>', 'Environment file with parameter values')
    .option('-H, --header <headers...>', 'Additional headers (e.g., "X-Custom: value")')
    .option('-t, --timeout <ms>', 'Request timeout in milliseconds', '30000')
    .option('-r, --retries <count>', 'Number of retries on network failure', '2')
    .option('--report <format>', 'Output format: console, json, junit', 'console')
    .option('-o, --output <file>', 'Write report to file instead of stdout')
    .option('-v, --verbose', 'Verbose output')
    .addHelpText(
      'after',
      `
Examples:
  $ omg test api.omg.md --against https://api.example.com
  $ omg test api.omg.md --against $URL --auth "$TOKEN"
  $ omg test api.omg.md --against $URL --report junit -o results.xml`
    )
    .action(async (input: string, options: TestOptions) => {
      try {
        const inputPath = path.resolve(input);
        validatePath(inputPath);

        const auth = resolveAuth(options);

        let env: Record<string, string> | undefined;
        if (options.env) {
          const envPath = path.resolve(options.env);
          if (fs.existsSync(envPath)) {
            env = parseEnvFile(fs.readFileSync(envPath, 'utf-8'));
          } else {
            console.error(chalk.yellow(`Warning: Environment file not found: ${envPath}`));
          }
        }

        const headers = parseHeaders(options.header);

        console.error(chalk.blue(`Running contract tests against ${options.against}...`));

        const summary = await runContractTests(inputPath, {
          baseUrl: options.against,
          auth,
          endpoints: options.endpoint,
          env,
          headers,
          timeout: parseInt(options.timeout || '30000', 10),
          retries: parseInt(options.retries || '2', 10),
          verbose: options.verbose,
        });

        const reportFormat = (options.report || 'console') as ReportFormat;
        const output = formatResults(summary, reportFormat, options.verbose);

        if (options.output) {
          fs.writeFileSync(options.output, output);
          console.error(chalk.green(`✓ Report written to ${options.output}`));
        } else {
          console.log(output);
        }

        if (summary.failed > 0) {
          process.exit(1);
        }
      } catch (error) {
        handleError(error);
      }
    });
}
