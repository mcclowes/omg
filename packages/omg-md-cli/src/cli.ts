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
import { importOpenApi, generateDocument, generateFiles, type OpenApiSpec } from 'omg-importer';
import YAML from 'yaml';

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
  .action(
    async (
      input: string,
      options: {
        output?: string;
        inline?: boolean;
        dryRun?: boolean;
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
        });

        console.error(chalk.blue(`Converted ${result.endpoints.length} endpoints`));
        if (result.types.size > 0) {
          console.error(chalk.blue(`Found ${result.types.size} named types`));
        }

        // Show warnings
        if (result.warnings.length > 0) {
          console.error(chalk.yellow(`\nWarnings (${result.warnings.length}):`));
          for (const warning of result.warnings) {
            console.error(chalk.yellow(`  ⚠ ${warning.message}`));
          }
        }

        // Generate files
        const files = generateFiles(result.api, result.endpoints, result.types);

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

program.parse();
