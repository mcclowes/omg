---
method: POST
path: /PurchaseOrders/{PurchaseOrderID}/Attachments/{FileName}
operationId: updatePurchaseOrderAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
extensions:
  x-hasAccountingValidationError: true
---

# Updates a specific attachment for a specific purchase order by filename

```omg.path
{
  PurchaseOrderID: uuid  // Unique identifier for an Purchase Order
  FileName: string  // Name of the attachment
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

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
