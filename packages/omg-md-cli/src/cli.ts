#!/usr/bin/env node

/**
 * OMG CLI
 *
 * Command-line interface for OMG (OpenAPI Markdown Grammar)
 */

import { Command } from 'commander';
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
} from './commands/index.js';

const program = new Command();

program
  .name('omg')
  .description('OpenAPI Markdown Grammar - A human-first DSL for API specification')
  .version('0.1.0');

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

program.parse();
