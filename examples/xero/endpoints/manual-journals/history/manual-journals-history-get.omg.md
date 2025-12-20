---
method: GET
path: /ManualJournals/{ManualJournalID}/History
operationId: getManualJournalsHistory
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves history for a specific manual journal

```omg.path
{
  ManualJournalID: uuid  // Unique identifier for a ManualJournal
}
```

```omg.response
HistoryRecords
```

{{> headers/xero-tenant-id }}
