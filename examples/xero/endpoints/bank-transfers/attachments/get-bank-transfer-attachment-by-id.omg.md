---
method: GET
path: /BankTransfers/{BankTransferID}/Attachments/{AttachmentID}
operationId: getBankTransferAttachmentById
tags:
  - Accounting
summary: Retrieves a specific attachment from a specific bank transfer using a unique attachment ID
---

# Retrieves a specific attachment from a specific bank transfer using a unique attachment ID

```omg.path
{
  BankTransferID: uuid  // Xero generated unique identifier for a bank transfer
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
