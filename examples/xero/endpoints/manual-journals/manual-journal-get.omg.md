---
method: GET
path: /ManualJournals/{ManualJournalID}
operationId: getManualJournal
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves a specific manual journal

```omg.path
{
  ManualJournalID: uuid  // Unique identifier for a ManualJournal
}
```

```omg.response
ManualJournals
```

{{> headers/xero-tenant-id }}
