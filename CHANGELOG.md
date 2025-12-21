# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.0] - 2024-12-21

### Added

- Multiple named examples with contextual markdown support

## [1.1.0] - 2024-12-20

### Added

- Mock server generator (`omg-mock-server` package)
- `omg mock` CLI command for starting mock servers
- Vague integration for realistic test data generation
- Watch mode for mock server

## [1.0.0] - 2024-12-19

### Added

- OpenAPI importer (`omg-importer` package)
- `omg import` CLI command for converting OpenAPI to OMG
- Formatter for consistent OMG file styling
- API diff commands (`omg diff`, `omg breaking`, `omg changelog`)

## [0.1.0] - 2024-12-18

### Added

- Initial release of OMG (OpenAPI Markdown Grammar)
- `omg-parser` - Markdown-based OMG file parser
- `omg-compiler` - Compiles OMG to OpenAPI 3.1 specifications
- `omg-md-cli` - Command-line interface for OMG compilation
- `omg-linter` - Linting for OMG files
- `omg-lsp` - Language Server Protocol server
- `omg-vscode` - VS Code extension for syntax highlighting
- Support for API endpoints, parameters, responses, and schemas
- Partial file support for reusable components
- Nested type definitions and recursive schema support
- Comprehensive documentation (DESIGN.md, SYNTAX.md, BEHAVIORS.md, etc.)

[Unreleased]: https://github.com/mcclowes/omg/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/mcclowes/omg/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/mcclowes/omg/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/mcclowes/omg/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/mcclowes/omg/releases/tag/v0.1.0
