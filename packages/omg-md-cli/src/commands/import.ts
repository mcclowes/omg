/**
 * Import command - Import an OpenAPI specification to OMG format
 */

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import YAML from 'yaml';
import { importOpenApi, generateFiles, type OpenApiSpec } from 'omg-importer';
import { validatePath, handleError } from './utils.js';

interface ImportOptions {
  output?: string;
  inline?: boolean;
  dryRun?: boolean;
  partials?: boolean;
  partialThreshold?: string;
}

export function registerImportCommand(program: Command): void {
  program
    .command('import <input>')
    .description('Import an OpenAPI specification to OMG format')
    .option('-o, --output <directory>', 'Output directory (default: current directory)')
    .option('--inline', 'Inline referenced schemas instead of using references')
    .option('--dry-run', 'Show what would be generated without writing files')
    .option('--no-partials', 'Disable automatic partial extraction for repeated parameters')
    .option(
      '--partial-threshold <n>',
      'Minimum occurrences to extract as partial (default: 3)',
      '3'
    )
    .action(async (input: string, options: ImportOptions) => {
      try {
        const inputPath = path.resolve(input);
        validatePath(inputPath);

        console.error(chalk.blue(`Reading OpenAPI spec from ${input}...`));

        // Read and parse the OpenAPI spec
        const content = fs.readFileSync(inputPath, 'utf-8');
        let spec: OpenApiSpec;

        try {
          // Try parsing as YAML (which also handles JSON)
          spec = YAML.parse(content) as OpenApiSpec;
        } catch {
          // Try parsing as JSON
          try {
            spec = JSON.parse(content) as OpenApiSpec;
          } catch {
            console.error(chalk.red('Error: Could not parse input file as YAML or JSON'));
            process.exit(1);
          }
        }

        // Validate it's an OpenAPI spec
        if (!spec.openapi) {
          console.error(chalk.red('Error: Input does not appear to be an OpenAPI specification'));
          console.error(chalk.gray('Missing "openapi" field'));
          process.exit(1);
        }

        console.error(
          chalk.blue(`Found OpenAPI ${spec.openapi} specification: ${spec.info.title}`)
        );

        // Import the spec
        const outputDir = options.output ? path.resolve(options.output) : process.cwd();
        const result = importOpenApi(spec, {
          baseDir: outputDir,
          inlineRefs: options.inline ?? false,
          extractPartials: options.partials !== false,
          partialThreshold: parseInt(options.partialThreshold ?? '3', 10),
        });

        console.error(chalk.blue(`Converted ${result.endpoints.length} endpoints`));
        if (result.types.size > 0) {
          console.error(chalk.blue(`Found ${result.types.size} named types`));
        }
        if (result.partials.size > 0) {
          console.error(chalk.blue(`Extracted ${result.partials.size} reusable partials`));
        }

        // Show warnings
        if (result.warnings.length > 0) {
          console.error(chalk.yellow(`\nWarnings (${result.warnings.length}):`));
          for (const warning of result.warnings) {
            console.error(chalk.yellow(`  ⚠ ${warning.message}`));
          }
        }

        // Generate files
        const files = generateFiles(result.api, result.endpoints, result.types, result.partials);

        if (options.dryRun) {
          console.log(chalk.blue('\nDry run - would generate the following files:\n'));
          for (const file of files) {
            const relativePath = path.relative(process.cwd(), file.path);
            console.log(chalk.green(`  ${relativePath}`));
          }
          console.log();
          console.log(chalk.gray('Run without --dry-run to write files'));
        } else {
          // Create directories and write files
          for (const file of files) {
            const dir = path.dirname(file.path);
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(file.path, file.content);
            const relativePath = path.relative(process.cwd(), file.path);
            console.log(chalk.green(`  ✓ ${relativePath}`));
          }

          console.log();
          console.log(chalk.green(`✓ Imported ${files.length} files to ${outputDir}`));
          console.log();
          console.log('Next steps:');
          console.log(`  1. Review the generated files`);
          console.log(`  2. Run ${chalk.blue('omg lint ' + outputDir)} to check for issues`);
          console.log(
            `  3. Run ${chalk.blue('omg build ' + path.join(outputDir, 'api.omg.md') + ' -o openapi.yaml')} to compile back`
          );
        }
      } catch (error) {
        handleError(error);
      }
    });
}
