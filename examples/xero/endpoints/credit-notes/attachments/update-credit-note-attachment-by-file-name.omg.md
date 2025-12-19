---
method: POST
path: /CreditNotes/{CreditNoteID}/Attachments/{FileName}
operationId: updateCreditNoteAttachmentByFileName
tags:
  - Accounting
summary: Updates attachments on a specific credit note by file name
---

# Updates attachments on a specific credit note by file name

```omg.path
{
  CreditNoteID: uuid  // Unique identifier for a Credit Note
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
