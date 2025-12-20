#!/usr/bin/env node

/**
 * OMG CLI
 *
 * Command-line interface for OMG (OpenAPI Markdown Grammar)
 */

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import chokidar from 'chokidar';
import { loadApi, parseDocument, resolveDocument, buildEndpoint, formatDocument } from 'omg-parser';
import { compileToOpenApi, serialize, detectFormat } from 'omg-compiler';
import { lintDocument, summarizeLintResults, type Severity, type LintResult } from 'omg-linter';
import { runContractTests, formatResults, type ReportFormat, type AuthConfig } from 'omg-test';

const program = new Command();

program
  .name('omg')
  .description('OpenAPI Markdown Grammar - A human-first DSL for API specification')
  .version('0.1.0');

// Build function (reusable for watch mode)
async function runBuild(
  inputPath: string,
  options: { output?: string; format?: string; bundle?: boolean }
): Promise<boolean> {
  try {
    console.error(chalk.blue(`Parsing ${inputPath}...`));

    // Load and parse the API
    const api = loadApi(inputPath);

    console.error(chalk.blue(`Found ${api.endpoints.length} endpoints`));

    // Compile to OpenAPI
    const openapi = compileToOpenApi(api);

    // Determine output format
    const format = options.format || (options.output ? detectFormat(options.output) : 'yaml');

    // Serialize
    const output = serialize(openapi, format as 'yaml' | 'json');

    // Write output
    if (options.output) {
      fs.writeFileSync(options.output, output);
      console.error(chalk.green(`✓ Written to ${options.output}`));
    } else {
      console.log(output);
    }
    return true;
  } catch (error) {
    console.error(chalk.red(`Error: ${(error as Error).message}`));
    if ((error as Error).stack) {
      console.error(chalk.gray((error as Error).stack));
    }
    return false;
  }
}

// Build command
program
  .command('build <input>')
  .description('Compile OAL to OpenAPI')
  .option('-o, --output <file>', 'Output file (default: stdout)')
  .option('-f, --format <format>', 'Output format: yaml or json (auto-detected from extension)')
  .option('--bundle', 'Bundle all files into single output')
  .option('-w, --watch', 'Watch for changes and rebuild automatically')
  .action(
    async (
      input: string,
      options: { output?: string; format?: string; bundle?: boolean; watch?: boolean }
    ) => {
      const inputPath = path.resolve(input);

      if (!fs.existsSync(inputPath)) {
        console.error(chalk.red(`Error: File not found: ${inputPath}`));
        process.exit(1);
      }

      // Run initial build
      const success = await runBuild(inputPath, options);

      // If not in watch mode, exit based on build result
      if (!options.watch) {
        if (!success) {
          process.exit(1);
        }
        return;
      }

      // Watch mode
      if (!options.output) {
        console.error(
          chalk.yellow('Warning: Watch mode without --output will print to stdout on each change')
        );
      }

      console.error(chalk.blue('\nWatching for changes... (press Ctrl+C to stop)'));

      // Determine directories to watch
      const inputDir = path.dirname(inputPath);
      const watchPatterns = [
        path.join(inputDir, '**/*.omg.md'),
        path.join(inputDir, 'partials/**/*.omg.md'),
      ];

      // Debounce rebuilds to avoid multiple rapid rebuilds
      let rebuildTimeout: ReturnType<typeof setTimeout> | null = null;
      const debounceMs = 100;

      const watcher = chokidar.watch(watchPatterns, {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true,
        ignoreInitial: true,
      });

      const triggerRebuild = (changedPath: string) => {
        if (rebuildTimeout) {
          clearTimeout(rebuildTimeout);
        }
        rebuildTimeout = setTimeout(async () => {
          console.error(
            chalk.yellow(`\nFile changed: ${path.relative(process.cwd(), changedPath)}`)
          );
          await runBuild(inputPath, options);
          console.error(chalk.blue('Watching for changes...'));
        }, debounceMs);
      };

      watcher.on('change', triggerRebuild).on('add', triggerRebuild).on('unlink', triggerRebuild);
    }
  );

// Parse command (for debugging)
program
  .command('parse <input>')
  .description('Parse an OAL file and show the AST')
  .option('--json', 'Output as JSON')
  .action(async (input: string, options: { json?: boolean }) => {
    try {
      const inputPath = path.resolve(input);

      if (!fs.existsSync(inputPath)) {
        console.error(chalk.red(`Error: File not found: ${inputPath}`));
        process.exit(1);
      }

      const content = fs.readFileSync(inputPath, 'utf-8');
      const doc = parseDocument(content, input);
      const basePath = path.dirname(inputPath);
      const resolved = resolveDocument(doc, { basePath });
      const endpoint = buildEndpoint(resolved);

      const result = {
        document: resolved,
        endpoint,
      };

      if (options.json) {
        console.log(JSON.stringify(result, null, 2));
      } else {
        console.log(chalk.blue('Front Matter:'));
        console.log(resolved.frontMatter);
        console.log();
        console.log(chalk.blue('Title:'), resolved.title);
        console.log();
        console.log(chalk.blue('Description:'));
        console.log(resolved.description);
        console.log();
        console.log(chalk.blue('Blocks:'));
        for (const block of resolved.resolvedBlocks) {
          console.log(
            `  ${chalk.yellow(block.type)}${block.statusCode ? ` (${block.statusCode})` : ''}`
          );
          if (block.parsed) {
            console.log(`    Schema: ${block.parsed.kind}`);
          }
        }
        console.log();
        console.log(chalk.blue('Partials:'));
        for (const partial of resolved.partials) {
          console.log(`  ${partial.path}`);
        }
        if (endpoint) {
          console.log();
          console.log(chalk.blue('Endpoint:'));
          console.log(`  ${endpoint.method} ${endpoint.path}`);
          console.log(`  Operation ID: ${endpoint.operationId}`);
        }

        // Display warnings if any
        if (resolved.warnings && resolved.warnings.length > 0) {
          console.log();
          console.log(chalk.yellow(`Warnings (${resolved.warnings.length}):`));
          for (const warning of resolved.warnings) {
            console.log(chalk.yellow(`  ⚠ ${warning.message}`));
            if (warning.context) {
              console.log(chalk.gray(`    Context: ${warning.context}`));
            }
          }
        }
      }
    } catch (error) {
      console.error(chalk.red(`Error: ${(error as Error).message}`));
      if ((error as Error).stack) {
        console.error(chalk.gray((error as Error).stack));
      }
      process.exit(1);
    }
  });

// Lint command
program
  .command('lint <input>')
  .description('Validate OMG files using Spectral-style rules')
  .option('-c, --config <path>', 'Path to .spectral-omg.yaml config file')
  .option('-s, --severity <level>', 'Minimum severity to report: error, warn, hint', 'hint')
  .option('-r, --rules <rules>', 'Comma-separated list of rules to run')
  .option('--json', 'Output results as JSON')
  .option('-q, --quiet', 'Only output on error')
  .action(
    async (
      input: string,
      options: {
        config?: string;
        severity?: string;
        rules?: string;
        json?: boolean;
        quiet?: boolean;
      }
    ) => {
      try {
        const inputPath = path.resolve(input);

        if (!fs.existsSync(inputPath)) {
          console.error(chalk.red(`Error: File not found: ${inputPath}`));
          process.exit(1);
        }

        // Check if input is a directory or file
        const stat = fs.statSync(inputPath);
        const files: string[] = [];

        if (stat.isDirectory()) {
          // Find all .omg.md files recursively
          const findOmgFiles = (dir: string) => {
            const entries = fs.readdirSync(dir, { withFileTypes: true });
            for (const entry of entries) {
              const fullPath = path.join(dir, entry.name);
              if (
                entry.isDirectory() &&
                entry.name !== 'node_modules' &&
                entry.name !== 'partials'
              ) {
                findOmgFiles(fullPath);
              } else if (entry.name.endsWith('.omg.md')) {
                files.push(fullPath);
              }
            }
          };
          findOmgFiles(inputPath);
        } else {
          files.push(inputPath);
        }

        if (files.length === 0) {
          console.error(chalk.yellow('No .omg.md files found'));
          process.exit(0);
        }

        const allResults: Array<{ file: string; results: LintResult[] }> = [];
        let totalErrors = 0;
        let totalWarnings = 0;
        let totalHints = 0;

        for (const file of files) {
          const content = fs.readFileSync(file, 'utf-8');
          const doc = parseDocument(content, path.relative(process.cwd(), file));
          const basePath = path.dirname(file);

          // Try to resolve and parse
          let resolved;
          let resolutionWarning: string | null = null;
          try {
            resolved = resolveDocument(doc, { basePath });
          } catch (err) {
            // If resolution fails, use the unresolved document but warn
            resolutionWarning = (err as Error).message;
            resolved = { ...doc, resolvedBlocks: doc.blocks, warnings: [] };
          }

          // Show resolution warning if any
          if (resolutionWarning && !options.quiet) {
            console.error(
              chalk.yellow(
                `  ⚠ Resolution failed for ${path.relative(process.cwd(), file)}: ${resolutionWarning}`
              )
            );
          }

          // Run linter
          const lintResults = lintDocument(
            { document: resolved },
            {
              configPath: options.config,
              rules: options.rules?.split(','),
              severity: options.severity as Severity,
            }
          );

          const summary = summarizeLintResults(file, lintResults);
          totalErrors += summary.errors;
          totalWarnings += summary.warnings;
          totalHints += summary.hints;

          if (lintResults.length > 0) {
            allResults.push({ file, results: lintResults });
          }
        }

        // Output results
        if (options.json) {
          console.log(
            JSON.stringify(
              {
                files: files.length,
                results: allResults,
                summary: {
                  errors: totalErrors,
                  warnings: totalWarnings,
                  hints: totalHints,
                },
              },
              null,
              2
            )
          );
        } else {
          if (allResults.length === 0) {
            if (!options.quiet) {
              console.log(chalk.green(`✓ ${files.length} file(s) validated successfully`));
            }
          } else {
            for (const { file, results } of allResults) {
              const relativePath = path.relative(process.cwd(), file);
              console.log(chalk.underline(relativePath));

              for (const result of results) {
                const icon =
                  result.severity === 'error' ? '✖' : result.severity === 'warn' ? '⚠' : 'ℹ';
                const color =
                  result.severity === 'error'
                    ? chalk.red
                    : result.severity === 'warn'
                      ? chalk.yellow
                      : chalk.blue;
                const pathStr = result.path?.length
                  ? chalk.gray(` (${result.path.join('.')})`)
                  : '';

                console.log(
                  `  ${color(icon)} ${result.message}${pathStr} ${chalk.gray(`[${result.rule}]`)}`
                );
              }
              console.log();
            }

            // Summary
            const summaryParts: string[] = [];
            if (totalErrors > 0) summaryParts.push(chalk.red(`${totalErrors} error(s)`));
            if (totalWarnings > 0) summaryParts.push(chalk.yellow(`${totalWarnings} warning(s)`));
            if (totalHints > 0) summaryParts.push(chalk.blue(`${totalHints} hint(s)`));

            console.log(`Found ${summaryParts.join(', ')} in ${files.length} file(s)`);
          }
        }

        // Exit with error code if there are errors
        if (totalErrors > 0) {
          process.exit(1);
        }
      } catch (error) {
        console.error(chalk.red(`Error: ${(error as Error).message}`));
        if ((error as Error).stack) {
          console.error(chalk.gray((error as Error).stack));
        }
        process.exit(1);
      }
    }
  );

// Format command
program
  .command('fmt <input>')
  .description('Format OMG files for consistent style')
  .option('-w, --write', 'Write formatted output back to file(s)')
  .option('--check', 'Check if files are formatted (exit 1 if not)')
  .option('--indent <size>', 'Indentation size', '2')
  .action(async (input: string, options: { write?: boolean; check?: boolean; indent?: string }) => {
    try {
      const inputPath = path.resolve(input);

      if (!fs.existsSync(inputPath)) {
        console.error(chalk.red(`Error: File not found: ${inputPath}`));
        process.exit(1);
      }

      const indentSize = parseInt(options.indent || '2', 10);

      // Check if input is a directory or file
      const stat = fs.statSync(inputPath);
      const files: string[] = [];

      if (stat.isDirectory()) {
        // Find all .omg.md files recursively
        const findOmgFiles = (dir: string) => {
          const entries = fs.readdirSync(dir, { withFileTypes: true });
          for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory() && entry.name !== 'node_modules') {
              findOmgFiles(fullPath);
            } else if (entry.name.endsWith('.omg.md')) {
              files.push(fullPath);
            }
          }
        };
        findOmgFiles(inputPath);
      } else {
        files.push(inputPath);
      }

      if (files.length === 0) {
        console.error(chalk.yellow('No .omg.md files found'));
        process.exit(0);
      }

      let unformattedCount = 0;

      for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');
        const formatted = formatDocument(content, { indent: indentSize });
        const relativePath = path.relative(process.cwd(), file);

        if (content !== formatted) {
          unformattedCount++;

          if (options.check) {
            console.log(chalk.red(`✖ ${relativePath}`));
          } else if (options.write) {
            fs.writeFileSync(file, formatted);
            console.log(chalk.green(`✓ ${relativePath}`));
          } else {
            // Output to stdout
            console.log(chalk.blue(`--- ${relativePath} ---`));
            console.log(formatted);
          }
        } else if (!options.check) {
          console.log(chalk.gray(`  ${relativePath} (unchanged)`));
        }
      }

      if (options.check) {
        if (unformattedCount > 0) {
          console.log();
          console.log(
            chalk.red(`${unformattedCount} file(s) need formatting. Run 'omg fmt -w' to fix.`)
          );
          process.exit(1);
        } else {
          console.log(chalk.green(`✓ All ${files.length} file(s) are formatted`));
        }
      } else if (options.write) {
        console.log();
        console.log(chalk.green(`✓ Formatted ${unformattedCount} of ${files.length} file(s)`));
      }
    } catch (error) {
      console.error(chalk.red(`Error: ${(error as Error).message}`));
      if ((error as Error).stack) {
        console.error(chalk.gray((error as Error).stack));
      }
      process.exit(1);
    }
  });

// Init command
program
  .command('init [directory]')
  .description('Initialize a new OAL project')
  .action(async (directory: string = '.') => {
    const dir = path.resolve(directory);

    // Create directory structure
    const dirs = [
      '',
      'partials',
      'partials/params',
      'partials/responses',
      'partials/types',
      'endpoints',
    ];

    for (const d of dirs) {
      const fullPath = path.join(dir, d);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
    }

    // Create api.omg.md
    const apiContent = `---
name: My API
version: 1.0.0
baseUrl: https://api.example.com
---

# My API

Welcome to my API documentation.
`;

    const apiPath = path.join(dir, 'api.omg.md');
    if (!fs.existsSync(apiPath)) {
      fs.writeFileSync(apiPath, apiContent);
    }

    // Create example endpoint
    const exampleContent = `---
method: GET
path: /health
operationId: health-check
tags: [System]
---

# Health Check

Returns the health status of the API.

\`\`\`omg.response
{
  "status": "ok" | "degraded" | "down",
  "timestamp": datetime,
  "version": string
}
\`\`\`

\`\`\`omg.example
{
  "status": "ok",
  "timestamp": "2024-01-15T09:30:00Z",
  "version": "1.0.0"
}
\`\`\`
`;

    const examplePath = path.join(dir, 'endpoints', 'health.omg.md');
    if (!fs.existsSync(examplePath)) {
      fs.writeFileSync(examplePath, exampleContent);
    }

    // Create errors partial
    const errorsContent = `# Standard Errors

\`\`\`omg.response.400
{
  "error": string,
  "message": string,
  "code": integer?
}
\`\`\`

\`\`\`omg.response.401
{
  "error": "Unauthorized",
  "message": string
}
\`\`\`

\`\`\`omg.response.404
{
  "error": "Not Found",
  "message": string
}
\`\`\`

\`\`\`omg.response.500
{
  "error": "Internal Server Error",
  "message": string
}
\`\`\`
`;

    const errorsPath = path.join(dir, 'partials', 'responses', 'errors.omg.md');
    if (!fs.existsSync(errorsPath)) {
      fs.writeFileSync(errorsPath, errorsContent);
    }

    console.log(chalk.green(`✓ Initialized OMG project in ${dir}`));
    console.log();
    console.log('Created:');
    console.log(`  ${chalk.blue('api.omg.md')} - API root definition`);
    console.log(`  ${chalk.blue('endpoints/health.omg.md')} - Example endpoint`);
    console.log(`  ${chalk.blue('partials/responses/errors.omg.md')} - Standard errors`);
    console.log();
    console.log('Next steps:');
    console.log(`  1. Edit ${chalk.blue('api.omg.md')} to configure your API`);
    console.log(`  2. Add endpoints in ${chalk.blue('endpoints/')}`);
    console.log(`  3. Run ${chalk.blue('omg build api.omg.md -o openapi.yaml')} to compile`);
  });

// Test command (contract testing)
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
  .action(
    async (
      input: string,
      options: {
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
    ) => {
      try {
        const inputPath = path.resolve(input);

        if (!fs.existsSync(inputPath)) {
          console.error(chalk.red(`Error: File not found: ${inputPath}`));
          process.exit(1);
        }

        // Parse auth configuration
        let auth: AuthConfig | undefined;
        if (options.auth) {
          auth = { type: 'bearer', value: options.auth };
        } else if (options.basicAuth) {
          auth = { type: 'basic', value: Buffer.from(options.basicAuth).toString('base64') };
        } else if (options.authHeader) {
          const [name, ...valueParts] = options.authHeader.split(':');
          auth = { type: 'header', headerName: name, value: valueParts.join(':').trim() };
        }

        // Parse environment file
        let env: Record<string, string> | undefined;
        if (options.env) {
          const envPath = path.resolve(options.env);
          if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, 'utf-8');
            env = {};
            for (const line of envContent.split('\n')) {
              const trimmed = line.trim();
              if (trimmed && !trimmed.startsWith('#')) {
                const [key, ...valueParts] = trimmed.split('=');
                if (key) {
                  env[key.trim()] = valueParts.join('=').trim();
                }
              }
            }
          } else {
            console.error(chalk.yellow(`Warning: Environment file not found: ${envPath}`));
          }
        }

        // Parse additional headers
        const headers: Record<string, string> = {};
        if (options.header) {
          for (const h of options.header) {
            const [name, ...valueParts] = h.split(':');
            if (name) {
              headers[name.trim()] = valueParts.join(':').trim();
            }
          }
        }

        console.error(chalk.blue(`Running contract tests against ${options.against}...`));

        // Run the tests
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

        // Format output
        const reportFormat = (options.report || 'console') as ReportFormat;
        const output = formatResults(summary, reportFormat, options.verbose);

        // Write or print output
        if (options.output) {
          fs.writeFileSync(options.output, output);
          console.error(chalk.green(`✓ Report written to ${options.output}`));
        } else {
          console.log(output);
        }

        // Exit with error if tests failed
        if (summary.failed > 0) {
          process.exit(1);
        }
      } catch (error) {
        console.error(chalk.red(`Error: ${(error as Error).message}`));
        if ((error as Error).stack) {
          console.error(chalk.gray((error as Error).stack));
        }
        process.exit(1);
      }
    }
  );

program.parse();
