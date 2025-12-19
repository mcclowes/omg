---
method: PUT
path: /Invoices/{InvoiceID}/History
operationId: createInvoiceHistory
tags:
  - Accounting
summary: Creates a history record for a specific invoice
---

# Creates a history record for a specific invoice

```omg.path
{
  InvoiceID: uuid  // Unique identifier for an Invoice
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
HistoryRecords
```

```omg.response
HistoryRecords
```

```omg.response.400
Error
```
