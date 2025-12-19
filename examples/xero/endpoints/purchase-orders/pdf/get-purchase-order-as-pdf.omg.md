---
method: GET
path: /PurchaseOrders/{PurchaseOrderID}/pdf
operationId: getPurchaseOrderAsPdf
tags:
  - Accounting
summary: Retrieves specific purchase order as PDF files using a unique purchase order Id
---

# Retrieves specific purchase order as PDF files using a unique purchase order Id

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
string @format("binary")
```
