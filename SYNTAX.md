# OMG Syntax Specification

> Version 0.1.0 - Draft

## Lexical Structure

### Comments

```oal
// Single line comment

/*
  Multi-line
  comment
*/
```

### Markdown Blocks

Any text not inside a code block or structure block is treated as Markdown prose and becomes the description for the nearest preceding or containing element.

```oal
# Resource Name

This entire paragraph becomes the resource description.
It can span multiple lines and include **formatting**.

- Bullet points work
- [Links](https://example.com) work too

## Endpoint Name

This becomes the endpoint description.
```

---

## Top-Level Declarations

### API Root

```oal
# API Name
version: 1.0.0

> Blockquotes become the API summary (short description)

Regular paragraphs become the full description.

base: https://api.example.com
auth: bearer | apikey | oauth2 | none

contact:
  name: Team Name
  email: team@example.com
  url: https://example.com

license: MIT | Apache-2.0 | { name: "Custom", url: "..." }
terms: https://example.com/terms
```

### Imports

```oal
// Import entire file
import "./types/common.omg"

// Import specific items
import { Money, Currency } from "./types/common.omg"

// Import with alias
import types from "./types/"

// Import from OpenAPI (migration support)
import schema Account from "./legacy/Account.yaml"
```

### Tags/Groups

```oal
tags {
  Accounts "Access standardized accounts from linked accounting software"
  Invoices "Manage invoices and track payments"
  Payments "Process and track payments"
}
```

---

## Type System

### Primitive Types

| Type | Description | OpenAPI Mapping |
|------|-------------|-----------------|
| `string` | Text | `type: string` |
| `int` | Integer | `type: integer` |
| `number` | Float/double | `type: number` |
| `decimal` | Precise decimal | `type: number, format: decimal` |
| `bool` | Boolean | `type: boolean` |
| `date` | Date only | `type: string, format: date` |
| `datetime` | Date and time | `type: string, format: date-time` |
| `uuid` | UUID string | `type: string, format: uuid` |
| `uri` | URI string | `type: string, format: uri` |
| `email` | Email string | `type: string, format: email` |
| `binary` | Binary data | `type: string, format: binary` |
| `any` | Any type | `{}` |

### Type Aliases

```oal
type CompanyId = uuid
type Email = string @format("email")
type Money = decimal @min(0)
```

### Enums

```oal
// Simple enum
type Status = enum { Draft, Sent, Paid, Void }

// Enum with descriptions
type AccountType = enum {
  Asset "Resources owned by the business"
  Liability "Debts owed by the business"
  Equity "Owner's stake in the business"
  Income "Revenue from operations"
  Expense "Costs of operations"
}

// String enum with explicit values
type HttpMethod = enum {
  GET = "GET"
  POST = "POST"
  PUT = "PUT"
  DELETE = "DELETE"
}
```

### Objects

```oal
type Account {
  id: string "Unique identifier"
  name: string "Display name"
  description?: string "Optional description"
  type: AccountType
  balance: decimal = 0 "Current balance, defaults to 0"
  isActive: bool = true

  // Nested object
  metadata: {
    createdAt: datetime
    updatedAt: datetime
  }

  // Readonly fields (not in request bodies)
  @readonly createdBy: string
}
```

### Arrays

```oal
// Array of type
lines: InvoiceLine[]

// Array with constraints
tags: string[] @minItems(1) @maxItems(10)

// Inline array item type
items: {
  id: string
  quantity: int
}[]
```

### Composition

```oal
// Spread/extend another type
type CreateAccountRequest {
  ...Account
  @omit id         // Exclude id from spread
  @omit metadata   // Exclude metadata
}

// Union types (oneOf)
type PaymentMethod = CreditCard | BankTransfer | Cash

// Intersection (allOf)
type AuditedAccount = Account & AuditFields

// With discriminator
type Notification =
  | EmailNotification @when(type == "email")
  | SmsNotification @when(type == "sms")
  | PushNotification @when(type == "push")
```

### Nullable and Optional

```oal
type Example {
  required: string           // Required, non-null
  optional?: string          // Optional, non-null if present
  nullable: string | null    // Required, can be null
  optionalNullable?: string | null  // Optional, can be null
}
```

### Generic Types

```oal
type PaginatedResponse<T> {
  results: T[]
  pageNumber: int
  pageSize: int
  totalResults: int
  _links: PaginationLinks
}

// Usage
returns PaginatedResponse<Account>
```

---

## Constraints & Validation

### Field Constraints

```oal
type Product {
  name: string @minLength(1) @maxLength(200)
  price: decimal @min(0) @max(999999.99)
  quantity: int @min(0)
  sku: string @pattern("[A-Z]{3}-[0-9]{6}")
  email: string @format("email")
  website?: uri
}
```

### Object Constraints

```oal
type DateRange {
  startDate: date
  endDate: date

  // Cross-field validation
  @constraint endDate >= startDate "End date must be after start date"
}

type Invoice {
  lineItems: InvoiceLine[]
  subtotal: decimal
  tax: decimal
  total: decimal

  @constraint total == subtotal + tax
  @constraint lineItems.length > 0 "Invoice must have at least one line item"
}
```

---

## Endpoint Definitions

### Basic Structure

```oal
## Endpoint Name

```http
METHOD /path/{param}/resource
```

Description in Markdown. This can be multiple paragraphs
and include any formatting.

path {
  param: Type "Description"
}

query {
  filter?: string "Optional filter"
  limit: int = 20 "Results per page"
}

headers {
  X-Custom-Header: string "Custom header"
}

body Type | {
  // Inline body definition
  field: string
}

returns ResponseType | {
  // Inline response
}
```

### HTTP Methods

```oal
## List Accounts
```http
GET /accounts
```

## Create Account
```http
POST /accounts
```

## Get Account
```http
GET /accounts/{accountId}
```

## Update Account
```http
PUT /accounts/{accountId}
```

## Partial Update
```http
PATCH /accounts/{accountId}
```

## Delete Account
```http
DELETE /accounts/{accountId}
```
```

### Request Bodies

```oal
## Create Invoice

```http
POST /invoices
```

body CreateInvoiceRequest

// Or inline:
body {
  customerId: uuid
  lineItems: {
    description: string
    quantity: int
    unitPrice: decimal
  }[]
  dueDate: date
  notes?: string
}

// Multiple content types
body {
  @contentType("application/json")
  data: InvoiceData

  @contentType("multipart/form-data")
  file: binary
  metadata: string
}
```

### Responses

```oal
## Get Account

```http
GET /accounts/{accountId}
```

// Single success response
returns Account

// Multiple status codes
returns {
  200: Account "Success"
  201: Account "Created"
  204: void "No content"
}

// With headers
returns Account {
  headers {
    X-Rate-Limit-Remaining: int
    ETag: string
  }
}

// Inline response type
returns {
  data: Account
  meta: {
    requestId: uuid
    timestamp: datetime
  }
}
```

### Conditional Responses

Specify when each response status code occurs using the `when` clause:

```oal
## Delete Invoice

```http
DELETE /invoices/{invoiceId}
```

```oal.returns
{
  204: void
    when exists(invoiceId) && status in [Draft, Void]
    "Invoice successfully deleted"

  404: NotFoundError
    when !exists(invoiceId)
    "Invoice does not exist"

  409: ConflictError
    when exists(invoiceId) && status in [Sent, Paid]
    "Cannot delete invoice in current status"
}
```

Each response entry can have:
- **Status code**: HTTP status code (required)
- **Type**: Response schema type, or `void` for empty responses
- **when clause**: Condition expression describing when this response occurs
- **Description**: Human-readable description (in quotes)

The conditions compile to `x-oal-condition` extensions in OpenAPI output:

```yaml
responses:
  204:
    description: Invoice successfully deleted
    x-oal-condition: "exists(invoiceId) && status in [Draft, Void]"
  404:
    description: Invoice does not exist
    x-oal-condition: "!exists(invoiceId)"
```

### Using Defaults

```oal
// In defaults.omg
defaults {
  errors {
    400 BadRequest
    401 Unauthorized
    404 NotFound
    500 InternalServerError
  }

  pagination {
    query page: int = 1
    query pageSize: int = 100
  }
}

// In endpoint file
## List Accounts

```http
GET /accounts
```

use pagination  // Adds page, pageSize query params
use errors      // Adds standard error responses

returns Account[]
```

### Operation Metadata

```oal
## List Accounts

```http
GET /accounts
```

@operationId list-accounts
@tags Accounts
@deprecated "Use /v2/accounts instead"
@security bearer
@rateLimit 100/minute

returns Account[]
```

### Endpoint Sequence & Webhook Metadata

OMG supports additional metadata not found in standard OpenAPI to help document API workflows:

#### `follows` - Endpoint Dependencies

Specifies which endpoints should be called before this one. Useful for documenting API flows where certain operations must precede others.

```yaml
---
method: POST
path: /companies/{companyId}/sync/expenses
operationId: sync-expenses
follows:
  - create-company
  - create-data-connection
---
```

This indicates that `sync-expenses` requires a company and data connection to exist first. The `follows` list references `operationId` values.

#### `webhooks` - Webhook Relationships

Documents which webhooks may be triggered by an endpoint or which webhooks provide updates about the endpoint's operation.

```yaml
---
method: POST
path: /companies/{companyId}/sync/expenses
operationId: sync-expenses
webhooks:
  resulting:
    - DataSyncCompleted
    - SyncFailed
  listen:
    - DatasetStatusChanged
---
```

- **`webhooks.resulting`**: Webhooks that may be fired as a result of calling this endpoint (e.g., async completion notifications)
- **`webhooks.listen`**: Webhooks to subscribe to for updates about this endpoint's operation (e.g., progress or status changes)

#### Combined Example

```yaml
---
method: POST
path: /companies/{companyId}/push/invoices
operationId: create-invoice
tags: [Invoices]
follows:
  - create-company
  - create-data-connection
  - list-accounts
webhooks:
  resulting:
    - PushOperationStatusChanged
    - PushOperationTimedOut
  listen:
    - PushOperationStatusChanged
---

# Create Invoice

Creates a new invoice in the connected accounting software.

Before calling this endpoint, ensure you have:
1. Created a company (`create-company`)
2. Established a data connection (`create-data-connection`)
3. Fetched available accounts (`list-accounts`) to validate account references
```

These fields compile to OpenAPI extensions: `x-follows`, `x-webhooks-resulting`, and `x-webhooks-listen`.

---

## Examples

### Static Examples

```oal
type Account {
  id: uuid
  name: string
  balance: decimal

  example: {
    id: "550e8400-e29b-41d4-a716-446655440000"
    name: "Cash"
    balance: 1500.00
  }

  // Multiple named examples
  examples {
    basic: {
      id: "..."
      name: "Checking"
      balance: 1000
    }

    empty: {
      id: "..."
      name: "New Account"
      balance: 0
    }
  }
}
```

### Dynamic Examples (Vague Integration)

```oal
type Invoice {
  id: uuid
  status: enum { Draft, Sent, Paid }
  amount: decimal
  issueDate: date
  dueDate: date

  examples generate {
    // Weighted probability for status
    status: 0.1: "Draft" | 0.3: "Sent" | 0.6: "Paid"

    // Realistic amount distribution
    amount: decimal in 100..10000 @lognormal

    // Date constraints
    issueDate: date in daysAgo(90)..now()
    dueDate: date in issueDate..daysAfter(issueDate, 30)

    // Constraint validation
    assume dueDate >= issueDate
  }
}
```

---

## Modifiers & Annotations

| Annotation | Description |
|------------|-------------|
| `@readonly` | Field only in responses, not requests |
| `@writeonly` | Field only in requests, not responses |
| `@deprecated` | Mark as deprecated with message |
| `@internal` | Exclude from public documentation |
| `@format(f)` | String format |
| `@pattern(p)` | Regex pattern |
| `@min(n)` | Minimum value |
| `@max(n)` | Maximum value |
| `@minLength(n)` | Minimum string length |
| `@maxLength(n)` | Maximum string length |
| `@minItems(n)` | Minimum array length |
| `@maxItems(n)` | Maximum array length |
| `@default(v)` | Default value |
| `@example(v)` | Example value |

---

## Full Example: Account Resource

```oal
# Accounts

Access standardized accounts from linked accounting software.

> Accounts are the categories a business uses to organize transactions
> in their accounting system (e.g., Cash, Revenue, Expenses).

Accounts represent the chart of accounts in the connected accounting platform.
Each account has a type (Asset, Liability, Equity, Income, Expense) that
determines how it affects the company's financial statements.

See also:
- [Account transactions](/account-transactions)
- [Journal entries](/journal-entries)

---

## Type: Account

type Account {
  id: string "Unique identifier for the account"

  name: string @maxLength(200)
    "Display name of the account"

  fullyQualifiedName?: string
    "Full hierarchical name (e.g., 'Assets:Current:Cash')"

  description?: string
    "User-provided description of the account's purpose"

  type: AccountType
    "Classification determining financial statement placement"

  status: AccountStatus = "Active"
    "Whether the account can receive new transactions"

  currency?: Currency
    "ISO 4217 currency code, if account is currency-specific"

  currentBalance?: decimal
    "Current balance in the account's currency"

  nominalCode?: string @maxLength(50)
    "Account code/number used in the source system"

  // Nested objects
  validDatatypeLinks?: DataTypeLink[]
    "Data types that can be linked to this account"

  metadata: Metadata
  ...ModifiedDates
}

type AccountType = enum {
  Asset "Resources owned: cash, inventory, receivables"
  Liability "Obligations owed: payables, loans, deferred revenue"
  Equity "Owner's stake: capital, retained earnings"
  Income "Revenue: sales, interest, other income"
  Expense "Costs: salaries, rent, utilities"
  Unknown "Type could not be determined"
}

type AccountStatus = enum {
  Active "Account accepts new transactions"
  Archived "Account is closed, read-only"
  Pending "Account is being set up"
  Unknown "Status could not be determined"
}

---

## List Accounts

```http
GET /companies/{companyId}/data/accounts
```

@operationId list-accounts
@tags Accounts

Returns a paginated list of accounts from the company's chart of accounts.

Use the `query` parameter to filter results:

```
query=type=Asset
query=status=Active&&currentBalance>0
query=name~invoice
```

path {
  companyId: CompanyId
}

use pagination

returns PaginatedResponse<Account> {
  example: {
    results: [{
      id: "1b6266d1-1e44-46c5-8eb5-a8f98e03124e"
      name: "Accounts Receivable"
      type: "Asset"
      status: "Active"
      currentBalance: 15420.00
      currency: "USD"
    }]
    pageNumber: 1
    pageSize: 100
    totalResults: 42
  }
}

---

## Get Account

```http
GET /companies/{companyId}/data/accounts/{accountId}
```

@operationId get-account
@tags Accounts

Returns details of a specific account.

path {
  companyId: CompanyId
  accountId: string "Unique identifier for the account"
}

returns Account

---

## Create Account

```http
POST /companies/{companyId}/connections/{connectionId}/push/accounts
```

@operationId create-account
@tags Accounts

Creates a new account in the connected accounting software.

Not all accounting platforms support account creation. Check the
company's push options to verify support before calling this endpoint.

path {
  companyId: CompanyId
  connectionId: ConnectionId
}

query {
  timeoutInMinutes?: int @min(1) @max(120) = 30
    "Operation timeout in minutes"
}

body {
  name: string "Account name"
  type: AccountType "Account classification"
  currency?: Currency "Account currency (uses company default if omitted)"
  nominalCode?: string "Account code/number"
  description?: string "Account description"
}

returns {
  202: CreateAccountResponse "Account creation initiated"
}

type CreateAccountResponse {
  ...PushOperation
  data?: Account "Created account data when immediately available"
}
```

---

## Field Name Syntax

Field names in OMG objects are written as unquoted identifiers:

```oal
{
  id: string,
  name: string @maxLength(200),
  isActive: boolean
}
```

Quoted field names are also accepted for backwards compatibility, but unquoted is preferred:

```oal
// Preferred
{ id: string, name: string }

// Also valid (backwards compatible)
{ "id": string, "name": string }
```

---

## Grammar (BNF)

```bnf
<document>     ::= <header>? <import>* <declaration>*
<header>       ::= "#" <text> <metadata>* <prose>?
<metadata>     ::= <key> ":" <value>
<import>       ::= "import" <import-spec>
<declaration>  ::= <type-decl> | <endpoint-decl> | <defaults-decl>

<type-decl>    ::= "type" <identifier> <type-params>? <type-body>
<type-body>    ::= "=" <type-expr> | "{" <field>* "}"
<type-expr>    ::= <primitive> | <identifier> | <enum-expr> | <union-expr>
<field>        ::= <annotation>* <field-name> <optional>? ":" <type-expr> <default>? <description>?
<field-name>   ::= <identifier> | <string>

<endpoint-decl> ::= "##" <text> <code-block> <prose>? <endpoint-body>
<code-block>    ::= "```http" <method> <path> "```"
<endpoint-body> ::= <path-params>? <query-params>? <headers>? <body>? <returns>?

<annotation>   ::= "@" <identifier> <args>?
<args>         ::= "(" <value> ("," <value>)* ")"
```
