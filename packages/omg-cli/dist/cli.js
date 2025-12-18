#!/usr/bin/env node
"use strict";
/**
 * OMG CLI
 *
 * Command-line interface for OMG (OpenAPI Markdown Grammar)
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const omg_parser_1 = require("omg-parser");
const omg_compiler_1 = require("omg-compiler");
const omg_linter_1 = require("omg-linter");
const program = new commander_1.Command();
program
    .name('omg')
    .description('OpenAPI Markdown Grammar - A human-first DSL for API specification')
    .version('0.1.0');
// Build command
program
    .command('build <input>')
    .description('Compile OAL to OpenAPI')
    .option('-o, --output <file>', 'Output file (default: stdout)')
    .option('-f, --format <format>', 'Output format: yaml or json (auto-detected from extension)')
    .option('--bundle', 'Bundle all files into single output')
    .action(async (input, options) => {
    try {
        const inputPath = path.resolve(input);
        if (!fs.existsSync(inputPath)) {
            console.error(chalk_1.default.red(`Error: File not found: ${inputPath}`));
            process.exit(1);
        }
        console.error(chalk_1.default.blue(`Parsing ${input}...`));
        // Load and parse the API
        const api = (0, omg_parser_1.loadApi)(inputPath);
        console.error(chalk_1.default.blue(`Found ${api.endpoints.length} endpoints`));
        // Compile to OpenAPI
        const openapi = (0, omg_compiler_1.compileToOpenApi)(api);
        // Determine output format
        const format = options.format || (options.output ? (0, omg_compiler_1.detectFormat)(options.output) : 'yaml');
        // Serialize
        const output = (0, omg_compiler_1.serialize)(openapi, format);
        // Write output
        if (options.output) {
            fs.writeFileSync(options.output, output);
            console.error(chalk_1.default.green(`✓ Written to ${options.output}`));
        }
        else {
            console.log(output);
        }
    }
    catch (error) {
        console.error(chalk_1.default.red(`Error: ${error.message}`));
        if (error.stack) {
            console.error(chalk_1.default.gray(error.stack));
        }
        process.exit(1);
    }
});
// Parse command (for debugging)
program
    .command('parse <input>')
    .description('Parse an OAL file and show the AST')
    .option('--json', 'Output as JSON')
    .action(async (input, options) => {
    try {
        const inputPath = path.resolve(input);
        if (!fs.existsSync(inputPath)) {
            console.error(chalk_1.default.red(`Error: File not found: ${inputPath}`));
            process.exit(1);
        }
        const content = fs.readFileSync(inputPath, 'utf-8');
        const doc = (0, omg_parser_1.parseDocument)(content, input);
        const basePath = path.dirname(inputPath);
        const resolved = (0, omg_parser_1.resolveDocument)(doc, { basePath });
        const endpoint = (0, omg_parser_1.buildEndpoint)(resolved);
        const result = {
            document: resolved,
            endpoint,
        };
        if (options.json) {
            console.log(JSON.stringify(result, null, 2));
        }
        else {
            console.log(chalk_1.default.blue('Front Matter:'));
            console.log(resolved.frontMatter);
            console.log();
            console.log(chalk_1.default.blue('Title:'), resolved.title);
            console.log();
            console.log(chalk_1.default.blue('Description:'));
            console.log(resolved.description);
            console.log();
            console.log(chalk_1.default.blue('Blocks:'));
            for (const block of resolved.resolvedBlocks) {
                console.log(`  ${chalk_1.default.yellow(block.type)}${block.statusCode ? ` (${block.statusCode})` : ''}`);
                if (block.parsed) {
                    console.log(`    Schema: ${block.parsed.kind}`);
                }
            }
            console.log();
            console.log(chalk_1.default.blue('Partials:'));
            for (const partial of resolved.partials) {
                console.log(`  ${partial.path}`);
            }
            if (endpoint) {
                console.log();
                console.log(chalk_1.default.blue('Endpoint:'));
                console.log(`  ${endpoint.method} ${endpoint.path}`);
                console.log(`  Operation ID: ${endpoint.operationId}`);
            }
            // Display warnings if any
            if (resolved.warnings && resolved.warnings.length > 0) {
                console.log();
                console.log(chalk_1.default.yellow(`Warnings (${resolved.warnings.length}):`));
                for (const warning of resolved.warnings) {
                    console.log(chalk_1.default.yellow(`  ⚠ ${warning.message}`));
                    if (warning.context) {
                        console.log(chalk_1.default.gray(`    Context: ${warning.context}`));
                    }
                }
            }
        }
    }
    catch (error) {
        console.error(chalk_1.default.red(`Error: ${error.message}`));
        if (error.stack) {
            console.error(chalk_1.default.gray(error.stack));
        }
        process.exit(1);
    }
});
// Lint command
program
    .command('lint <input>')
    .description('Validate OMG files using Spectral-style rules')
    .option('-c, --config <path>', 'Path to .spectral-omg.yaml config file')
    .option('-s, --severity <level>', 'Minimum severity to report: error, warn, hint', 'hint')
    .option('-r, --rules <rules>', 'Comma-separated list of rules to run')
    .option('--json', 'Output results as JSON')
    .option('-q, --quiet', 'Only output on error')
    .action(async (input, options) => {
    try {
        const inputPath = path.resolve(input);
        if (!fs.existsSync(inputPath)) {
            console.error(chalk_1.default.red(`Error: File not found: ${inputPath}`));
            process.exit(1);
        }
        // Check if input is a directory or file
        const stat = fs.statSync(inputPath);
        const files = [];
        if (stat.isDirectory()) {
            // Find all .omg.md files recursively
            const findOmgFiles = (dir) => {
                const entries = fs.readdirSync(dir, { withFileTypes: true });
                for (const entry of entries) {
                    const fullPath = path.join(dir, entry.name);
                    if (entry.isDirectory() &&
                        entry.name !== 'node_modules' &&
                        entry.name !== 'partials') {
                        findOmgFiles(fullPath);
                    }
                    else if (entry.name.endsWith('.omg.md')) {
                        files.push(fullPath);
                    }
                }
            };
            findOmgFiles(inputPath);
        }
        else {
            files.push(inputPath);
        }
        if (files.length === 0) {
            console.error(chalk_1.default.yellow('No .omg.md files found'));
            process.exit(0);
        }
        const allResults = [];
        let totalErrors = 0;
        let totalWarnings = 0;
        let totalHints = 0;
        for (const file of files) {
            const content = fs.readFileSync(file, 'utf-8');
            const doc = (0, omg_parser_1.parseDocument)(content, path.relative(process.cwd(), file));
            const basePath = path.dirname(file);
            // Try to resolve and parse
            let resolved;
            let resolutionWarning = null;
            try {
                resolved = (0, omg_parser_1.resolveDocument)(doc, { basePath });
            }
            catch (err) {
                // If resolution fails, use the unresolved document but warn
                resolutionWarning = err.message;
                resolved = { ...doc, resolvedBlocks: doc.blocks, warnings: [] };
            }
            // Show resolution warning if any
            if (resolutionWarning && !options.quiet) {
                console.error(chalk_1.default.yellow(`  ⚠ Resolution failed for ${path.relative(process.cwd(), file)}: ${resolutionWarning}`));
            }
            // Run linter
            const lintResults = (0, omg_linter_1.lintDocument)({ document: resolved }, {
                configPath: options.config,
                rules: options.rules?.split(','),
                severity: options.severity,
            });
            const summary = (0, omg_linter_1.summarizeLintResults)(file, lintResults);
            totalErrors += summary.errors;
            totalWarnings += summary.warnings;
            totalHints += summary.hints;
            if (lintResults.length > 0) {
                allResults.push({ file, results: lintResults });
            }
        }
        // Output results
        if (options.json) {
            console.log(JSON.stringify({
                files: files.length,
                results: allResults,
                summary: {
                    errors: totalErrors,
                    warnings: totalWarnings,
                    hints: totalHints,
                },
            }, null, 2));
        }
        else {
            if (allResults.length === 0) {
                if (!options.quiet) {
                    console.log(chalk_1.default.green(`✓ ${files.length} file(s) validated successfully`));
                }
            }
            else {
                for (const { file, results } of allResults) {
                    const relativePath = path.relative(process.cwd(), file);
                    console.log(chalk_1.default.underline(relativePath));
                    for (const result of results) {
                        const icon = result.severity === 'error' ? '✖' : result.severity === 'warn' ? '⚠' : 'ℹ';
                        const color = result.severity === 'error'
                            ? chalk_1.default.red
                            : result.severity === 'warn'
                                ? chalk_1.default.yellow
                                : chalk_1.default.blue;
                        const pathStr = result.path?.length
                            ? chalk_1.default.gray(` (${result.path.join('.')})`)
                            : '';
                        console.log(`  ${color(icon)} ${result.message}${pathStr} ${chalk_1.default.gray(`[${result.rule}]`)}`);
                    }
                    console.log();
                }
                // Summary
                const summaryParts = [];
                if (totalErrors > 0)
                    summaryParts.push(chalk_1.default.red(`${totalErrors} error(s)`));
                if (totalWarnings > 0)
                    summaryParts.push(chalk_1.default.yellow(`${totalWarnings} warning(s)`));
                if (totalHints > 0)
                    summaryParts.push(chalk_1.default.blue(`${totalHints} hint(s)`));
                console.log(`Found ${summaryParts.join(', ')} in ${files.length} file(s)`);
            }
        }
        // Exit with error code if there are errors
        if (totalErrors > 0) {
            process.exit(1);
        }
    }
    catch (error) {
        console.error(chalk_1.default.red(`Error: ${error.message}`));
        if (error.stack) {
            console.error(chalk_1.default.gray(error.stack));
        }
        process.exit(1);
    }
});
// Init command
program
    .command('init [directory]')
    .description('Initialize a new OAL project')
    .action(async (directory = '.') => {
    const dir = path.resolve(directory);
    // Create directory structure
    const dirs = [
        '',
        'partials',
        'partials/params',
        'partials/responses',
        'partials/types',
        'endpoints',
    ];
    for (const d of dirs) {
        const fullPath = path.join(dir, d);
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
        }
    }
    // Create api.omg.md
    const apiContent = `---
name: My API
version: 1.0.0
baseUrl: https://api.example.com
---

# My API

Welcome to my API documentation.
`;
    const apiPath = path.join(dir, 'api.omg.md');
    if (!fs.existsSync(apiPath)) {
        fs.writeFileSync(apiPath, apiContent);
    }
    // Create example endpoint
    const exampleContent = `---
method: GET
path: /health
operationId: health-check
tags: [System]
---

# Health Check

Returns the health status of the API.

\`\`\`omg.response
{
  "status": "ok" | "degraded" | "down",
  "timestamp": datetime,
  "version": string
}
\`\`\`

\`\`\`omg.example
{
  "status": "ok",
  "timestamp": "2024-01-15T09:30:00Z",
  "version": "1.0.0"
}
\`\`\`
`;
    const examplePath = path.join(dir, 'endpoints', 'health.omg.md');
    if (!fs.existsSync(examplePath)) {
        fs.writeFileSync(examplePath, exampleContent);
    }
    // Create errors partial
    const errorsContent = `# Standard Errors

\`\`\`omg.response.400
{
  "error": string,
  "message": string,
  "code": integer?
}
\`\`\`

\`\`\`omg.response.401
{
  "error": "Unauthorized",
  "message": string
}
\`\`\`

\`\`\`omg.response.404
{
  "error": "Not Found",
  "message": string
}
\`\`\`

\`\`\`omg.response.500
{
  "error": "Internal Server Error",
  "message": string
}
\`\`\`
`;
    const errorsPath = path.join(dir, 'partials', 'responses', 'errors.omg.md');
    if (!fs.existsSync(errorsPath)) {
        fs.writeFileSync(errorsPath, errorsContent);
    }
    console.log(chalk_1.default.green(`✓ Initialized OMG project in ${dir}`));
    console.log();
    console.log('Created:');
    console.log(`  ${chalk_1.default.blue('api.omg.md')} - API root definition`);
    console.log(`  ${chalk_1.default.blue('endpoints/health.omg.md')} - Example endpoint`);
    console.log(`  ${chalk_1.default.blue('partials/responses/errors.omg.md')} - Standard errors`);
    console.log();
    console.log('Next steps:');
    console.log(`  1. Edit ${chalk_1.default.blue('api.omg.md')} to configure your API`);
    console.log(`  2. Add endpoints in ${chalk_1.default.blue('endpoints/')}`);
    console.log(`  3. Run ${chalk_1.default.blue('omg build api.omg.md -o openapi.yaml')} to compile`);
});
program.parse();
//# sourceMappingURL=cli.js.map