---
method: GET
path: /CreditNotes/{CreditNoteID}/Attachments/{FileName}
operationId: getCreditNoteAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves a specific attachment on a specific credit note by file name

```omg.path
{
  CreditNoteID: uuid  // Unique identifier for a Credit Note
  FileName: string  // Name of the attachment
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}

{{> headers/content-type }}
