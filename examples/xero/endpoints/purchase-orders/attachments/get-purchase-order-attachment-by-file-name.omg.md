---
method: GET
path: /PurchaseOrders/{PurchaseOrderID}/Attachments/{FileName}
operationId: getPurchaseOrderAttachmentByFileName
tags:
  - Accounting
summary: Retrieves a specific attachment for a specific purchase order by filename
---

# Retrieves a specific attachment for a specific purchase order by filename

```omg.path
{
  PurchaseOrderID: uuid  // Unique identifier for an Purchase Order
  FileName: string  // Name of the attachment
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
