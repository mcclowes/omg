/**
 * Lint command - Validate OMG files using Spectral-style rules
 */

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { parseDocument, resolveDocument } from 'omg-parser';
import { lintDocument, summarizeLintResults, type Severity, type LintResult } from 'omg-linter';
import { validatePath, findOmgFiles, handleError } from './utils.js';

interface LintOptions {
  config?: string;
  severity?: string;
  rules?: string;
  json?: boolean;
  quiet?: boolean;
}

export function registerLintCommand(program: Command): void {
  program
    .command('lint <input>')
    .description('Validate OMG files using Spectral-style rules')
    .option('-c, --config <path>', 'Path to .spectral-omg.yaml config file')
    .option('-s, --severity <level>', 'Minimum severity to report: error, warn, hint', 'hint')
    .option('-r, --rules <rules>', 'Comma-separated list of rules to run')
    .option('--json', 'Output results as JSON')
    .option('-q, --quiet', 'Only output on error')
    .action(async (input: string, options: LintOptions) => {
      try {
        const inputPath = path.resolve(input);
        validatePath(inputPath);

        // Check if input is a directory or file
        const stat = fs.statSync(inputPath);
        const files: string[] = stat.isDirectory()
          ? findOmgFiles(inputPath, true) // exclude partials for linting
          : [inputPath];

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
        handleError(error);
      }
    });
}
