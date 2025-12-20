/**
 * Breaking command - Detect breaking changes between two OMG API specifications
 */

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import {
  checkOasdiff,
  printOasdiffInstallHelp,
  compileToTempFile,
  cleanupTempFiles,
  runOasdiff,
  validatePath,
  handleError,
} from './utils.js';

interface BreakingOptions {
  format?: string;
  output?: string;
  failOnDiff?: boolean;
}

export function registerBreakingCommand(program: Command): void {
  program
    .command('breaking <base> <revision>')
    .description('Detect breaking changes between two OMG API specifications')
    .option(
      '-f, --format <format>',
      'Output format: text, yaml, json, html (default: text)',
      'text'
    )
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
    .action(async (base: string, revision: string, options: BreakingOptions) => {
      try {
        // Check oasdiff is installed
        if (!checkOasdiff()) {
          printOasdiffInstallHelp();
          process.exit(1);
        }

        const basePath = path.resolve(base);
        const revisionPath = path.resolve(revision);

        validatePath(basePath, 'Base file');
        validatePath(revisionPath, 'Revision file');

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
        handleError(error);
      }
    });
}
