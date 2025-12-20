---
method: GET
path: /PurchaseOrders/{PurchaseOrderID}/Attachments/{FileName}
operationId: getPurchaseOrderAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves a specific attachment for a specific purchase order by filename

```omg.path
{
  PurchaseOrderID: uuid  // Unique identifier for an Purchase Order
  FileName: string  // Name of the attachment
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}

{{> headers/content-type }}
