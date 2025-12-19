---
method: GET
path: /Receipts/{ReceiptID}/Attachments/{AttachmentID}
operationId: getReceiptAttachmentById
tags:
  - Accounting
summary: Retrieves a specific attachments from a specific expense claim receipts by using a unique attachment Id
---

# Retrieves a specific attachments from a specific expense claim receipts by using a unique attachment Id

```omg.path
{
  ReceiptID: uuid  // Unique identifier for a Receipt
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
