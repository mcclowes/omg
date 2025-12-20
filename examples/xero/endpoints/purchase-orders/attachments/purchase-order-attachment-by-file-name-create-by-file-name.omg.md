---
method: PUT
path: /PurchaseOrders/{PurchaseOrderID}/Attachments/{FileName}
operationId: createPurchaseOrderAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
extensions:
  x-hasAccountingValidationError: true
---

# Creates attachment for a specific purchase order

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
