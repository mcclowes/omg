---
method: GET
path: /Receipts/{ReceiptID}/Attachments
operationId: getReceiptAttachments
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves attachments for a specific expense claim receipt

```omg.path
{
  ReceiptID: uuid  // Unique identifier for a Receipt
}
```

```omg.response
Attachments
```

{{> headers/xero-tenant-id }}
