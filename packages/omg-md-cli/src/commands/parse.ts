/**
 * Parse command - Parse an OMG file and show the AST
 */

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { parseDocument, resolveDocument, buildEndpoint } from 'omg-parser';
import { validatePath, handleError } from './utils.js';

interface ParseOptions {
  json?: boolean;
}

export function registerParseCommand(program: Command): void {
  program
    .command('parse <input>')
    .description('Parse an OAL file and show the AST')
    .option('--json', 'Output as JSON')
    .action(async (input: string, options: ParseOptions) => {
      try {
        const inputPath = path.resolve(input);
        validatePath(inputPath);

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
        handleError(error);
      }
    });
}
