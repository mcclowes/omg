/**
 * CLI Integration Tests
 *
 * Tests the CLI commands end-to-end using child processes
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { execSync, spawnSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLI_PATH = path.resolve(__dirname, '../dist/cli.js');
const FIXTURES_DIR = path.join(os.tmpdir(), 'omg-cli-test-fixtures');

// Helper to run CLI commands
function runCli(
  args: string[],
  options: { cwd?: string } = {}
): { stdout: string; stderr: string; exitCode: number } {
  const result = spawnSync('node', [CLI_PATH, ...args], {
    encoding: 'utf-8',
    cwd: options.cwd || process.cwd(),
    env: { ...process.env, FORCE_COLOR: '0' }, // Disable chalk colors for testing
  });

  return {
    stdout: result.stdout || '',
    stderr: result.stderr || '',
    exitCode: result.status ?? 1,
  };
}

// Set up test fixtures
beforeAll(() => {
  // Clean up any existing fixtures
  if (fs.existsSync(FIXTURES_DIR)) {
    fs.rmSync(FIXTURES_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(FIXTURES_DIR, { recursive: true });

  // Create a minimal API fixture
  const apiContent = `---
name: Test API
version: 1.0.0
baseUrl: https://api.example.com
---

# Test API

A test API for CLI integration tests.
`;

  fs.writeFileSync(path.join(FIXTURES_DIR, 'api.omg.md'), apiContent);

  // Create endpoints directory
  const endpointsDir = path.join(FIXTURES_DIR, 'endpoints');
  if (!fs.existsSync(endpointsDir)) {
    fs.mkdirSync(endpointsDir, { recursive: true });
  }

  // Create a sample endpoint
  const endpointContent = `---
method: GET
path: /users
operationId: list-users
tags: [Users]
---

# List Users

Returns a list of users.

\`\`\`omg.response
{
  users: [{
    id: string,
    name: string
  }]
}
\`\`\`
`;

  fs.writeFileSync(path.join(endpointsDir, 'users.omg.md'), endpointContent);

  // Create partials directory and an error partial
  const partialsDir = path.join(FIXTURES_DIR, 'partials');
  if (!fs.existsSync(partialsDir)) {
    fs.mkdirSync(partialsDir, { recursive: true });
  }

  const errorsContent = `# Errors

\`\`\`omg.response.404
{
  error: string
}
\`\`\`
`;

  fs.writeFileSync(path.join(partialsDir, 'errors.omg.md'), errorsContent);
});

// Clean up test fixtures
afterAll(() => {
  if (fs.existsSync(FIXTURES_DIR)) {
    fs.rmSync(FIXTURES_DIR, { recursive: true, force: true });
  }
});

describe('CLI', () => {
  describe('--help', () => {
    it('displays help information', () => {
      const result = runCli(['--help']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('OpenAPI Markdown Grammar');
      expect(result.stdout).toContain('Commands:');
      expect(result.stdout).toContain('build');
      expect(result.stdout).toContain('parse');
      expect(result.stdout).toContain('lint');
    });

    it('displays version', () => {
      const result = runCli(['--version']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toMatch(/\d+\.\d+\.\d+/);
    });
  });

  describe('build command', () => {
    it('compiles OMG to OpenAPI YAML', () => {
      const apiPath = path.join(FIXTURES_DIR, 'api.omg.md');
      const result = runCli(['build', apiPath]);

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('openapi:');
      expect(result.stdout).toContain('info:');
      expect(result.stdout).toContain('Test API');
    });

    it('compiles to JSON format', () => {
      const apiPath = path.join(FIXTURES_DIR, 'api.omg.md');
      const result = runCli(['build', apiPath, '--format', 'json']);

      expect(result.exitCode).toBe(0);
      const output = JSON.parse(result.stdout);
      expect(output.openapi).toBe('3.1.0');
      expect(output.info.title).toBe('Test API');
    });

    it('writes to output file', () => {
      const apiPath = path.join(FIXTURES_DIR, 'api.omg.md');
      const outputPath = path.join(FIXTURES_DIR, 'output.yaml');

      const result = runCli(['build', apiPath, '-o', outputPath]);

      expect(result.exitCode).toBe(0);
      expect(result.stderr).toContain('Written to');
      expect(fs.existsSync(outputPath)).toBe(true);

      const content = fs.readFileSync(outputPath, 'utf-8');
      expect(content).toContain('openapi:');

      // Cleanup
      fs.unlinkSync(outputPath);
    });

    it('fails for non-existent file', () => {
      const result = runCli(['build', '/nonexistent/file.omg.md']);
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('not found');
    });
  });

  describe('parse command', () => {
    it('parses and displays AST', () => {
      const endpointPath = path.join(FIXTURES_DIR, 'endpoints', 'users.omg.md');
      const result = runCli(['parse', endpointPath]);

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Front Matter:');
      expect(result.stdout).toContain('Title:');
      expect(result.stdout).toContain('List Users');
      expect(result.stdout).toContain('Blocks:');
    });

    it('outputs JSON format', () => {
      const endpointPath = path.join(FIXTURES_DIR, 'endpoints', 'users.omg.md');
      const result = runCli(['parse', endpointPath, '--json']);

      expect(result.exitCode).toBe(0);
      const output = JSON.parse(result.stdout);
      expect(output.document).toBeDefined();
      expect(output.endpoint).toBeDefined();
      expect(output.endpoint.method).toBe('GET');
      expect(output.endpoint.path).toBe('/users');
    });
  });

  describe('lint command', () => {
    it('lints OMG files successfully', () => {
      const endpointPath = path.join(FIXTURES_DIR, 'endpoints', 'users.omg.md');
      const result = runCli(['lint', endpointPath]);

      // Should pass without errors
      expect(result.exitCode).toBe(0);
    });

    it('lints a directory', () => {
      // Only lint the endpoints directory (not api.omg.md which is a root file)
      const endpointsDir = path.join(FIXTURES_DIR, 'endpoints');
      const result = runCli(['lint', endpointsDir]);

      // Should process multiple files (may have hints but no errors)
      expect(result.exitCode).toBe(0);
    });

    it('outputs JSON format', () => {
      const endpointsDir = path.join(FIXTURES_DIR, 'endpoints');
      const result = runCli(['lint', endpointsDir, '--json']);

      expect(result.exitCode).toBe(0);
      const output = JSON.parse(result.stdout);
      expect(output.files).toBeDefined();
      expect(output.summary).toBeDefined();
    });
  });

  describe('fmt command', () => {
    it('formats and outputs to stdout', () => {
      const endpointPath = path.join(FIXTURES_DIR, 'endpoints', 'users.omg.md');
      const result = runCli(['fmt', endpointPath]);

      expect(result.exitCode).toBe(0);
    });

    it('checks formatting with --check', () => {
      const endpointPath = path.join(FIXTURES_DIR, 'endpoints', 'users.omg.md');
      const result = runCli(['fmt', endpointPath, '--check']);

      // Either passes (0) or needs formatting (1)
      expect([0, 1]).toContain(result.exitCode);
    });

    it('formats with custom indent', () => {
      const endpointPath = path.join(FIXTURES_DIR, 'endpoints', 'users.omg.md');
      const result = runCli(['fmt', endpointPath, '--indent', '4']);

      expect(result.exitCode).toBe(0);
    });
  });

  describe('init command', () => {
    it('initializes a new project', () => {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'omg-init-test-'));

      try {
        const result = runCli(['init', tempDir]);

        expect(result.exitCode).toBe(0);
        expect(result.stdout).toContain('Initialized OMG project');

        // Check created files
        expect(fs.existsSync(path.join(tempDir, 'api.omg.md'))).toBe(true);
        expect(fs.existsSync(path.join(tempDir, 'endpoints', 'health.omg.md'))).toBe(true);
        expect(fs.existsSync(path.join(tempDir, 'partials'))).toBe(true);
      } finally {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    });
  });

  describe('diff/breaking/changelog commands', () => {
    // These require oasdiff to be installed, so we just test the help text
    it('displays help for diff command', () => {
      const result = runCli(['diff', '--help']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Compare two OMG API specifications');
    });

    it('displays help for breaking command', () => {
      const result = runCli(['breaking', '--help']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Detect breaking changes');
    });

    it('displays help for changelog command', () => {
      const result = runCli(['changelog', '--help']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Generate a changelog');
    });
  });

  describe('error handling', () => {
    it('shows error for unknown command', () => {
      const result = runCli(['unknown-command']);
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('unknown command');
    });

    it('shows error for missing required arguments', () => {
      const result = runCli(['build']);
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain("missing required argument 'input'");
    });
  });
});
