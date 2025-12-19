---
method: GET
path: /Invoices/{InvoiceID}/pdf
operationId: getInvoiceAsPdf
tags:
  - Accounting
summary: Retrieves invoices or purchase bills as PDF files
---

# Retrieves invoices or purchase bills as PDF files

```omg.path
{
  InvoiceID: uuid  // Unique identifier for an Invoice
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
string @format("binary")
```
