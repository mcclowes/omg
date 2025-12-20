---
method: GET
path: /Accounts/{AccountID}/Attachments/{AttachmentID}
operationId: getAccountAttachmentById
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves a specific attachment from a specific account using a unique attachment Id

```omg.path
{
  AccountID: uuid  // Unique identifier for Account object
  AttachmentID: uuid  // Unique identifier for Attachment object
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}

{{> headers/content-type }}
