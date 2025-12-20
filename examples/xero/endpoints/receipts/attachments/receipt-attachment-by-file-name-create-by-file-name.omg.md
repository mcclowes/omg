---
method: PUT
path: /Receipts/{ReceiptID}/Attachments/{FileName}
operationId: createReceiptAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
extensions:
  x-hasAccountingValidationError: true
---

# Creates an attachment on a specific expense claim receipts by file name

```omg.path
{
  ReceiptID: uuid  // Unique identifier for a Receipt
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
