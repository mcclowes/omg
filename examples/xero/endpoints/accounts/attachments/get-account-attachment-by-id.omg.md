---
method: GET
path: /Accounts/{AccountID}/Attachments/{AttachmentID}
operationId: getAccountAttachmentById
tags:
  - Accounting
summary: Retrieves a specific attachment from a specific account using a unique attachment Id
---

# Retrieves a specific attachment from a specific account using a unique attachment Id

```omg.path
{
  AccountID: uuid  // Unique identifier for Account object
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
