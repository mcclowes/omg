---
method: POST
path: /ManualJournals/{ManualJournalID}/Attachments/{FileName}
operationId: updateManualJournalAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
extensions:
  x-hasAccountingValidationError: true
---

# Updates a specific attachment from a specific manual journal by file name

```omg.path
{
  ManualJournalID: uuid  // Unique identifier for a ManualJournal
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
