---
method: GET
path: /PurchaseOrders/{PurchaseOrderID}/Attachments/{AttachmentID}
operationId: getPurchaseOrderAttachmentById
tags:
  - Accounting
summary: Retrieves specific attachment for a specific purchase order using a unique attachment Id
---

# Retrieves specific attachment for a specific purchase order using a unique attachment Id

```omg.path
{
  PurchaseOrderID: uuid  // Unique identifier for an Purchase Order
  AttachmentID: uuid  // Unique identifier for Attachment object
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  contentType: string  // The mime type of the attachment file you are retrieving i.e image/jpg, application/pdf
}
```

```omg.response
string @format("binary")
```
