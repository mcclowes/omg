---
method: POST
path: /PurchaseOrders/{PurchaseOrderID}/Attachments/{FileName}
operationId: updatePurchaseOrderAttachmentByFileName
tags:
  - Accounting
summary: Updates a specific attachment for a specific purchase order by filename
---

# Updates a specific attachment for a specific purchase order by filename

```omg.path
{
  PurchaseOrderID: uuid  // Unique identifier for an Purchase Order
  FileName: string  // Name of the attachment
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
string @format("byte")
```

```omg.response
Attachments
```

```omg.response.400
Error
```
