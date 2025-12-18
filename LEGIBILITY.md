# OMG Legibility Analysis

> An assessment of the readability and learnability of OpenAPI Language (OMG)

## Executive Summary

OMG achieves **high overall legibility** through its Markdown-native approach and intuitive syntax. The language successfully balances expressiveness with simplicity, making API specifications readable by both technical and non-technical audiences. However, there are specific areas where legibility could be further improved.

**Overall Legibility Score: 8/10**

---

## Legibility Strengths

### 1. Markdown-Native Design ✅

OMG's most significant legibility advantage is that **the document is prose first**. The specification reads like documentation:

```markdown
# Create Invoice

Creates a new invoice in the connected accounting software.

> **Note:** Not all platforms support invoice creation.
> Check push options before calling this endpoint.
```

**Why this works:**
- Familiar to anyone who has written README files
- Descriptions aren't buried in YAML `description:` fields
- Natural reading flow from top to bottom
- Supports rich formatting (bold, links, lists, blockquotes)

### 2. Clear Type Syntax ✅

The type system is concise and readable:

```oal
{
  id: string,
  name: string @maxLength(200),
  type: "Asset" | "Liability" | "Equity",
  balance: decimal?,
  isActive: boolean = true
}
```

**Legibility features:**
- `field: type` is universally understood (TypeScript, Go, Rust, Swift)
- `?` for optional fields is intuitive
- `|` for union types mirrors natural language ("this OR that")
- `= value` for defaults is self-explanatory
- Inline comments with `//` provide context without noise

### 3. Self-Documenting Constraints ✅

Annotations read like English:

```oal
price: decimal @min(0) @max(999999.99)
email: string @format("email")
tags: string[] @minItems(1) @maxItems(10)
```

A non-technical reader can understand:
- Price must be between 0 and 999,999.99
- Email must be a valid email format
- Tags array must have 1-10 items

### 4. DRY Inheritance via `use` ✅

The `use` keyword clearly indicates shared behavior:

```oal
use pagination  // Adds page, pageSize query params
use errors      // Adds standard error responses
```

**Why this is legible:**
- Single word communicates "reuse common pattern"
- Comments explain exactly what gets included
- Avoids the visual noise of `$ref: ./global/...` syntax

### 5. Endpoint Front Matter ✅

YAML front matter provides scannable metadata:

```yaml
---
method: POST
path: /companies/{companyId}/push/invoices
operationId: create-invoice
tags: [Invoices]
follows:
  - list-accounts
---
```

**Legibility advantages:**
- Clear separation from prose content
- Method and path immediately visible
- Relationship metadata (`follows`, `webhooks`) explicit

### 6. Code Block Language Tags ✅

Using `.omg.query`, `.omg.body`, `.omg.response` as language tags:

```markdown
```omg.query
{ ... }
\```

```omg.body
{ ... }
\```

```omg.response.200
{ ... }
\```
```

**Why this works:**
- Purpose is immediately clear from the tag
- Multiple response codes distinguished by suffix (`.200`, `.202`, `.400`)
- Works with standard Markdown tooling

---

## Legibility Concerns & Recommendations

### 1. Inconsistent Field Definition Styles ⚠️

**Current issue:** Two syntaxes exist for field descriptions:

```oal
// Style 1: Inline comment
name: string,  // Display name

// Style 2: Quoted suffix
name: string "Display name"

// Style 3: Separate line (from SYNTAX.md)
name: string @maxLength(200)
  "Display name of the account"
```

**Problem:** Readers must learn three patterns. The third style (multi-line) can be confusing - is the string a description or a default value?

**Recommendation:** Standardize on **inline comments** for brevity and **blockquote paragraphs** for longer descriptions:

```oal
{
  name: string @maxLength(200),  // Short descriptions here

  // Longer descriptions can use Markdown paragraphs above the field:
  // The fully qualified name includes the complete hierarchy path
  // e.g., "Assets:Current:Cash"
  fullyQualifiedName?: string
}
```

### 2. Template Partial Syntax Could Be Clearer ⚠️

**Current:**
```markdown
{{> params/company }}
{{> responses/errors }}
```

**Problem:** The `{{> path }}` syntax requires knowledge of Handlebars/Mustache templating. Non-technical readers may not understand what this does.

**Recommendation:** Consider a more explicit syntax:

```oal
include "./params/company.omg.md"
// or
use partial "params/company"
```

Or at minimum, document this prominently with examples showing what gets included.

### 3. Response Status Code Semantics ✅ (Addressed)

**Status:** Documented in `docusaurus/docs/syntax/code-blocks.md`

The documentation now clearly explains:
- `omg.response` = status 200 (default success)
- `omg.response.XXX` = specific status code
- Includes a reference table of common status codes and their uses
- Provides guidance on when to use bare vs explicit codes

### 4. Cross-Field Constraint Syntax ⚠️

**Current syntax:**
```oal
@constraint endDate >= startDate "End date must be after start date"
@constraint total == subtotal + tax
```

**Legibility concern:** The expression syntax (`>=`, `==`) may not be obvious to non-programmers. Does `>=` mean "greater than or equal" or something else?

**Recommendation:** Consider natural language alternatives for common cases:

```oal
// Current (programmer-friendly)
@constraint endDate >= startDate

// Alternative (prose-friendly)
@constraint "endDate must be on or after startDate"
@constraint "total equals subtotal plus tax"
```

Or provide both options where the prose form generates the same validation.

### 5. Generic Types Add Complexity ⚠️

**Syntax:**
```oal
type PaginatedResponse<T> {
  results: T[]
  pageNumber: int
}

returns PaginatedResponse<Account>
```

**Concern:** Generics (`<T>`) are familiar to programmers but alien to product managers and technical writers.

**Recommendation:** This is acceptable for power users, but provide a non-generic alternative for common cases:

```oal
// For advanced users
returns PaginatedResponse<Account>

// For beginners (equivalent, more explicit)
returns {
  results: Account[],
  pageNumber: int,
  pageSize: int,
  totalResults: int
}
```

### 6. Nullable vs Optional Distinction ⚠️

**Current:**
```oal
required: string           // Required, non-null
optional?: string          // Optional, non-null if present
nullable: string | null    // Required, can be null
optionalNullable?: string | null  // Optional, can be null
```

**Concern:** Four distinct states require understanding the difference between "optional" (might not be in payload) vs "nullable" (might be explicitly `null`). This is a genuine API modeling complexity, but:

- `string | null` looks like a union with a type called "null"
- The distinction between `?` and `| null` requires explanation

**Recommendation:** Add inline documentation in examples:

```oal
{
  // Always present, never null
  id: string,

  // May be omitted from the payload
  nickname?: string,

  // Always present, but value may be null
  middleName: string | null,

  // May be omitted OR may be present as null
  suffix?: string | null
}
```

---

## Legibility by Audience

### Technical Product Managers 👍

**Verdict: Excellent legibility**

- Markdown prose is their native format
- Type syntax is intuitive (similar to TypeScript)
- Can read and understand specs without deep programming knowledge
- `use pagination` / `use errors` abstracts complexity

### Technical Writers 👍

**Verdict: Excellent legibility**

- Documentation and API structure are unified
- No need to synchronize separate description files
- Rich Markdown formatting available
- Clear structure from headings

### Backend Developers 👍

**Verdict: Good legibility**

- Type syntax familiar from TypeScript/Go/Rust
- Constraints are self-documenting
- May need to learn OMG-specific features (generics, composition)
- Front matter YAML is standard

### Frontend Developers 👍

**Verdict: Good legibility**

- Response shapes are immediately clear
- Type definitions map well to TypeScript interfaces
- Examples provide concrete data shapes

### API Consumers (External) 👍

**Verdict: Good legibility**

- Reads like documentation, not configuration
- Examples show real request/response shapes
- Endpoint descriptions are prose, not buried in metadata

---

## Comparison with Alternatives

| Aspect | OMG | OpenAPI YAML | TypeSpec |
|--------|-----|--------------|----------|
| **Prose readability** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| **Type syntax** | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Learning curve** | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| **Information density** | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| **Non-programmer friendly** | ⭐⭐⭐⭐⭐ | ⭐ | ⭐⭐ |

OMG's primary legibility advantage over OpenAPI YAML is **colocation** - everything about an endpoint lives in one file, reading top-to-bottom. OpenAPI scatters context across multiple files (`$ref` everywhere).

---

## Specific Legibility Wins

### Before (OpenAPI):
```yaml
parameters:
  - name: companyId
    in: path
    required: true
    schema:
      type: string
      format: uuid
    description: Unique identifier for the company
```

### After (OMG):
```oal
path {
  companyId: uuid  // Unique identifier for the company
}
```

**6x reduction** in lines while retaining all information.

---

### Before (OpenAPI):
```yaml
responses:
  '200':
    description: Success
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/Account'
  '400':
    $ref: './responses/400.yaml'
  '401':
    $ref: './responses/401.yaml'
  # ... 7 more refs
```

### After (OMG):
```oal
returns Account

use errors
```

**90% reduction** through inheritance.

---

## Recommendations Summary

1. **Standardize field description syntax** - Pick one style (recommend inline comments)
2. **Clarify template partial syntax** - Use more explicit `include` or document heavily
3. ~~**Document response status semantics**~~ ✅ Done - See `docusaurus/docs/syntax/code-blocks.md`
4. **Add prose alternatives for constraints** - Help non-programmers write validations
5. **Provide non-generic examples** - Don't force `<T>` syntax for simple cases
6. **Explain nullable vs optional** - This is confusing; add prominent examples

---

## Conclusion

OMG achieves its design goal of being **readable by humans first**. The Markdown-native approach, intuitive type syntax, and DRY inheritance make it significantly more legible than raw OpenAPI YAML.

The main legibility improvements would come from:
- Consolidating syntax variations (especially field descriptions)
- Making template/partial inclusion more explicit
- Providing non-programmer-friendly alternatives for advanced features

OMG successfully serves its target audiences (PMs, writers, developers) with a format that works as both **documentation and specification**.
