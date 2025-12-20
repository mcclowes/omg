---
method: PUT
path: /ManualJournals/{ManualJournalID}/Attachments/{FileName}
operationId: createManualJournalAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
extensions:
  x-hasAccountingValidationError: true
---

# Creates a specific attachment for a specific manual journal by file name

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
