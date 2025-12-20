---
method: GET
path: /ManualJournals/{ManualJournalID}/Attachments
operationId: getManualJournalAttachments
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves attachment for a specific manual journal

```omg.path
{
  ManualJournalID: uuid  // Unique identifier for a ManualJournal
}
```

```omg.response
Attachments
```

{{> headers/xero-tenant-id }}
