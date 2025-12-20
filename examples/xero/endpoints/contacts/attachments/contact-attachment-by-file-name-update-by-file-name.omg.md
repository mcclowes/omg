---
method: POST
path: /Contacts/{ContactID}/Attachments/{FileName}
operationId: updateContactAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
extensions:
  x-hasAccountingValidationError: true
---

# POST /Contacts/{ContactID}/Attachments/{FileName}

```omg.path
{
  ContactID: uuid  // Unique identifier for a Contact
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
