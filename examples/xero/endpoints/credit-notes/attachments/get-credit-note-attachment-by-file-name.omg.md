---
method: GET
path: /CreditNotes/{CreditNoteID}/Attachments/{FileName}
operationId: getCreditNoteAttachmentByFileName
tags:
  - Accounting
summary: Retrieves a specific attachment on a specific credit note by file name
---

# Retrieves a specific attachment on a specific credit note by file name

```omg.path
{
  CreditNoteID: uuid  // Unique identifier for a Credit Note
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
