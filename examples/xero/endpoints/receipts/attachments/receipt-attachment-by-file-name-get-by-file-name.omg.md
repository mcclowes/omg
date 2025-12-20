---
method: GET
path: /Receipts/{ReceiptID}/Attachments/{FileName}
operationId: getReceiptAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves a specific attachment from a specific expense claim receipts by file name

```omg.path
{
  ReceiptID: uuid  // Unique identifier for a Receipt
  FileName: string  // Name of the attachment
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}

{{> headers/content-type }}
