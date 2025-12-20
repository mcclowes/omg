---
method: GET
path: /Receipts/{ReceiptID}/Attachments/{AttachmentID}
operationId: getReceiptAttachmentById
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves a specific attachments from a specific expense claim receipts by using a unique attachment Id

```omg.path
{
  ReceiptID: uuid  // Unique identifier for a Receipt
  AttachmentID: uuid  // Unique identifier for Attachment object
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}

{{> headers/content-type }}
