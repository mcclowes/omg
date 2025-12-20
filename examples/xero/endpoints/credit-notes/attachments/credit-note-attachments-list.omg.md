---
method: GET
path: /CreditNotes/{CreditNoteID}/Attachments
operationId: getCreditNoteAttachments
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves attachments for a specific credit notes

```omg.path
{
  CreditNoteID: uuid  // Unique identifier for a Credit Note
}
```

```omg.response
Attachments
```

{{> headers/xero-tenant-id }}
