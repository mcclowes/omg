---
method: GET
path: /Accounts/{AccountID}/Attachments/{FileName}
operationId: getAccountAttachmentByFileName
tags:
  - Accounting
summary: Retrieves an attachment for a specific account by filename
---

# Retrieves an attachment for a specific account by filename

```omg.path
{
  AccountID: uuid  // Unique identifier for Account object
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
