---
method: GET
path: /Receipts/{ReceiptID}/Attachments/{FileName}
operationId: getReceiptAttachmentByFileName
tags:
  - Accounting
summary: Retrieves a specific attachment from a specific expense claim receipts by file name
---

# Retrieves a specific attachment from a specific expense claim receipts by file name

```omg.path
{
  ReceiptID: uuid  // Unique identifier for a Receipt
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
