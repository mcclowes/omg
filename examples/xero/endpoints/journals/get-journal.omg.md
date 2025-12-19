---
method: GET
path: /Journals/{JournalID}
operationId: getJournal
tags:
  - Accounting
summary: Retrieves a specific journal using a unique journal Id.
---

# Retrieves a specific journal using a unique journal Id.

```omg.path
{
  JournalID: uuid  // Unique identifier for a Journal
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
Journals
```
