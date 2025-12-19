---
method: GET
path: /ManualJournals/{ManualJournalID}/History
operationId: getManualJournalsHistory
tags:
  - Accounting
summary: Retrieves history for a specific manual journal
---

# Retrieves history for a specific manual journal

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
HistoryRecords
```
