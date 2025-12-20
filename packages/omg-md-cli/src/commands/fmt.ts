/**
 * Format command - Format OMG files for consistent style
 */

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { formatDocument } from 'omg-parser';
import { validatePath, findOmgFiles, handleError } from './utils.js';

interface FormatOptions {
  write?: boolean;
  check?: boolean;
  indent?: string;
}

export function registerFormatCommand(program: Command): void {
  program
    .command('fmt <input>')
    .description('Format OMG files for consistent style')
    .option('-w, --write', 'Write formatted output back to file(s)')
    .option('--check', 'Check if files are formatted (exit 1 if not)')
    .option('--indent <size>', 'Indentation size', '2')
    .action(async (input: string, options: FormatOptions) => {
      try {
        const inputPath = path.resolve(input);
        validatePath(inputPath);

        const indentSize = parseInt(options.indent || '2', 10);

        // Check if input is a directory or file
        const stat = fs.statSync(inputPath);
        const files: string[] = stat.isDirectory() ? findOmgFiles(inputPath) : [inputPath];

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
        handleError(error);
      }
    });
}
