---
method: GET
path: /Invoices
operationId: getInvoices
tags:
  - Accounting
summary: Retrieves sales invoices or purchase bills
---

# Retrieves sales invoices or purchase bills

```omg.query
{
  where?: string  // Filter by an any element
  order?: string  // Order by an any element
  IDs?: uuid[]  // Filter by a comma-separated list of InvoicesIDs.
  InvoiceNumbers?: string[]  // Filter by a comma-separated list of InvoiceNumbers.
  ContactIDs?: uuid[]  // Filter by a comma-separated list of ContactIDs.
  Statuses?: string[]  // Filter by a comma-separated list Statuses. For faster response times we recommend using these explicit parameters instead of passing OR conditions into the Where filter.
  page?: integer  // e.g. page=1 – Up to 100 invoices will be returned in a single API call with line items shown for each invoice
  includeArchived?: boolean  // e.g. includeArchived=true - Invoices with a status of ARCHIVED will be included in the response
  createdByMyApp?: boolean  // When set to true you'll only retrieve Invoices created by your app
  unitdp?: integer  // e.g. unitdp=4 – (Unit Decimal Places) You can opt in to use four decimal places for unit amounts
  summaryOnly?: boolean @default(false)  // Use summaryOnly=true in GET Contacts and Invoices endpoint to retrieve a smaller version of the response object. This returns only lightweight fields, excluding computation-heavy fields from the response, making the API calls quick and efficient.
  pageSize?: integer  // Number of records to retrieve per page
  searchTerm?: string  // Search parameter that performs a case-insensitive text search across the fields e.g. InvoiceNumber, Reference.
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "If-Modified-Since"?: datetime  // Only records created or modified since this timestamp will be returned
}
```

```omg.response
Invoices
```
