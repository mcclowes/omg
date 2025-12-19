---
method: PUT
path: /CreditNotes/{CreditNoteID}/Attachments/{FileName}
operationId: createCreditNoteAttachmentByFileName
tags:
  - Accounting
summary: Creates an attachment for a specific credit note
---

# Creates an attachment for a specific credit note

```omg.path
{
  CreditNoteID: uuid  // Unique identifier for a Credit Note
  FileName: string  // Name of the attachment
}
```

```omg.query
{
  IncludeOnline?: boolean @default(false)  // Allows an attachment to be seen by the end customer within their online invoice
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
