---
method: GET
path: /ManualJournals/{ManualJournalID}/Attachments/{FileName}
operationId: getManualJournalAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves a specific attachment from a specific manual journal by file name

```omg.path
{
  ManualJournalID: uuid  // Unique identifier for a ManualJournal
  FileName: string  // Name of the attachment
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}

{{> headers/content-type }}
