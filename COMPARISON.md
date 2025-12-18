# OMG vs OpenAPI: A Side-by-Side Comparison

This document demonstrates the dramatic simplification OMG provides over raw OpenAPI YAML.

---

## The Numbers

For the xero Accounting API:

| Metric | OpenAPI (Current) | OMG (Proposed) |
|--------|-------------------|----------------|
| **Total lines** | ~30,000 | ~5,000 |
| **Files for 1 endpoint** | 5-8 | 1 |
| **Error response definitions** | Repeated 200+ times | Defined once |
| **Pagination boilerplate** | Repeated 50+ times | `use pagination` |
| **Time to understand** | Hours | Minutes |

---

## Example 1: List Accounts Endpoint

### Current OpenAPI (across 6+ files)

**File 1: Main spec (xero-Accounting.yaml)**
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

**File 2: companyId.yaml**
```yaml
name: companyId
in: path
required: true
schema:
  $ref: ../../global/properties/CompanyId.yaml
description: Unique identifier for a company.
```

**File 3: page.yaml**
```yaml
name: page
in: query
schema:
  type: integer
  default: 1
  minimum: 1
description: Page number to retrieve.
```

**File 4: pageSize.yaml**
```yaml
name: pageSize
in: query
schema:
  type: integer
  default: 100
  minimum: 1
  maximum: 5000
description: Number of results per page.
```

**File 5: accounts-list.md**
```markdown
The *List accounts* endpoint returns a list of accounts...
```

**File 6: 401-Unauthorized.yaml**
```yaml
description: Unauthorized
content:
  application/json:
    schema:
      $ref: ../schemas/ErrorResponse.yaml
    example:
      statusCode: 401
      service: ...
```

*...and 7 more response files...*

**File 7: Account.yaml (schema)**
```yaml
title: Account
type: object
properties:
  id:
    type: string
    description: Unique identifier for the account
  name:
    type: string
    description: Display name
  # ... 20+ more properties
```

**Total: ~150 lines across 8+ files**

---

### OMG Equivalent (single file)

```oal
## List Accounts

```http
GET /companies/{companyId}/data/accounts
```

@operationId list-accounts
@tags Accounts

Returns a paginated list of accounts from the company's chart of accounts.

path {
  companyId
}

use pagination
use errors

returns Account[]
```

**Total: 18 lines in 1 file**

The type definitions, error responses, and pagination parameters are defined
once in shared files and inherited automatically.

---

## Example 2: Create Invoice Endpoint

### Current OpenAPI

```yaml
'/companies/{companyId}/connections/{connectionId}/push/invoices':
  post:
    tags:
      - Invoices
    summary: Create invoice
    description:
      $ref: ./accounting/copy/invoices/invoices-create.md
    operationId: create-invoice
    parameters:
      - $ref: ./global/parameters/companyId.yaml
      - $ref: ./global/parameters/connectionId.yaml
      - name: timeoutInMinutes
        in: query
        schema:
          type: integer
          minimum: 1
          maximum: 120
          default: 30
        description: Operation timeout in minutes
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: ./accounting/schemas/CreateInvoiceRequest.yaml
          examples:
            $ref: ./accounting/schemas/examples/invoices-create.yaml
    responses:
      '200':
        description: Success
        content:
          application/json:
            schema:
              $ref: ./accounting/schemas/CreateInvoiceResponse.yaml
      '202':
        description: Accepted
        content:
          application/json:
            schema:
              $ref: ./accounting/schemas/CreateInvoiceResponse.yaml
      '400':
        $ref: ./global/responses/400-MalformedQuery.yaml
      '401':
        $ref: ./global/responses/401-Unauthorized.yaml
      # ... 7 more error responses ...
```

Plus separate files for:
- `CreateInvoiceRequest.yaml` (~80 lines)
- `CreateInvoiceResponse.yaml` (~30 lines)
- `invoices-create.md` (~20 lines)
- `invoices-create.yaml` (examples, ~50 lines)

**Total: ~250 lines across 5+ files**

---

### OMG Equivalent

```oal
## Create Invoice

```http
POST /companies/{companyId}/connections/{connectionId}/push/invoices
```

@operationId create-invoice
@tags Invoices

Creates a new invoice in the connected accounting software.

path {
  companyId
  connectionId
}

query {
  timeoutInMinutes?: int @min(1) @max(120) = 30
    "Operation timeout"
}

use errors

body CreateInvoiceRequest

returns {
  200: CreateInvoiceResponse "Invoice created"
  202: CreateInvoiceResponse "Invoice creation in progress"
}

type CreateInvoiceRequest {
  invoiceNumber?: string
    "Customer-facing invoice number"

  customerRef: CustomerRef
    "Customer to bill"

  issueDate: date
    "Invoice date"

  dueDate?: date
    "Payment due date"

  lineItems: InvoiceLineItem[] @minItems(1)
    "Line items (at least one required)"

  example: {
    customerRef: { id: "80000001-1234567890" }
    issueDate: "2024-01-15"
    lineItems: [{
      description: "Consulting services"
      quantity: 40
      unitAmount: 150.00
    }]
  }
}

type CreateInvoiceResponse {
  ...PushOperation
  data?: Invoice
}
```

**Total: ~55 lines in 1 file**

---

## Example 3: Type Definition

### Current OpenAPI (Account.yaml)

```yaml
title: 'Accounting: Account'
description: |-
  > View the coverage for accounts in the <a className="external" href="https://knowledge.xero.io/supported-features/accounting?view=tab-by-data-type&dataType=chartOfAccounts" target="_blank">Data coverage explorer</a>.

  ## Overview

  Accounts are the categories a business uses to record accounting transactions.
  From the Accounts endpoints, you can retrieve a list of all accounts for a
  specified company.

  The categories for an account include:
  - Asset
  - Expense
  - Income
  - Liability
  - Equity

  > **Accounts with no category**
  >
  > For accounts that don't have a category, the **type** is `Unknown`.

type: object
allOf:
  - type: object
    properties:
      id:
        type: string
        description: Identifier of the account (unique to the company).
      name:
        type: string
        description: Name of the account.
        maxLength: 200
      fullyQualifiedName:
        type: string
        nullable: true
        description: Full hierarchical name of the account.
      description:
        type: string
        nullable: true
        description: Description of the account.
      type:
        enum:
          - Unknown
          - Asset
          - Liability
          - Equity
          - Income
          - Expense
        type: string
        description: Type of account.
      status:
        enum:
          - Unknown
          - Active
          - Archived
          - Pending
        type: string
        description: Status of the account.
      currency:
        $ref: ../../global/schemas/components/Currency.yaml
      currentBalance:
        type: number
        nullable: true
        format: decimal
        description: Current balance of the account.
      nominalCode:
        type: string
        nullable: true
        maxLength: 50
        description: Account code/number.
      isBankAccount:
        type: boolean
        description: Whether the account is a bank account.
      validDatatypeLinks:
        type: array
        nullable: true
        items:
          $ref: '#/definitions/ValidDatatypeLink'
      metadata:
        $ref: Metadata.yaml
  - $ref: ../../global/schemas/components/ModifiedDates.yaml
definitions:
  ValidDatatypeLink:
    type: object
    properties:
      property:
        type: string
        nullable: true
      links:
        type: array
        nullable: true
        items:
          type: string
```

**Total: ~90 lines**

---

### OMG Equivalent

```oal
type Account {
  id: string
    "Unique identifier for the account"

  name: string @maxLength(200)
    "Display name of the account"

  fullyQualifiedName?: string
    "Full hierarchical name (e.g., 'Assets:Current:Cash')"

  description?: string
    "Description of the account's purpose"

  type: AccountType
    "Classification for financial statements"

  status: AccountStatus = "Active"
    "Whether the account can receive transactions"

  currency?: Currency
    "Account currency"

  currentBalance?: decimal
    "Current balance in account currency"

  nominalCode?: string @maxLength(50)
    "Account code/number"

  isBankAccount: bool = false
    "Whether this is a bank account"

  validDatatypeLinks?: DataTypeLink[]
    "Data types that can link to this account"

  metadata: Metadata
  ...ModifiedDates
}

type AccountType = enum {
  Unknown "Could not be determined"
  Asset "Resources owned by the business"
  Liability "Obligations owed"
  Equity "Owner's stake"
  Income "Revenue from operations"
  Expense "Costs of operations"
}
```

**Total: ~40 lines**

---

## Why OMG is Better

### For Technical Writers

| Pain Point | OpenAPI | OMG |
|------------|---------|-----|
| Learning curve | YAML indentation, `$ref` syntax, schema composition | Write Markdown, add structure blocks |
| Context switching | 8 files to understand 1 endpoint | Everything in 1 file |
| Descriptions | Buried in `description:` fields | Primary content, first-class prose |
| Examples | Separate YAML/JSON files | Inline, with generation rules |

### For Developers

| Pain Point | OpenAPI | OMG |
|------------|---------|-----|
| Boilerplate | Copy-paste error responses everywhere | `use errors` |
| DRY principle | Impossible without tooling | Built into the language |
| Type composition | `allOf`, `oneOf`, `$ref` chains | Spread syntax, union types |
| Readability | Verbose YAML soup | Clean, scannable syntax |

### For Product Managers

| Pain Point | OpenAPI | OMG |
|------------|---------|-----|
| Understanding the API | Need developer to explain | Read like documentation |
| Making changes | Afraid to touch YAML | Confident editing Markdown |
| Reviewing PRs | Can't tell what changed | Meaningful diffs |
| Contract testing | Separate tooling required | Built into the language |

---

## Migration Path

OMG compiles to OpenAPI 3.1, so existing tooling continues to work:

```bash
# Compile OMG to OpenAPI
omg build ./my-api/api.omg.md --output openapi.yaml

# Validate the output
npx @apidevtools/swagger-cli validate openapi.yaml
```

You can adopt OMG incrementally—one resource at a time—while maintaining
compatibility with your existing OpenAPI toolchain.

> **Note:** An OpenAPI-to-OMG importer is planned for a future release.
