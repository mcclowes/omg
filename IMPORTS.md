# Reusability Patterns in OMG

> Proposal for improving parameter and response reuse beyond partials

## Current State

### Partials (Handlebars-style)
```markdown
{{> params/company }}
{{> params/connection }}
{{> responses/errors }}
```

**Pros:**
- Simple text inlining
- Familiar to Handlebars users
- Works for any content

**Cons:**
- Verbose syntax (braces within braces)
- No composition/merging logic
- Not self-documenting (reader must know what partial contains)
- No IDE support for discovering available partials

---

## Proposal 1: `use` Directive (Documented in SYNTAX.md)

This pattern is already documented but not implemented:

```markdown
---
method: GET
path: /companies/{companyId}/accounts
---

# List Accounts

use pagination  // Adds page, pageSize query params
use errors      // Adds standard error responses

```omg.path
{
  companyId: uuid
}
```

returns Account[]
```

### Define Reusables in `defaults.omg.md`:

```markdown
# API Defaults

```omg.defaults errors
400: BadRequest
401: Unauthorized
404: NotFound
429: RateLimited
500: InternalServerError
```

```omg.defaults pagination
query {
  page: int = 1 @min(1)
  pageSize: int = 100 @min(1) @max(1000)
}
```

```omg.defaults companyPath
path {
  companyId: uuid  // The company identifier
}
```
```

**Pros:**
- Very readable (`use errors` is self-explanatory)
- Named, discoverable reusables
- Can be documented with descriptions
- IDE can provide autocomplete

**Cons:**
- New syntax to implement
- Need to define resolution rules for defaults files

---

## Proposal 2: Inline Imports

More explicit than partials, clearer than `use`:

```markdown
---
method: GET
path: /companies/{companyId}/accounts
---

# List Accounts

@include path from "params/company"
@include query from "params/pagination"
@include responses from "responses/errors"

returns Account[]
```

**Pros:**
- Explicit about what's being included
- Clear file references
- Familiar import-style syntax

**Cons:**
- More verbose than `use`
- Still requires knowing file structure

---

## Proposal 3: Named Parameters & Responses (Component References)

Define reusable components that can be referenced by name:

### Define in `components.omg.md`:

```markdown
# Shared Components

## Parameters

```omg.param companyId
path companyId: uuid  // The company identifier
```

```omg.param connectionId
path connectionId: uuid  // The data connection identifier
```

```omg.param pagination
query page: int = 1 @min(1)
query pageSize: int = 100 @min(1) @max(1000)
```

## Responses

```omg.response NotFound
404: {
  statusCode: int = 404,
  message: string,
  correlationId: uuid
}
```

```omg.response.group StandardErrors
400: BadRequest
401: Unauthorized
404: NotFound
429: RateLimited
500: InternalServerError
```
```

### Use in endpoints:

```markdown
---
method: GET
path: /companies/{companyId}/accounts
---

# List Accounts

@param companyId
@param pagination
@errors StandardErrors

returns Account[]
```

**Pros:**
- Very concise at usage site
- Components are first-class, named entities
- Maps directly to OpenAPI `components/parameters` and `components/responses`
- IDE can autocomplete `@param` and `@errors`

**Cons:**
- New block types and directives
- More complex implementation

---

## Proposal 4: Type-Level Composition (Already in SYNTAX.md)

Use existing type composition for parameters:

```markdown
# Shared Types

type CompanyPath {
  companyId: uuid  // The company identifier
}

type ConnectionPath {
  ...CompanyPath
  connectionId: uuid  // The data connection identifier
}

type PaginationQuery {
  page: int = 1 @min(1)
  pageSize: int = 100 @min(1) @max(1000)
}
```

### Use in endpoints:

```markdown
---
method: GET
path: /companies/{companyId}/connections/{connectionId}/accounts
---

# List Accounts

```omg.path
...ConnectionPath
```

```omg.query
...PaginationQuery
customFilter?: string
```

returns Account[]
```

**Pros:**
- Uses existing type composition syntax (spread)
- Familiar to TypeScript users
- Works for complex composition (add/remove fields)

**Cons:**
- Requires implementing spread operator first
- Slightly more verbose than `@param`
- Types vs parameters distinction can be confusing

---

## Comparison Matrix

| Feature | Partials | `use` | `@include` | `@param/@errors` | Type Spread |
|---------|----------|-------|------------|------------------|-------------|
| Readability | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Discoverability | ⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Implementation complexity | ✅ Done | Medium | Easy | Medium | Hard |
| Composition support | None | None | None | None | Full |
| OpenAPI alignment | None | Custom | Custom | `components/*` | `components/schemas` |

---

## Recommendation

**Short-term:** Implement **Proposal 1 (`use` directive)** because:
1. Already documented in SYNTAX.md
2. Most readable for common cases
3. Medium implementation complexity
4. Covers 90% of reuse needs

**Medium-term:** Implement **Proposal 4 (Type Spread)** because:
1. Already documented in SYNTAX.md
2. Enables complex composition (pick/omit fields)
3. Consistent with type system design

**Combination approach:**

```markdown
---
method: POST
path: /companies/{companyId}/connections/{connectionId}/push/invoices
---

# Create Invoice

use errors              // Standard error responses (simple)
use companyPath         // Common path params (simple)

```omg.path
...ConnectionPath       // Compose with spread (complex)
```

```omg.query
...PaginationQuery      // Reuse pagination
sortBy?: string         // Add endpoint-specific param
```

returns Invoice
```

---

## Implementation Plan

### Phase 1: `use` Directive
1. Add `omg.defaults` block type to parser
2. Create defaults resolution (find `defaults.omg.md` in parent dirs)
3. Add `use` directive parsing in document parser
4. Merge defaults into endpoint blocks during resolution

### Phase 2: Type Spread
1. Add `OmgSpread` to type system
2. Parse `...TypeName` in schema parser
3. Add `@omit` annotation support
4. Resolve spreads during compilation

### Phase 3: Named Components (Optional)
1. Add `omg.param` and `omg.response` block types
2. Compile to OpenAPI `components/parameters` and `components/responses`
3. Add `@param` and `@errors` directives

---

## Open Questions

1. **Defaults file location:** Should `defaults.omg.md` be in root only, or searched up like partials?

2. **Conflict resolution:** What happens when `use errors` and explicit `omg.response.400` both exist?

3. **Override syntax:** Can you `use errors` but override one specific code?
   ```markdown
   use errors

   ```omg.response.404
   {
     // Custom 404 instead of default
   }
   ```

4. **Namespace support:** Should `use` support namespaces for organization?
   ```markdown
   use responses.errors
   use params.pagination
   ```