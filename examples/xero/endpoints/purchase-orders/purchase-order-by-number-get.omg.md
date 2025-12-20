---
method: GET
path: /PurchaseOrders/{PurchaseOrderNumber}
operationId: getPurchaseOrderByNumber
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves a specific purchase order using purchase order number

```omg.path
{
  PurchaseOrderNumber: string  // Unique identifier for a PurchaseOrder
}
```

```omg.response
PurchaseOrders
```

{{> headers/xero-tenant-id }}
