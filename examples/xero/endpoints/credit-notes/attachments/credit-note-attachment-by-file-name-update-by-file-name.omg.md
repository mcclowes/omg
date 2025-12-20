---
method: POST
path: /CreditNotes/{CreditNoteID}/Attachments/{FileName}
operationId: updateCreditNoteAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
extensions:
  x-hasAccountingValidationError: true
---

# Updates attachments on a specific credit note by file name

```omg.path
{
  CreditNoteID: uuid  // Unique identifier for a Credit Note
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
