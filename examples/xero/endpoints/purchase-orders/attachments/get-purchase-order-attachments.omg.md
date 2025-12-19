---
method: GET
path: /PurchaseOrders/{PurchaseOrderID}/Attachments
operationId: getPurchaseOrderAttachments
tags:
  - Accounting
summary: Retrieves attachments for a specific purchase order
---

# Retrieves attachments for a specific purchase order

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
Attachments
```
