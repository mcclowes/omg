/**
 * Shared CLI utilities
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { execSync, spawnSync } from 'child_process';
import chalk from 'chalk';
import { loadApi } from 'omg-parser';
import { compileToOpenApi, serialize } from 'omg-compiler';

/**
 * Check if oasdiff is installed and available
 */
export function checkOasdiff(): boolean {
  try {
    execSync('oasdiff --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Print oasdiff installation instructions
 */
export function printOasdiffInstallHelp(): void {
  console.error(chalk.red('Error: oasdiff is not installed.'));
  console.error();
  console.error('Install oasdiff using one of these methods:');
  console.error(chalk.blue('  brew install oasdiff') + ' (macOS)');
  console.error(chalk.blue('  go install github.com/oasdiff/oasdiff@latest') + ' (Go)');
  console.error(
    chalk.blue(
      '  curl -fsSL https://raw.githubusercontent.com/oasdiff/oasdiff/main/install.sh | sh'
    )
  );
  console.error();
  console.error('For more options, see: https://github.com/oasdiff/oasdiff');
}

/**
 * Compile an OMG file to a temporary OpenAPI YAML file
 * Returns the path to the temp file
 */
export function compileToTempFile(inputPath: string): string {
  const api = loadApi(inputPath);
  const openapi = compileToOpenApi(api);
  const yaml = serialize(openapi, 'yaml');

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'omg-diff-'));
  const tempFile = path.join(tempDir, 'openapi.yaml');
  fs.writeFileSync(tempFile, yaml);

  return tempFile;
}

/**
 * Clean up temporary files
 */
export function cleanupTempFiles(...files: string[]): void {
  for (const file of files) {
    try {
      const dir = path.dirname(file);
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      // Ignore cleanup errors
    }
  }
}

/**
 * Run oasdiff command and return the result
 */
export function runOasdiff(
  command: 'diff' | 'breaking' | 'changelog',
  baseSpec: string,
  revisionSpec: string,
  options: { format?: string; failOnDiff?: boolean } = {}
): { output: string; exitCode: number } {
  const format = options.format || 'text';
  const args = [command, baseSpec, revisionSpec, '--format', format];

  if (command === 'breaking' && options.failOnDiff) {
    args.push('--fail-on', 'ERR');
  }

  const result = spawnSync('oasdiff', args, {
    encoding: 'utf-8',
    maxBuffer: 10 * 1024 * 1024, // 10MB buffer
  });

  return {
    output: result.stdout || result.stderr || '',
    exitCode: result.status ?? 1,
  };
}

/**
 * Find all .omg.md files in a directory recursively
 */
export function findOmgFiles(dir: string, excludePartials = false): string[] {
  const files: string[] = [];

  const walk = (currentDir: string) => {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'node_modules') {
          if (excludePartials && entry.name === 'partials') {
            continue;
          }
          walk(fullPath);
        }
      } else if (entry.name.endsWith('.omg.md')) {
        files.push(fullPath);
      }
    }
  };

  walk(dir);
  return files;
}

/**
 * Handle common CLI errors with consistent formatting
 */
export function handleError(error: unknown): never {
  console.error(chalk.red(`Error: ${(error as Error).message}`));
  if ((error as Error).stack) {
    console.error(chalk.gray((error as Error).stack));
  }
  process.exit(1);
}

/**
 * Validate that an input path exists
 */
export function validatePath(inputPath: string, label = 'File'): void {
  if (!fs.existsSync(inputPath)) {
    console.error(chalk.red(`Error: ${label} not found: ${inputPath}`));
    process.exit(1);
  }
}
