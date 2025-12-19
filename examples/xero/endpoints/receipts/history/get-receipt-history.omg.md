---
method: GET
path: /Receipts/{ReceiptID}/History
operationId: getReceiptHistory
tags:
  - Accounting
summary: Retrieves a history record for a specific receipt
---

# Retrieves a history record for a specific receipt

```omg.path
{
  ReceiptID: uuid  // Unique identifier for a Receipt
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
