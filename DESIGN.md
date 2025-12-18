# OpenAPI Language (OMG) - Design Document

> A human-first domain-specific language for API specification

## Vision

OMG is a Markdown-native language for describing APIs that can be:
- **Written** by technical product managers and technical writers
- **Understood** by developers at a glance
- **Used as a spec** for implementation work
- **Leveraged as a contract tester** against production instances

```
The same document that describes your API to humans
also validates that your production instance matches the spec.
```

---

## The Problem

Modern OpenAPI specifications suffer from:

### 1. Verbosity & Boilerplate
Every endpoint repeats the same error responses, parameters, and metadata:

```yaml
# Current OAS - repeated 200+ times across the spec
responses:
  '400':
    $ref: ./global/responses/400-MalformedQuery.yaml
  '401':
    $ref: ./global/responses/401-Unauthorized.yaml
  '402':
    $ref: ./global/responses/402-PaymentRequired.yaml
  '403':
    $ref: ./global/responses/403-Forbidden.yaml
  '404':
    $ref: ./global/responses/404-NotFound.yaml
  '429':
    $ref: ./global/responses/429-TooManyRequests.yaml
  '500':
    $ref: ./global/responses/500-InternalServerError.yaml
  '503':
    $ref: ./global/responses/503-ServiceUnavailable.yaml
```

### 2. Scattered Context
Understanding a single endpoint requires opening 5+ files:
- Main spec file
- Parameter definitions
- Schema definitions
- Description markdown
- Example files

### 3. Hostile to Writers
YAML indentation is error-prone. `$ref` syntax is cryptic. Writers avoid touching the spec.

### 4. Weak Examples
Examples are static JSON blobs. No way to express "80% of invoices are paid" or "due date is always after issue date".

---

## Design Principles

### 1. Markdown is the Spec
The document **is** prose. API structure emerges from headings, not configuration.

### 2. Prose First, Structure Second
Descriptions aren't buried in `description:` fields. They're the primary content.

### 3. DRY by Default
Common patterns (pagination, errors, auth) are declared once and inherited everywhere.

### 4. Examples are Constraints
Instead of static examples, declare what valid data looks like. Generate infinite variations.

### 5. One File, One Concept
An endpoint's path, method, parameters, request, response, and examples live together.

### 6. Compiles to OpenAPI 3.1
Full compatibility with existing tooling. OMG is a better authoring format, not a replacement spec.

---

## Language Overview

### File Structure

```
api/
├── api.omg              # Root API definition
├── defaults.omg         # Global defaults (errors, auth, pagination)
├── types/               # Shared type definitions
│   ├── common.omg
│   └── pagination.omg
├── resources/           # Resource definitions
│   ├── accounts/
│   │   ├── _resource.omg    # Resource overview
│   │   ├── list.omg         # GET /accounts
│   │   ├── get.omg          # GET /accounts/{id}
│   │   └── create.omg       # POST /accounts
│   └── invoices/
│       └── ...
└── examples/            # Extended example datasets
    └── invoices.vague   # Vague integration for rich examples
```

---

## Syntax Specification

### Root API Definition

```oal
# Accounting API
version: 3.0.0

> xero's Accounting API provides a standardized interface to
> accounting software, giving you access to real-time financial
> data from your customers' accounting platforms.

base: https://api.xero.io
auth: bearer

contact:
  name: xero
  email: support@xero.io

terms: https://www.xero.io/legals/

import defaults from "./defaults.omg"
import types from "./types/"
import resources from "./resources/"
```

### Global Defaults

```oal
# API Defaults

## Authentication

All endpoints require Bearer token authentication:

```http
Authorization: Bearer {api_key}
```

auth bearer {
  header: Authorization
  scheme: Bearer
  description: API key obtained from the xero Portal
}

## Standard Errors

All endpoints may return these errors:

errors {
  400 BadRequest "Malformed query or request body"
  401 Unauthorized "Missing or invalid API key"
  402 PaymentRequired "Account subscription issue"
  403 Forbidden "Insufficient permissions"
  404 NotFound "Resource not found"
  409 Conflict "Resource state conflict"
  429 TooManyRequests "Rate limit exceeded"
  500 InternalServerError "Unexpected server error"
  503 ServiceUnavailable "Service temporarily unavailable"
}

## Pagination

List endpoints return paginated results:

pagination {
  query page: int = 1 "Page number"
  query pageSize: int = 100 "Results per page (max 5000)"
  query query?: string "Filter query (xero query syntax)"
  query orderBy?: string "Sort order"

  response {
    results: T[]
    pageNumber: int
    pageSize: int
    totalResults: int
    _links: {
      self: Link
      current: Link
      next?: Link
      previous?: Link
    }
  }
}
```

### Type Definitions

```oal
# Common Types

## Money

Represents a monetary value with currency:

type Money {
  amount: decimal "The monetary amount"
  currency: Currency "ISO 4217 currency code"
}

## Currency

ISO 4217 currency code:

type Currency = enum {
  USD, EUR, GBP, CAD, AUD, ...
}

## DateTime

ISO 8601 datetime string:

type DateTime = string @format("date-time") {
  example: "2024-01-15T09:30:00Z"
}

## CompanyId

Unique identifier for a company:

type CompanyId = string @format("uuid") {
  description: "Unique identifier for a company"
  example: "8a210b68-6988-11ed-a1eb-0242ac120002"
}
```

### Resource Definition

```oal
# Account Transactions

> **Language tip:** In xero, account transactions represent all
> transactions posted to a bank account within an accounting software.
> For bank transactions posted within a banking platform, refer to
> [Banking transactions](/banking-api#/operations/list-all-banking-transactions).

Account transactions represent bank activity within an accounting software.
All transactions that go through a bank account are recorded as account
transactions.

Account transactions are created as a result of different business activities:

- **Payments**: receiving money for payment against an invoice
- **Bill payments**: spending money for a payment against a bill
- **Direct costs**: withdrawing money from a bank account
- **Direct incomes**: selling an item directly to a contact
- **Transfers**: transferring money between two bank accounts

---

## Type: AccountTransaction

type AccountTransaction {
  id: string "Identifier of the transaction (unique to company)"
  transactionId?: string "Secondary transaction identifier"
  note?: string "Additional information about the transaction"

  bankAccountRef: BankAccountRef "Reference to the bank account"
  date: DateTime "Date the transaction was recorded"

  status: enum {
    Unknown
    Unreconciled
    Reconciled
    Void
  } "The status of the account transaction"

  currency: Currency
  currencyRate?: decimal "Exchange rate if foreign currency"

  lines?: AccountTransactionLine[] "Transaction line items"
  totalAmount: decimal "Total amount, inclusive of tax"

  metadata: Metadata
  ...ModifiedDates
}

type AccountTransactionLine {
  description?: string "Description of the line item"
  recordRef?: RecordRef "Link to underlying record"
  amount: decimal "Amount in transaction currency"
}

---

## List Account Transactions

```http
GET /companies/{companyId}/connections/{connectionId}/data/accountTransactions
```

Returns a list of account transactions for a given company's connection.

Before using this endpoint, you must have
[retrieved data for the company](/docs/refresh-company-data).

path {
  companyId: CompanyId
  connectionId: ConnectionId
}

use pagination

returns AccountTransaction[] {
  example: {
    id: "a]hda97-ahdkj-akjshdkjh"
    transactionId: "1029"
    status: "Reconciled"
    date: "2024-01-15T09:30:00Z"
    totalAmount: 1250.00
    currency: "USD"
    lines: [
      { description: "Invoice payment", amount: 1250.00 }
    ]
  }
}

---

## Get Account Transaction

```http
GET /companies/{companyId}/connections/{connectionId}/data/accountTransactions/{accountTransactionId}
```

Returns a specific account transaction.

path {
  companyId: CompanyId
  connectionId: ConnectionId
  accountTransactionId: string "Unique identifier for the transaction"
}

returns AccountTransaction
```

### Rich Examples with Vague Integration

```oal
# Invoice Examples

examples Invoice {
  # Distribution of invoice statuses in production
  status: 0.6: "Paid" | 0.3: "Sent" | 0.1: "Draft"

  # Realistic amount distribution
  totalAmount: decimal in 100..50000 @lognormal(mean: 2500)

  # Dates that make sense
  issueDate: date in daysAgo(90)..now()
  dueDate: date in issueDate..daysAfter(issueDate, 60)

  # Paid invoices have payment dates
  paidOnDate?: if status == "Paid" {
    date in issueDate..dueDate
  }

  # Line items (1-10 per invoice)
  lineItems: 1..10 of InvoiceLineItem {
    quantity: int in 1..100
    unitAmount: decimal in 10..1000

    # Computed from quantity * unitAmount
    amount: quantity * unitAmount
  }

  # Total matches sum of line items
  assume totalAmount == sum(lineItems.amount)
  assume dueDate >= issueDate
}
```

---

## Contract Testing

OMG specs can validate production APIs:

```bash
# Validate single endpoint
oal test api.omg --endpoint "GET /accounts" --against https://api.xero.io

# Full contract test suite
oal test api.omg --against https://api.xero.io --auth $API_KEY

# Generate test report
oal test api.omg --against https://api.xero.io --report junit
```

### What Gets Validated

1. **Response structure** matches schema
2. **Required fields** are present
3. **Field types** are correct
4. **Enum values** are valid
5. **Constraints** (from examples) are satisfied
6. **Status codes** match expected

---

## Compilation Targets

```bash
# Compile to OpenAPI 3.1 YAML
oal build api.omg --output openapi.yaml

# Compile to OpenAPI 3.1 JSON
oal build api.omg --output openapi.json --format json

# Bundle all files into single spec
oal build api.omg --bundle --output bundled.yaml

# Generate with inline examples from Vague
oal build api.omg --examples --count 3 --output openapi.yaml
```

---

## Toolchain

### CLI Commands

| Command | Description |
|---------|-------------|
| `oal init` | Initialize new OMG project |
| `oal build` | Compile to OpenAPI |
| `oal lint` | Validate OMG syntax and conventions |
| `oal test` | Run contract tests against live API |
| `oal serve` | Start mock server from spec |
| `oal docs` | Generate documentation site |
| `oal examples` | Generate example data |

### Editor Support

- VS Code extension with syntax highlighting
- LSP server for autocomplete and validation
- Live preview of compiled OpenAPI

### CI/CD Integration

```yaml
# GitHub Actions
- name: Validate OMG
  run: oal lint api.omg

- name: Build OpenAPI
  run: oal build api.omg --output openapi.yaml

- name: Contract Test
  run: oal test api.omg --against $API_URL
```

---

## Migration Path

### From Existing OpenAPI

```bash
# Convert OpenAPI to OMG
oal import openapi.yaml --output api/

# Interactive migration with suggestions
oal import openapi.yaml --interactive
```

### Gradual Adoption

OMG can reference existing OpenAPI files:

```oal
# Use existing schemas while migrating
import schema Account from "../legacy/schemas/Account.yaml"
```

---

## Comparison: Before and After

### Before (OpenAPI YAML) - 45 lines

```yaml
'/companies/{companyId}/data/accounts':
  get:
    tags:
      - Accounts
    summary: List accounts
    description:
      $ref: ./accounting/copy/accounts/accounts-list.md
    operationId: list-accounts
    parameters:
      - $ref: ./global/parameters/companyId.yaml
      - $ref: ./global/parameters/page.yaml
      - $ref: ./global/parameters/pageSize.yaml
      - $ref: ./global/parameters/query.yaml
      - $ref: ./global/parameters/orderBy.yaml
    responses:
      '200':
        description: Success
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Accounts'
            examples:
              $ref: ./accounting/schemas/examples/accounts-list.yaml
      '400':
        $ref: ./global/responses/400-MalformedQuery.yaml
      '401':
        $ref: ./global/responses/401-Unauthorized.yaml
      '402':
        $ref: ./global/responses/402-PaymentRequired.yaml
      '403':
        $ref: ./global/responses/403-Forbidden.yaml
      '404':
        $ref: ./global/responses/404-NotFound.yaml
      '409':
        $ref: ./global/responses/409-Conflict.yaml
      '429':
        $ref: ./global/responses/429-TooManyRequests.yaml
      '500':
        $ref: ./global/responses/500-InternalServerError.yaml
      '503':
        $ref: ./global/responses/503-ServiceUnavailable.yaml
```

Plus 5+ additional files for parameters, schemas, descriptions, examples...

### After (OMG) - 15 lines, single file

```oal
## List Accounts

```http
GET /companies/{companyId}/data/accounts
```

Returns a paginated list of accounts for the specified company.

path {
  companyId: CompanyId
}

use pagination

returns Account[]
```

**The descriptions, error responses, pagination parameters, and auth are all inherited from defaults.**

---

## Next Steps

1. **Formalize grammar** - BNF/PEG specification
2. **Build parser** - TypeScript implementation
3. **OpenAPI compiler** - OMG → OpenAPI 3.1
4. **VS Code extension** - Syntax highlighting + LSP
5. **Contract testing** - Runtime validation engine
6. **Vague integration** - Rich example generation
7. **Migration tooling** - OpenAPI → OMG converter

---

## Inspirations

- [API Blueprint](https://apiblueprint.org/) - Markdown-first API description
- [MSON](https://apiblueprint.org/documentation/mson/specification.html) - Markdown Syntax for Object Notation
- [Vague](https://github.com/mcclowes/vague) - Constraint-based data generation
- [Pact](https://pact.io/) - Contract testing philosophy
- [TypeSpec](https://typespec.io/) - Microsoft's API definition language
