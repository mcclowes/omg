#!/usr/bin/env node

/**
 * OMG CLI
 *
 * Command-line interface for OMG (OpenAPI Markdown Grammar)
 */

import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import {
  registerBuildCommand,
  registerParseCommand,
  registerLintCommand,
  registerFormatCommand,
  registerInitCommand,
  registerImportCommand,
  registerMockCommand,
  registerDiffCommand,
  registerBreakingCommand,
  registerChangelogCommand,
  registerTestCommand,
  registerDocsCommand,
} from './commands/index.js';

const program = new Command();
const { version: packageVersion } = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8')
) as { version: string };

program
  .name('omg')
  .description('OpenAPI Markdown Grammar - A human-first DSL for API specification')
  .version(packageVersion);

// Register all commands
registerBuildCommand(program);
registerParseCommand(program);
registerLintCommand(program);
registerFormatCommand(program);
registerInitCommand(program);
registerImportCommand(program);
registerMockCommand(program);
registerDiffCommand(program);
registerBreakingCommand(program);
registerChangelogCommand(program);
registerTestCommand(program);
registerDocsCommand(program);

program.parse();
