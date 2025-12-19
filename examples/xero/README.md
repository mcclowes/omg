# Xero Accounting API Example

This example demonstrates a large-scale OMG specification converted from the [Xero Accounting API](https://developer.xero.com/documentation/api/accounting/overview) OpenAPI specification.

## Overview

- **374 endpoints** across 32 resource categories
- **136 type definitions** for request/response schemas
- Covers accounts, invoices, contacts, payments, and more

## Structure

```
xero/
├── api.omg.md              # API root with metadata
├── endpoints/              # Endpoint definitions by resource
│   ├── accounts/
│   ├── invoices/
│   ├── contacts/
│   ├── payments/
│   └── ...                 # 32 resource categories
└── types/                  # Shared type definitions
    ├── invoice.omg.md
    ├── contact.omg.md
    └── ...                 # 136 types
```

## Building

```bash
# From the repository root
npm run build
node packages/omg-md-cli/dist/cli.js build examples/xero/api.omg.md -o xero_accounting.yaml
```

## Key patterns demonstrated

### Type references

Endpoints reference shared types instead of inline definitions:

```markdown
```omg.response
Invoices
```
```

### Required headers

All endpoints require the `xero-tenant-id` header:

```markdown
```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```
```

### Nested resources

Sub-resources use nested directory structures:

```
endpoints/invoices/
├── create-invoices.omg.md
├── get-invoice.omg.md
├── attachments/
│   └── get-invoice-attachments.omg.md
├── history/
│   └── get-invoice-history.omg.md
└── pdf/
    └── get-invoice-as-pdf.omg.md
```

### Complex types with enums and constraints

```markdown
```omg.type
type Invoice = {
  Type?: "ACCPAY" | "ACCREC" | ...
  InvoiceNumber?: string @maxLength(255)
  CurrencyRate?: number @format("double")
  Status?: "DRAFT" | "SUBMITTED" | "AUTHORISED" | "PAID" | ...
}
```
```

## Source

Converted from the official Xero Accounting API OpenAPI specification (v10.0.0).
