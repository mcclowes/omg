# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `omg test` command — contract testing that validates a live API against its OMG spec. For every endpoint it builds a request (resolving path/query/header parameters from `--env` files, declared examples, or generated placeholders), sends it to the `--against` base URL, and checks the response status code and body against the declared responses (JSON Schema validation via `ajv`, including `#/components/schemas` `$ref` resolution). Supports bearer / basic / custom-header auth, endpoint filtering (`-e`), retries and timeouts, and `console` / `json` / `junit` report formats (`--report`, `-o`) for CI. Exits non-zero when any test fails. Ships in the new private `omg-test` package, bundled into `omg-md-cli`. (#86)
- `omg import` now warns when the input OpenAPI spec appears to be fully dereferenced — `components.schemas` is populated but no `$ref` is used anywhere. The warning recommends bundling the spec (e.g. `redocly bundle`, `swagger-cli bundle` without `-r`) instead of dereferencing it, since references are then preserved natively rather than recovered by structural matching. (#81)
- Formal grammar at `grammar/omg.peg` — an executable [Peggy](https://peggyjs.org) PEG specification of the OMG language, derived from the hand-written parser. It covers the document layer (frontmatter, code blocks, partials) and the schema layer (types, objects, arrays, unions/intersections, enums, annotations, `omg.returns`), with three entry points (`Document`, `Schema`, `ReturnsBlock`). Validated against all 444 example `.omg.md` files. (#58)
- `omg import` now warns when a component schema declares an OpenAPI `discriminator`. OMG has no discriminator construct, so the `oneOf` / `anyOf` is imported as a plain union but the discriminator's `propertyName` and `mapping` are dropped; the warning surfaces that loss instead of letting it pass silently. (#91)
- `@vague("...")` annotation — controls how `omg mock` generates a field's value. The argument is a Vague expression used verbatim, overriding the mock server's field-name heuristics and constraint inference (e.g. `status: string @vague("0.7: \"paid\" | 0.3: \"overdue\"")`). It affects mock generation only and never appears in compiled OpenAPI output. (#57)
- `omg import` now lifts response blocks repeated verbatim across endpoints into shared `partials/responses/*.omg.md` files, rewriting each endpoint to reference the partial (`{{> responses/401 }}`) instead of restating the block inline. This collapses the hundreds of byte-identical boilerplate error-response blocks (401/429/500/503/default) that large imported specs otherwise emit. Extraction reuses the existing partial threshold (default 3) and is disabled by `--no-partials`. (#90)
- `omg docs` command — renders an OMG spec as a single, self-contained, browsable HTML documentation page. The Markdown prose from the spec is preserved alongside endpoint signatures, parameter tables, request/response schemas, and cross-linked component schemas; endpoints are grouped by tag. The output has all styling inlined and no external scripts, so it works offline and can be committed or attached to a release. (#60)
- Reusable GitHub Action (`action.yml`, `mcclowes/omg@v1`) — a composite action that consumers add to their workflows to `build`, `lint`, `breaking`, or `changelog` OMG specs in CI/CD. It sets up Node.js, runs `omg-md-cli` via `npx`, and installs `oasdiff` automatically for the change-detection commands. Inputs are passed through the environment to avoid shell injection. A ready-to-copy workflow ships at `examples/github-workflow.yml`. (#61)

### Fixed

- `omg build` now emits binary request/response bodies under `application/octet-stream` instead of `application/json`. A body whose schema is a `string @format("binary")` is a raw file payload; serving a binary download (or accepting a binary upload) as `application/json` produced invalid OpenAPI. (#56)
- `omg import` no longer repeats a per-endpoint `security:` block into every endpoint when it is identical to the resolved global `security`. Per-endpoint security is emitted only when it genuinely differs from the global requirement (comparison is order-insensitive for both alternative requirements and scopes), keeping endpoint frontmatter minimal and making real overrides visible. An explicit empty `security: []` override is still preserved when it differs from a non-empty global. (#96)
- `omg import` no longer emits trivial type files that nothing references. Bare aliases (`type Iban = IBANDetails`, minted when two source schemas resolve to the same shape) and orphaned named scalars (`type UserId = string @pattern(...)`, left unreferenced when a dereferenced input inlines the equivalent constrained primitive at every call site) are now dropped. Object, array, enum, union, and intersection types are kept even when unreferenced; pruning runs to a fixpoint so alias chains collapse fully. (#93, #94)

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
