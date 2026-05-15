# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.2] - 2026-05-14

### Fixed

- `omg import` now maps `POST` to the `create` filename slug; previously `POST` and `PATCH` both mapped to `update`, so when both existed on the same resource the second-imported file overwrote the first. (#83)

## [0.4.1] - 2026-05-14

### Added

- `omg.response.default` is now a recognised response block, mirroring OpenAPI's `responses.default` catch-all. The parser accepts `omg.response.default`, the compiler emits it under `responses.default`, and `omg import` round-trips it instead of silently dropping the response. `OmgBlock.statusCode` widens from `number | undefined` to `number | 'default' | undefined`, and `ParsedEndpoint.responses` keys are now strings. (#80)

### Fixed

- Parser merges multiple same-kind parameter blocks (`omg.path`, `omg.query`, `omg.headers`) on a single endpoint instead of keeping only the last, and emits bodyless responses for empty `omg.response` / `omg.response.<code>` blocks. (#78)
- `omg import` structurally deduplicates inline schemas against `components.schemas`, so dereferenced OpenAPI inputs (the default output of `swagger-cli bundle -r`, `redocly bundle --dereferenced`, and most Java/dotnet bundlers) no longer emit a forest of dead named types with their structure duplicated at every usage site. Inline schemas whose canonical shape matches a named component are rewritten as references; sub-schemas inside a named type are also rewritten to references when they match other components.

## [0.4.0] - 2026-05-14

### Changed

- `omg-linter`, `omg-importer`, and `omg-mock-server` are now private internal packages. Their functionality ships bundled inside `omg-md-cli` (lint/import/mock commands) and `omg-lsp` (linter). Consumers should depend on `omg-md-cli` or `omg-lsp` directly. (#66)
- `omg-md-cli` and `omg-lsp` now build via esbuild (`tsc --emitDeclarationOnly && node build.mjs`) so the bundled JavaScript published to npm is self-contained. (#66)

### Fixed

- `omg-md-cli@0.3.0` and `omg-lsp@0.3.0` published with broken transitive references to `omg-linter@^0.3.0`, `omg-importer@^0.3.0`, and `omg-mock-server@^0.3.0` that were never published to npm. v0.4.0 ships those packages bundled into the consumers, so `npm install omg-md-cli` resolves cleanly. (#66)

## [0.3.0] - 2026-05-13

### Added

- Schema parser supports inline-object array syntax: `{ id: string }[]`. (#63)
- Schema parser supports parenthesised type expressions: `(A | B)[]`, `(A & B)[]`, and parens for disambiguation. (#63)

### Fixed

- `omg-parser`, `omg-compiler`, and `omg-mock-server` are now ESM packages, fixing `ERR_REQUIRE_ESM` when consumed on Node 18/20. The CLI and tests previously only worked on Node 22.12+ where `require(ESM)` is enabled by default. (#64)

## [0.2.2] - 2026-05-13

### Fixed

- `omg import` escapes string args and uses bracket form for annotated array items. (#54)

## [0.2.1] - 2026-05-13

### Fixed

- `omg import` collapses multi-line descriptions and uses bracket form for enum/union arrays. (#50)

[Unreleased]: https://github.com/mcclowes/omg/compare/v0.4.2...HEAD
[0.4.2]: https://github.com/mcclowes/omg/compare/v0.4.1...v0.4.2
[0.4.1]: https://github.com/mcclowes/omg/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/mcclowes/omg/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/mcclowes/omg/compare/v0.2.2...v0.3.0
[0.2.2]: https://github.com/mcclowes/omg/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/mcclowes/omg/releases/tag/v0.2.1
