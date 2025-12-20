---
method: GET
path: /BankTransfers/{BankTransferID}/Attachments/{AttachmentID}
operationId: getBankTransferAttachmentById
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves a specific attachment from a specific bank transfer using a unique attachment ID

```omg.path
{
  BankTransferID: uuid  // Xero generated unique identifier for a bank transfer
  AttachmentID: uuid  // Unique identifier for Attachment object
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}

{{> headers/content-type }}
