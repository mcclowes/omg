---
method: GET
path: /ManualJournals/{ManualJournalID}
operationId: getManualJournal
tags:
  - Accounting
summary: Retrieves a specific manual journal
---

# Retrieves a specific manual journal

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
ManualJournals
```
