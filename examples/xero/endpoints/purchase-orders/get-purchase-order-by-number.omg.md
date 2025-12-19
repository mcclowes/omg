---
method: GET
path: /PurchaseOrders/{PurchaseOrderNumber}
operationId: getPurchaseOrderByNumber
tags:
  - Accounting
summary: Retrieves a specific purchase order using purchase order number
---

# Retrieves a specific purchase order using purchase order number

```omg.path
{
  PurchaseOrderNumber: string  // Unique identifier for a PurchaseOrder
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
