/**
 * Mock command - Start a mock server from an OMG API specification
 */

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import chokidar from 'chokidar';
import { loadApi } from 'omg-parser';
import { createMockServer } from 'omg-mock-server';
import { validatePath, handleError } from './utils.js';

interface MockOptions {
  port?: string;
  basePath?: string;
  delay?: string;
  seed?: string;
  cors?: boolean;
  quiet?: boolean;
  simple?: boolean;
  watch?: boolean;
}

export function registerMockCommand(program: Command): void {
  program
    .command('mock <input>')
    .description('Start a mock server from an OMG API specification')
    .option('-p, --port <port>', 'Port to listen on', '3000')
    .option('-b, --base-path <path>', 'Base URL path prefix (e.g., /api/v1)')
    .option('-d, --delay <ms>', 'Response delay in milliseconds', '0')
    .option('-s, --seed <seed>', 'Random seed for deterministic mock data')
    .option('--no-cors', 'Disable CORS')
    .option('-q, --quiet', 'Disable request logging')
    .option('--simple', 'Use simple mock generator instead of Vague')
    .option('-w, --watch', 'Watch for changes and restart server')
    .action(async (input: string, options: MockOptions) => {
      const inputPath = path.resolve(input);
      validatePath(inputPath);

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
            useVague: !options.simple,
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
    });
}
