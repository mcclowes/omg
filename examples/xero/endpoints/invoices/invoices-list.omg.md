---
method: GET
path: /Invoices
operationId: getInvoices
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves sales invoices or purchase bills

```omg.query
{
  IDs?: uuid[]  // Filter by a comma-separated list of InvoicesIDs.
  InvoiceNumbers?: string[]  // Filter by a comma-separated list of InvoiceNumbers.
  ContactIDs?: uuid[]  // Filter by a comma-separated list of ContactIDs.
  Statuses?: string[]  // Filter by a comma-separated list Statuses. For faster response times we recommend using these explicit parameters instead of passing OR conditions into the Where filter.
  createdByMyApp?: boolean  // When set to true you'll only retrieve Invoices created by your app
  summaryOnly?: boolean @default(false)  // Use summaryOnly=true in GET Contacts and Invoices endpoint to retrieve a smaller version of the response object. This returns only lightweight fields, excluding computation-heavy fields from the response, making the API calls quick and efficient.
  searchTerm?: string  // Search parameter that performs a case-insensitive text search across the fields e.g. InvoiceNumber, Reference.
}
```

```omg.response
Invoices
```

{{> query/where }}

{{> query/order }}

{{> query/page }}

{{> query/include-archived }}

{{> query/unitdp }}

{{> query/page-size }}

{{> headers/xero-tenant-id }}

{{> headers/if-modified-since }}
