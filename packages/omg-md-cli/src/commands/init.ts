/**
 * Init command - Initialize a new OMG project
 */

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';

export function registerInitCommand(program: Command): void {
  program
    .command('init [directory]')
    .description('Initialize a new OAL project')
    .action(async (directory: string = '.') => {
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

      console.log(chalk.green(`✓ Initialized OMG project in ${dir}`));
      console.log();
      console.log('Created:');
      console.log(`  ${chalk.blue('api.omg.md')} - API root definition`);
      console.log(`  ${chalk.blue('endpoints/health.omg.md')} - Example endpoint`);
      console.log(`  ${chalk.blue('partials/responses/errors.omg.md')} - Standard errors`);
      console.log();
      console.log('Next steps:');
      console.log(`  1. Edit ${chalk.blue('api.omg.md')} to configure your API`);
      console.log(`  2. Add endpoints in ${chalk.blue('endpoints/')}`);
      console.log(`  3. Run ${chalk.blue('omg build api.omg.md -o openapi.yaml')} to compile`);
    });
}
