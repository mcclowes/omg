# Contributing to OMG

Thanks for your interest in contributing to OMG (OpenAPI Markdown Grammar).

## Getting Started

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/omg.git
   cd omg
   ```

2. Install dependencies:
   ```bash
   npm ci
   ```

3. Build all packages:
   ```bash
   npm run build
   ```

4. Run tests:
   ```bash
   npm test
   ```

## Development Workflow

### Making Changes

1. Create a branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and ensure:
   - Code is formatted: `npm run format`
   - Types check: `npm run typecheck`
   - Tests pass: `npm test`

3. Update documentation:
   - `TODO.md` - Mark completed items, add new tasks
   - `CLAUDE.md` - Update if architecture changed
   - `docusaurus/docs/` - Update user-facing docs
   - `examples/` - Ensure examples work with your changes

### Pre-commit Hooks

The repository uses Husky to run checks before each commit:
- Format check (Prettier)
- Type check (TypeScript)
- Tests (Vitest)

If any check fails, fix the issues before committing.

### Project Structure

```
packages/
├── omg-parser/      # Parses .omg.md files to AST
├── omg-compiler/    # Compiles AST to OpenAPI 3.1
├── omg-linter/      # Linting rules for OMG files
├── omg-lsp/         # Language Server Protocol server
├── omg-md-cli/      # Command-line interface
└── omg-vscode/      # VS Code extension
```

Packages have dependencies:
- `omg-md-cli` depends on `omg-parser`, `omg-compiler`, `omg-linter`
- `omg-compiler` depends on `omg-parser`
- `omg-lsp` depends on `omg-parser`, `omg-linter`

Build in dependency order using `npm run build`.

## Types of Contributions

### Bug Reports

Open an issue with:
- A clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- OMG file content (if applicable)

### Feature Requests

Open an issue describing:
- The problem you're trying to solve
- Your proposed solution
- Alternative approaches you've considered

### Pull Requests

1. Reference any related issues
2. Include a clear description of changes
3. Add tests for new functionality
4. Update documentation as needed

## Code Style

- TypeScript with strict mode
- Prettier for formatting (run `npm run format`)
- Prefer explicit types over inference for public APIs
- Use descriptive variable and function names

## Testing

Run all tests:
```bash
npm test
```

Run tests for a specific package:
```bash
npm test --workspace=omg-parser
```

Validate examples compile to valid OpenAPI:
```bash
node packages/omg-md-cli/dist/cli.js build examples/pokeapi/api.omg.md -o /tmp/test.yaml
npx @apidevtools/swagger-cli validate /tmp/test.yaml
```

## Questions?

- Open an issue for questions about contributing
- Check existing issues and discussions first

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
