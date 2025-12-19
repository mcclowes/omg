---
method: PUT
path: /ManualJournals/{ManualJournalID}/History
operationId: createManualJournalHistoryRecord
tags:
  - Accounting
summary: Creates a history record for a specific manual journal
---

# Creates a history record for a specific manual journal

```omg.path
{
  ManualJournalID: uuid  // Unique identifier for a ManualJournal
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
HistoryRecords
```

```omg.response
HistoryRecords
```

```omg.response.400
Error
```
