---
method: POST
path: /Accounts/{AccountID}/Attachments/{FileName}
operationId: updateAccountAttachmentByFileName
tags:
  - Accounting
summary: Updates attachment on a specific account by filename
---

# Updates attachment on a specific account by filename

```omg.path
{
  AccountID: uuid  // Unique identifier for Account object
  FileName: string  // Name of the attachment
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
string @format("byte")
```

```omg.response
Attachments
```

```omg.response.400
Error
```
