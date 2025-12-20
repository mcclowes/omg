---
method: PUT
path: /Accounts/{AccountID}/Attachments/{FileName}
operationId: createAccountAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
extensions:
  x-hasAccountingValidationError: true
---

# Creates an attachment on a specific account

```omg.path
{
  AccountID: uuid  // Unique identifier for Account object
  FileName: string  // Name of the attachment
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

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
