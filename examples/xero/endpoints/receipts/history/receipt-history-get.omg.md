---
method: GET
path: /Receipts/{ReceiptID}/History
operationId: getReceiptHistory
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves a history record for a specific receipt

```omg.path
{
  ReceiptID: uuid  // Unique identifier for a Receipt
}
```

```omg.response
HistoryRecords
```

{{> headers/xero-tenant-id }}
