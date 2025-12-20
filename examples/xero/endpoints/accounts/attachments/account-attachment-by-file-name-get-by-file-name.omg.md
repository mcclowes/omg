---
method: GET
path: /Accounts/{AccountID}/Attachments/{FileName}
operationId: getAccountAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves an attachment for a specific account by filename

```omg.path
{
  AccountID: uuid  // Unique identifier for Account object
  FileName: string  // Name of the attachment
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}

{{> headers/content-type }}
