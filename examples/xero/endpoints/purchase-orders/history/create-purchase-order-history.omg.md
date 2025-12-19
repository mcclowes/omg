---
method: PUT
path: /PurchaseOrders/{PurchaseOrderID}/History
operationId: createPurchaseOrderHistory
tags:
  - Accounting
summary: Creates a history record for a specific purchase orders
---

# Creates a history record for a specific purchase orders

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
HistoryRecords
```

```omg.response
HistoryRecords
```

```omg.response.400
Error
```
