---
method: GET
path: /PurchaseOrders/{PurchaseOrderID}
operationId: getPurchaseOrder
tags:
  - Accounting
summary: Retrieves a specific purchase order using a unique purchase order Id
---

# Retrieves a specific purchase order using a unique purchase order Id

```omg.path
{
  PurchaseOrderID: uuid  // Unique identifier for an Purchase Order
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
PurchaseOrders
```
