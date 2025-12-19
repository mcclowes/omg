---
method: GET
path: /PurchaseOrders/{PurchaseOrderID}/History
operationId: getPurchaseOrderHistory
tags:
  - Accounting
summary: Retrieves history for a specific purchase order
---

# Retrieves history for a specific purchase order

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
HistoryRecords
```
