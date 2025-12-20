/**
 * Diff command - Compare two OMG API specifications and show differences
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

interface DiffOptions {
  format?: string;
  output?: string;
}

export function registerDiffCommand(program: Command): void {
  program
    .command('diff <base> <revision>')
    .description('Compare two OMG API specifications and show all differences')
    .option(
      '-f, --format <format>',
      'Output format: text, yaml, json, html (default: text)',
      'text'
    )
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
    .action(async (base: string, revision: string, options: DiffOptions) => {
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
        handleError(error);
      }
    });
}
