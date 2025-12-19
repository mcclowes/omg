---
method: POST
path: /Contacts/{ContactID}/Attachments/{FileName}
operationId: updateContactAttachmentByFileName
tags:
  - Accounting
---

# POST /Contacts/{ContactID}/Attachments/{FileName}

```omg.path
{
  ContactID: uuid  // Unique identifier for a Contact
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
