---
method: POST
path: /ManualJournals/{ManualJournalID}
operationId: updateManualJournal
tags:
  - Accounting
summary: Updates a specific manual journal
---

# Updates a specific manual journal

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
ManualJournals
```

```omg.response
ManualJournals
```

```omg.response.400
Error
```
