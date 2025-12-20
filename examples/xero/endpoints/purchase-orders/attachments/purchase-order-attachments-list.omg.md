---
method: GET
path: /PurchaseOrders/{PurchaseOrderID}/Attachments
operationId: getPurchaseOrderAttachments
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves attachments for a specific purchase order

```omg.path
{
  PurchaseOrderID: uuid  // Unique identifier for an Purchase Order
}
```

```omg.response
Attachments
```

{{> headers/xero-tenant-id }}
