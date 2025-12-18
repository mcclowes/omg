# todo

### Immediate (Language Design Finalization)

- [ ] **Review syntax with stakeholders** - Get feedback from tech writers, developers, PMs
- [ ] **Refine Vague integration** - Define exact syntax for probabilistic examples
- [ ] **Document edge cases** - Webhooks, callbacks, streaming, file upload/download
- [ ] **Formalize grammar** - Complete BNF/PEG specification

### Medium-term (Developer Experience)

- [x] **Language Server Protocol** - Autocomplete, hover, go-to-definition
- [x] **VS Code extension** - Full editor integration (published to marketplace)
- [ ] **Watch mode** - Incremental compilation
- [x] **Error messages** - Helpful, actionable diagnostics
- [x] **Formatter** - `omg fmt` for consistent style

### Long-term (Ecosystem)

- [ ] **Contract testing engine** - Validate live APIs against spec
- [ ] **Mock server** - Generate mock responses from spec
- [ ] **OpenAPI importer** - Convert existing specs to OMG
- [ ] **Documentation generator** - Beautiful API docs from OMG
- [ ] **GitHub Actions** - CI/CD integration

---

## Open Questions

### Syntax Decisions

1. **Import syntax** - Should we use ES6-style imports or something simpler?
   ```oal
   // Option A: ES6-style
   import { Account, Invoice } from "./types.omg"

   // Option B: Simple
   import "./types.omg"
   ```

2. **Type spread syntax** - How to handle omissions?
   ```oal
   // Option A: Explicit @omit
   type CreateRequest {
     ...Entity
     @omit id
     @omit createdAt
   }

   // Option B: Pick/Omit utilities
   type CreateRequest = Omit<Entity, "id" | "createdAt">
   ```

3. **Response definition** - Single vs multiple status codes?
   ```oal
   // Option A: Explicit
   returns {
     200: Account "Success"
     201: Account "Created"
   }

   // Option B: Default 200
   returns Account  // Implies 200
   ```

4. **Nullable syntax** - Union or modifier?
   ```oal
   // Option A: Union
   field: string | null

   // Option B: Modifier
   field: string?  // Optional
   field: string!  // Required + nullable
   ```

### Technical Decisions

1. **Parser technology** - Peggy vs Tree-sitter vs hand-written?
2. **Package manager** - npm only or also support yarn/pnpm workspaces?
3. **Bundling** - Should compiled OpenAPI be single file or preserve structure?
4. **Backward compatibility** - Support OpenAPI 3.0 output?

---

## Resources

### Inspirations
- [API Blueprint](https://apiblueprint.org/) - Markdown-first API description
- [MSON](https://apiblueprint.org/documentation/mson/specification.html) - Markdown Syntax for Object Notation
- [Vague](https://github.com/mcclowes/vague) - Constraint-based data generation
- [TypeSpec](https://typespec.io/) - Microsoft's API definition language
- [Pact](https://pact.io/) - Consumer-driven contract testing

### Reference
- [OpenAPI 3.1 Specification](https://spec.openapis.org/oas/v3.1.0)
- [JSON Schema](https://json-schema.org/)
- [CommonMark](https://commonmark.org/) - Markdown standard

---

## Contributing

This is an early-stage project. To contribute:

1. Review the design documents
2. Open issues for questions or suggestions
3. Submit PRs for documentation improvements
4. Help with syntax design decisions

## Completed

- [x] **Set up TypeScript project** - Monorepo with packages for parser, compiler, CLI (`packages/`)
- [x] **Implement lexer** - Tokenize OMG syntax (`omg-parser`)
- [x] **Implement parser** - Build AST from tokens (`document-parser.ts`, `schema-parser.ts`)
- [x] **Implement OpenAPI compiler** - Transform AST to OpenAPI 3.1 (`omg-compiler`)
- [x] **Basic CLI** - `omg build`, `omg lint`, `omg parse`, `omg init` commands (`omg-md-cli`)
- [x] **VS Code syntax highlighting** - TextMate grammar (`packages/omg-vscode/`)
- [X] Publish to NPM
- [X] Add contributing file
- [x] Fix repo URLs in all package.json files
- [x] Uncomment .husky/pre-commit and add linting
- [x] Add engines field to root package.json
- [x] Set up Prettier with format/format:check scripts
- [x] Add format:check to pre-commit hook
- [x] Fix build order for workspace dependencies
- [x] Update package dependencies from file: to semver references
- [x] Publish omg-parser, omg-compiler, omg-linter, omg-lsp to npm
- [x] CI setup (GitHub Actions: format, typecheck, build, test)
- [x] Run validate on examples in CI
- [x] Improved error messages with line numbers and context
- [x] Added parse warnings system for non-fatal issues
- [x] Stack traces in CLI error output
- [x] Variant expansion (`expandVariants` + `@when`) for polymorphic endpoints
