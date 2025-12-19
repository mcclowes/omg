---
method: POST
path: /Receipts/{ReceiptID}/Attachments/{FileName}
operationId: updateReceiptAttachmentByFileName
tags:
  - Accounting
summary: Updates a specific attachment on a specific expense claim receipts by file name
---

# Updates a specific attachment on a specific expense claim receipts by file name

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
