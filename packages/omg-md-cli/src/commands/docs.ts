/**
 * Docs command - Render an OMG spec as a browsable static HTML page
 */

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { loadApi } from 'omg-parser';
import { compileToOpenApi } from 'omg-compiler';
import { renderHtmlDocs } from '../html-docs.js';
import { validatePath, handleError } from './utils.js';

interface DocsOptions {
  output?: string;
}

export function registerDocsCommand(program: Command): void {
  program
    .command('docs <input>')
    .description('Render an OMG spec as a self-contained, browsable HTML documentation page')
    .option('-o, --output <file>', 'Output HTML file (default: stdout)')
    .action(async (input: string, options: DocsOptions) => {
      try {
        const inputPath = path.resolve(input);
        validatePath(inputPath);

        console.error(chalk.blue(`Parsing ${input}...`));
        const api = loadApi(inputPath);
        console.error(chalk.blue(`Found ${api.endpoints.length} endpoints`));

        const openapi = compileToOpenApi(api);
        const html = renderHtmlDocs(openapi);

        if (options.output) {
          fs.writeFileSync(options.output, html);
          console.error(chalk.green(`✓ Documentation written to ${options.output}`));
          console.error(chalk.gray(`  Open it in a browser — no server or network needed.`));
        } else {
          console.log(html);
        }
      } catch (error) {
        handleError(error);
      }
    });
}
