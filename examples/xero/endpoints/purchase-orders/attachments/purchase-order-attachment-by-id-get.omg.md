---
method: GET
path: /PurchaseOrders/{PurchaseOrderID}/Attachments/{AttachmentID}
operationId: getPurchaseOrderAttachmentById
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves specific attachment for a specific purchase order using a unique attachment Id

```omg.path
{
  PurchaseOrderID: uuid  // Unique identifier for an Purchase Order
  AttachmentID: uuid  // Unique identifier for Attachment object
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}

{{> headers/content-type }}
