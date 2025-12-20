---
method: GET
path: /CreditNotes/{CreditNoteID}/Attachments/{AttachmentID}
operationId: getCreditNoteAttachmentById
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves a specific attachment from a specific credit note using a unique attachment Id

```omg.path
{
  CreditNoteID: uuid  // Unique identifier for a Credit Note
  AttachmentID: uuid  // Unique identifier for Attachment object
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}

{{> headers/content-type }}
