---
method: PUT
path: /Receipts/{ReceiptID}/History
operationId: createReceiptHistory
tags:
  - Accounting
summary: Creates a history record for a specific receipt
---

# Creates a history record for a specific receipt

```omg.path
{
  ReceiptID: uuid  // Unique identifier for a Receipt
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
