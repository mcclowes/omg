#!/usr/bin/env node

/**
 * OMG CLI
 *
 * Command-line interface for OMG (OpenAPI Markdown Grammar)
 */

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { execSync, spawnSync } from 'child_process';
import chalk from 'chalk';
import chokidar from 'chokidar';
import { loadApi, parseDocument, resolveDocument, buildEndpoint, formatDocument } from 'omg-parser';
import { compileToOpenApi, serialize, detectFormat } from 'omg-compiler';
import { lintDocument, summarizeLintResults, type Severity, type LintResult } from 'omg-linter';
import { importOpenApi, generateDocument, generateFiles, type OpenApiSpec } from 'omg-importer';
import { createMockServer } from 'omg-mock-server';
import YAML from 'yaml';

/**
 * Check if oasdiff is installed and available
 */
function checkOasdiff(): boolean {
  try {
    execSync('oasdiff --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Compile an OMG file to a temporary OpenAPI YAML file
 * Returns the path to the temp file
 */
function compileToTempFile(inputPath: string): string {
  const api = loadApi(inputPath);
  const openapi = compileToOpenApi(api);
  const yaml = serialize(openapi, 'yaml');

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'omg-diff-'));
  const tempFile = path.join(tempDir, 'openapi.yaml');
  fs.writeFileSync(tempFile, yaml);

  return tempFile;
}

/**
 * Clean up temporary files
 */
function cleanupTempFiles(...files: string[]): void {
  for (const file of files) {
    try {
      const dir = path.dirname(file);
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      // Ignore cleanup errors
    }
  }
}

/**
 * Run oasdiff command and return the result
 */
function runOasdiff(
  command: 'diff' | 'breaking' | 'changelog',
  baseSpec: string,
  revisionSpec: string,
  options: { format?: string; failOnDiff?: boolean } = {}
): { output: string; exitCode: number } {
  const format = options.format || 'text';
  const args = [command, baseSpec, revisionSpec, '--format', format];

  if (command === 'breaking' && options.failOnDiff) {
    args.push('--fail-on', 'ERR');
  }

  const result = spawnSync('oasdiff', args, {
    encoding: 'utf-8',
    maxBuffer: 10 * 1024 * 1024, // 10MB buffer
  });

  return {
    output: result.stdout || result.stderr || '',
    exitCode: result.status ?? 1,
  };
}

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

// Import command
program
  .command('import <input>')
  .description('Import an OpenAPI specification to OMG format')
  .option('-o, --output <directory>', 'Output directory (default: current directory)')
  .option('--inline', 'Inline referenced schemas instead of using references')
  .option('--dry-run', 'Show what would be generated without writing files')
  .option('--no-partials', 'Disable automatic partial extraction for repeated parameters')
  .option('--partial-threshold <n>', 'Minimum occurrences to extract as partial (default: 3)', '3')
  .action(
    async (
      input: string,
      options: {
        output?: string;
        inline?: boolean;
        dryRun?: boolean;
        partials?: boolean;
        partialThreshold?: string;
      }
    ) => {
      try {
        const inputPath = path.resolve(input);

        if (!fs.existsSync(inputPath)) {
          console.error(chalk.red(`Error: File not found: ${inputPath}`));
          process.exit(1);
        }

        console.error(chalk.blue(`Reading OpenAPI spec from ${input}...`));

        // Read and parse the OpenAPI spec
        const content = fs.readFileSync(inputPath, 'utf-8');
        let spec: OpenApiSpec;

        try {
          // Try parsing as YAML (which also handles JSON)
          spec = YAML.parse(content) as OpenApiSpec;
        } catch {
          // Try parsing as JSON
          try {
            spec = JSON.parse(content) as OpenApiSpec;
          } catch {
            console.error(chalk.red('Error: Could not parse input file as YAML or JSON'));
            process.exit(1);
          }
        }

        // Validate it's an OpenAPI spec
        if (!spec.openapi) {
          console.error(chalk.red('Error: Input does not appear to be an OpenAPI specification'));
          console.error(chalk.gray('Missing "openapi" field'));
          process.exit(1);
        }

        console.error(
          chalk.blue(`Found OpenAPI ${spec.openapi} specification: ${spec.info.title}`)
        );

        // Import the spec
        const outputDir = options.output ? path.resolve(options.output) : process.cwd();
        const result = importOpenApi(spec, {
          baseDir: outputDir,
          inlineRefs: options.inline ?? false,
          extractPartials: options.partials !== false,
          partialThreshold: parseInt(options.partialThreshold ?? '3', 10),
        });

        console.error(chalk.blue(`Converted ${result.endpoints.length} endpoints`));
        if (result.types.size > 0) {
          console.error(chalk.blue(`Found ${result.types.size} named types`));
        }
        if (result.partials.size > 0) {
          console.error(chalk.blue(`Extracted ${result.partials.size} reusable partials`));
        }

        // Show warnings
        if (result.warnings.length > 0) {
          console.error(chalk.yellow(`\nWarnings (${result.warnings.length}):`));
          for (const warning of result.warnings) {
            console.error(chalk.yellow(`  ⚠ ${warning.message}`));
          }
        }

        // Generate files
        const files = generateFiles(result.api, result.endpoints, result.types, result.partials);

        if (options.dryRun) {
          console.log(chalk.blue('\nDry run - would generate the following files:\n'));
          for (const file of files) {
            const relativePath = path.relative(process.cwd(), file.path);
            console.log(chalk.green(`  ${relativePath}`));
          }
          console.log();
          console.log(chalk.gray('Run without --dry-run to write files'));
        } else {
          // Create directories and write files
          for (const file of files) {
            const dir = path.dirname(file.path);
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(file.path, file.content);
            const relativePath = path.relative(process.cwd(), file.path);
            console.log(chalk.green(`  ✓ ${relativePath}`));
          }

          console.log();
          console.log(chalk.green(`✓ Imported ${files.length} files to ${outputDir}`));
          console.log();
          console.log('Next steps:');
          console.log(`  1. Review the generated files`);
          console.log(`  2. Run ${chalk.blue('omg lint ' + outputDir)} to check for issues`);
          console.log(
            `  3. Run ${chalk.blue('omg build ' + path.join(outputDir, 'api.omg.md') + ' -o openapi.yaml')} to compile back`
          );
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

// Mock server command
program
  .command('mock <input>')
  .description('Start a mock server from an OMG API specification')
  .option('-p, --port <port>', 'Port to listen on', '3000')
  .option('-b, --base-path <path>', 'Base URL path prefix (e.g., /api/v1)')
  .option('-d, --delay <ms>', 'Response delay in milliseconds', '0')
  .option('-s, --seed <seed>', 'Random seed for deterministic mock data')
  .option('--no-cors', 'Disable CORS')
  .option('-q, --quiet', 'Disable request logging')
  .option('-w, --watch', 'Watch for changes and restart server')
  .action(
    async (
      input: string,
      options: {
        port?: string;
        basePath?: string;
        delay?: string;
        seed?: string;
        cors?: boolean;
        quiet?: boolean;
        watch?: boolean;
      }
    ) => {
      const inputPath = path.resolve(input);

      if (!fs.existsSync(inputPath)) {
        console.error(chalk.red(`Error: File not found: ${inputPath}`));
        process.exit(1);
      }

      const startServer = async () => {
        try {
          console.error(chalk.blue(`Loading API from ${inputPath}...`));

          // Load and parse the API
          const api = loadApi(inputPath);

          console.error(chalk.blue(`Found ${api.endpoints.length} endpoints`));

          // Create and start mock server
          const server = createMockServer(api, {
            port: parseInt(options.port || '3000', 10),
            basePath: options.basePath || '',
            delay: parseInt(options.delay || '0', 10),
            seed: options.seed ? parseInt(options.seed, 10) : undefined,
            cors: options.cors !== false,
            logging: !options.quiet,
          });

          await server.start();

          console.log(chalk.green(`\n✓ Mock server running at ${server.url}`));
          console.log(chalk.gray('Press Ctrl+C to stop\n'));

          return server;
        } catch (error) {
          console.error(chalk.red(`Error: ${(error as Error).message}`));
          if ((error as Error).stack) {
            console.error(chalk.gray((error as Error).stack));
          }
          process.exit(1);
        }
      };

      let server = await startServer();

      // Handle graceful shutdown
      const shutdown = async () => {
        console.log(chalk.yellow('\nShutting down mock server...'));
        await server.stop();
        process.exit(0);
      };

      process.on('SIGINT', shutdown);
      process.on('SIGTERM', shutdown);

      // Watch mode
      if (options.watch) {
        console.log(chalk.blue('Watching for changes...'));

        const inputDir = path.dirname(inputPath);
        const watchPatterns = [
          path.join(inputDir, '**/*.omg.md'),
          path.join(inputDir, 'partials/**/*.omg.md'),
        ];

        let restartTimeout: ReturnType<typeof setTimeout> | null = null;
        const debounceMs = 500;

        const watcher = chokidar.watch(watchPatterns, {
          ignored: /(^|[\/\\])\../,
          persistent: true,
          ignoreInitial: true,
        });

        const triggerRestart = async (changedPath: string) => {
          if (restartTimeout) {
            clearTimeout(restartTimeout);
          }
          restartTimeout = setTimeout(async () => {
            console.log(
              chalk.yellow(`\nFile changed: ${path.relative(process.cwd(), changedPath)}`)
            );
            console.log(chalk.blue('Restarting server...'));

            try {
              await server.stop();
              server = await startServer();
            } catch (error) {
              console.error(chalk.red(`Error restarting server: ${(error as Error).message}`));
            }
          }, debounceMs);
        };

        watcher.on('change', triggerRestart).on('add', triggerRestart).on('unlink', triggerRestart);
      }
    }
  );

// Diff command
program
  .command('diff <base> <revision>')
  .description('Compare two OMG API specifications and show all differences')
  .option('-f, --format <format>', 'Output format: text, yaml, json, html (default: text)', 'text')
  .option('-o, --output <file>', 'Write output to file instead of stdout')
  .addHelpText(
    'after',
    `
Examples:
  $ omg diff v1/api.omg.md v2/api.omg.md
  $ omg diff old.omg.md new.omg.md --format json
  $ omg diff base.omg.md head.omg.md -o diff.html --format html

Requirements:
  This command requires oasdiff to be installed.
  Install via: brew install oasdiff (macOS) or see https://github.com/oasdiff/oasdiff

Powered by oasdiff: https://github.com/oasdiff/oasdiff
`
  )
  .action(async (base: string, revision: string, options: { format?: string; output?: string }) => {
    try {
      // Check oasdiff is installed
      if (!checkOasdiff()) {
        console.error(chalk.red('Error: oasdiff is not installed.'));
        console.error();
        console.error('Install oasdiff using one of these methods:');
        console.error(chalk.blue('  brew install oasdiff') + ' (macOS)');
        console.error(chalk.blue('  go install github.com/oasdiff/oasdiff@latest') + ' (Go)');
        console.error(
          chalk.blue(
            '  curl -fsSL https://raw.githubusercontent.com/oasdiff/oasdiff/main/install.sh | sh'
          )
        );
        console.error();
        console.error('For more options, see: https://github.com/oasdiff/oasdiff');
        process.exit(1);
      }

      const basePath = path.resolve(base);
      const revisionPath = path.resolve(revision);

      // Validate input files exist
      if (!fs.existsSync(basePath)) {
        console.error(chalk.red(`Error: Base file not found: ${basePath}`));
        process.exit(1);
      }
      if (!fs.existsSync(revisionPath)) {
        console.error(chalk.red(`Error: Revision file not found: ${revisionPath}`));
        process.exit(1);
      }

      console.error(chalk.blue(`Compiling ${path.basename(base)}...`));
      const baseTemp = compileToTempFile(basePath);

      console.error(chalk.blue(`Compiling ${path.basename(revision)}...`));
      const revisionTemp = compileToTempFile(revisionPath);

      try {
        console.error(chalk.blue('Running diff...'));
        const result = runOasdiff('diff', baseTemp, revisionTemp, { format: options.format });

        if (options.output) {
          fs.writeFileSync(options.output, result.output);
          console.error(chalk.green(`✓ Diff written to ${options.output}`));
        } else {
          console.log(result.output);
        }
      } finally {
        cleanupTempFiles(baseTemp, revisionTemp);
      }
    } catch (error) {
      console.error(chalk.red(`Error: ${(error as Error).message}`));
      process.exit(1);
    }
  });

// Breaking changes command
program
  .command('breaking <base> <revision>')
  .description('Detect breaking changes between two OMG API specifications')
  .option('-f, --format <format>', 'Output format: text, yaml, json, html (default: text)', 'text')
  .option('-o, --output <file>', 'Write output to file instead of stdout')
  .option('--fail-on-diff', 'Exit with code 1 if breaking changes are found (for CI)')
  .addHelpText(
    'after',
    `
Examples:
  $ omg breaking v1/api.omg.md v2/api.omg.md
  $ omg breaking old.omg.md new.omg.md --fail-on-diff
  $ omg breaking base.omg.md head.omg.md --format json

Breaking changes detected include:
  - Removed endpoints or operations
  - New required request parameters
  - Removed response fields
  - Type changes (e.g., string to integer)
  - Enum value removal
  - Constraint tightening

Requirements:
  This command requires oasdiff to be installed.
  Install via: brew install oasdiff (macOS) or see https://github.com/oasdiff/oasdiff

Powered by oasdiff: https://github.com/oasdiff/oasdiff
`
  )
  .action(
    async (
      base: string,
      revision: string,
      options: { format?: string; output?: string; failOnDiff?: boolean }
    ) => {
      try {
        // Check oasdiff is installed
        if (!checkOasdiff()) {
          console.error(chalk.red('Error: oasdiff is not installed.'));
          console.error();
          console.error('Install oasdiff using one of these methods:');
          console.error(chalk.blue('  brew install oasdiff') + ' (macOS)');
          console.error(chalk.blue('  go install github.com/oasdiff/oasdiff@latest') + ' (Go)');
          console.error(
            chalk.blue(
              '  curl -fsSL https://raw.githubusercontent.com/oasdiff/oasdiff/main/install.sh | sh'
            )
          );
          console.error();
          console.error('For more options, see: https://github.com/oasdiff/oasdiff');
          process.exit(1);
        }

        const basePath = path.resolve(base);
        const revisionPath = path.resolve(revision);

        // Validate input files exist
        if (!fs.existsSync(basePath)) {
          console.error(chalk.red(`Error: Base file not found: ${basePath}`));
          process.exit(1);
        }
        if (!fs.existsSync(revisionPath)) {
          console.error(chalk.red(`Error: Revision file not found: ${revisionPath}`));
          process.exit(1);
        }

        console.error(chalk.blue(`Compiling ${path.basename(base)}...`));
        const baseTemp = compileToTempFile(basePath);

        console.error(chalk.blue(`Compiling ${path.basename(revision)}...`));
        const revisionTemp = compileToTempFile(revisionPath);

        try {
          console.error(chalk.blue('Checking for breaking changes...'));
          const result = runOasdiff('breaking', baseTemp, revisionTemp, {
            format: options.format,
            failOnDiff: options.failOnDiff,
          });

          if (options.output) {
            fs.writeFileSync(options.output, result.output);
            console.error(chalk.green(`✓ Results written to ${options.output}`));
          } else if (result.output.trim()) {
            console.log(result.output);
          }

          // Check if breaking changes were found
          const hasBreakingChanges = result.output.trim().length > 0;

          if (hasBreakingChanges) {
            console.error(chalk.red('\n⚠ Breaking changes detected'));
            if (options.failOnDiff) {
              process.exit(1);
            }
          } else {
            console.error(chalk.green('\n✓ No breaking changes detected'));
          }
        } finally {
          cleanupTempFiles(baseTemp, revisionTemp);
        }
      } catch (error) {
        console.error(chalk.red(`Error: ${(error as Error).message}`));
        process.exit(1);
      }
    }
  );

// Changelog command
program
  .command('changelog <base> <revision>')
  .description('Generate a changelog between two OMG API specifications')
  .option('-f, --format <format>', 'Output format: text, yaml, json, html (default: text)', 'text')
  .option('-o, --output <file>', 'Write output to file instead of stdout')
  .addHelpText(
    'after',
    `
Examples:
  $ omg changelog v1/api.omg.md v2/api.omg.md
  $ omg changelog old.omg.md new.omg.md --format html -o CHANGELOG.html
  $ omg changelog base.omg.md head.omg.md --format json

The changelog includes:
  - Breaking changes (marked as such)
  - New endpoints and operations
  - Modified parameters and responses
  - Deprecations
  - Documentation changes

Requirements:
  This command requires oasdiff to be installed.
  Install via: brew install oasdiff (macOS) or see https://github.com/oasdiff/oasdiff

Powered by oasdiff: https://github.com/oasdiff/oasdiff
`
  )
  .action(async (base: string, revision: string, options: { format?: string; output?: string }) => {
    try {
      // Check oasdiff is installed
      if (!checkOasdiff()) {
        console.error(chalk.red('Error: oasdiff is not installed.'));
        console.error();
        console.error('Install oasdiff using one of these methods:');
        console.error(chalk.blue('  brew install oasdiff') + ' (macOS)');
        console.error(chalk.blue('  go install github.com/oasdiff/oasdiff@latest') + ' (Go)');
        console.error(
          chalk.blue(
            '  curl -fsSL https://raw.githubusercontent.com/oasdiff/oasdiff/main/install.sh | sh'
          )
        );
        console.error();
        console.error('For more options, see: https://github.com/oasdiff/oasdiff');
        process.exit(1);
      }

      const basePath = path.resolve(base);
      const revisionPath = path.resolve(revision);

      // Validate input files exist
      if (!fs.existsSync(basePath)) {
        console.error(chalk.red(`Error: Base file not found: ${basePath}`));
        process.exit(1);
      }
      if (!fs.existsSync(revisionPath)) {
        console.error(chalk.red(`Error: Revision file not found: ${revisionPath}`));
        process.exit(1);
      }

      console.error(chalk.blue(`Compiling ${path.basename(base)}...`));
      const baseTemp = compileToTempFile(basePath);

      console.error(chalk.blue(`Compiling ${path.basename(revision)}...`));
      const revisionTemp = compileToTempFile(revisionPath);

      try {
        console.error(chalk.blue('Generating changelog...'));
        const result = runOasdiff('changelog', baseTemp, revisionTemp, { format: options.format });

        if (options.output) {
          fs.writeFileSync(options.output, result.output);
          console.error(chalk.green(`✓ Changelog written to ${options.output}`));
        } else {
          console.log(result.output);
        }
      } finally {
        cleanupTempFiles(baseTemp, revisionTemp);
      }
    } catch (error) {
      console.error(chalk.red(`Error: ${(error as Error).message}`));
      process.exit(1);
    }
  });

program.parse();
