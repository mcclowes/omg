---
method: GET
path: /CreditNotes/{CreditNoteID}/Attachments/{AttachmentID}
operationId: getCreditNoteAttachmentById
tags:
  - Accounting
summary: Retrieves a specific attachment from a specific credit note using a unique attachment Id
---

# Retrieves a specific attachment from a specific credit note using a unique attachment Id

```omg.path
{
  CreditNoteID: uuid  // Unique identifier for a Credit Note
  AttachmentID: uuid  // Unique identifier for Attachment object
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
