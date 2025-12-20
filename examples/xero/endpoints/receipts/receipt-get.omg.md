---
method: GET
path: /Receipts/{ReceiptID}
operationId: getReceipt
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves a specific draft expense claim receipt by using a unique receipt Id

```omg.path
{
  ReceiptID: uuid  // Unique identifier for a Receipt
}
```

```omg.response
Receipts
```

{{> query/unitdp }}

{{> headers/xero-tenant-id }}
