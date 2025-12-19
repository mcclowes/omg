---
method: GET
path: /Invoices/{InvoiceID}/History
operationId: getInvoiceHistory
tags:
  - Accounting
summary: Retrieves history records for a specific invoice
---

# Retrieves history records for a specific invoice

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
HistoryRecords
```
