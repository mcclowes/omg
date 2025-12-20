---
method: GET
path: /PurchaseOrders/{PurchaseOrderID}/History
operationId: getPurchaseOrderHistory
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves history for a specific purchase order

```omg.path
{
  PurchaseOrderID: uuid  // Unique identifier for an Purchase Order
}
```

```omg.response
HistoryRecords
```

{{> headers/xero-tenant-id }}
