---
method: POST
path: /PurchaseOrders/{PurchaseOrderID}
operationId: updatePurchaseOrder
tags:
  - Accounting
summary: Updates a specific purchase order
---

# Updates a specific purchase order

```omg.path
{
  PurchaseOrderID: uuid  // Unique identifier for an Purchase Order
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
PurchaseOrders
```

```omg.response
PurchaseOrders
```

```omg.response.400
Error
```
