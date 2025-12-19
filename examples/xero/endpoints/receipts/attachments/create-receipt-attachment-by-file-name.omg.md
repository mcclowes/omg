---
method: PUT
path: /Receipts/{ReceiptID}/Attachments/{FileName}
operationId: createReceiptAttachmentByFileName
tags:
  - Accounting
summary: Creates an attachment on a specific expense claim receipts by file name
---

# Creates an attachment on a specific expense claim receipts by file name

```omg.path
{
  ReceiptID: uuid  // Unique identifier for a Receipt
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
