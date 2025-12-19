---
method: GET
path: /ManualJournals/{ManualJournalID}/Attachments
operationId: getManualJournalAttachments
tags:
  - Accounting
summary: Retrieves attachment for a specific manual journal
---

# Retrieves attachment for a specific manual journal

```omg.path
{
  ManualJournalID: uuid  // Unique identifier for a ManualJournal
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
Attachments
```
