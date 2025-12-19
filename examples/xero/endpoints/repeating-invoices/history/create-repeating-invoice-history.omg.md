---
method: PUT
path: /RepeatingInvoices/{RepeatingInvoiceID}/History
operationId: createRepeatingInvoiceHistory
tags:
  - Accounting
summary: Creates a  history record for a specific repeating invoice
---

# Creates a  history record for a specific repeating invoice

```omg.path
{
  RepeatingInvoiceID: uuid  // Unique identifier for a Repeating Invoice
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
