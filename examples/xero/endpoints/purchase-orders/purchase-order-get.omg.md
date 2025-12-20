---
method: GET
path: /PurchaseOrders/{PurchaseOrderID}
operationId: getPurchaseOrder
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves a specific purchase order using a unique purchase order Id

```omg.path
{
  PurchaseOrderID: uuid  // Unique identifier for an Purchase Order
}
```

```omg.response
PurchaseOrders
```

{{> headers/xero-tenant-id }}
