/**
 * Build command - Compile OMG to OpenAPI
 */

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import chokidar from 'chokidar';
import { loadApi } from 'omg-parser';
import { compileToOpenApi, serialize, detectFormat } from 'omg-compiler';
import { validatePath, handleError } from './utils.js';

interface BuildOptions {
  output?: string;
  format?: string;
  bundle?: boolean;
  watch?: boolean;
}

/**
 * Run the build process
 */
async function runBuild(inputPath: string, options: BuildOptions): Promise<boolean> {
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

export function registerBuildCommand(program: Command): void {
  program
    .command('build <input>')
    .description('Compile OAL to OpenAPI')
    .option('-o, --output <file>', 'Output file (default: stdout)')
    .option('-f, --format <format>', 'Output format: yaml or json (auto-detected from extension)')
    .option('--bundle', 'Bundle all files into single output')
    .option('-w, --watch', 'Watch for changes and rebuild automatically')
    .action(async (input: string, options: BuildOptions) => {
      const inputPath = path.resolve(input);
      validatePath(inputPath);

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
    });
}
