---
method: GET
path: /Journals/{JournalNumber}
operationId: getJournalByNumber
tags:
  - Accounting
summary: Retrieves a specific journal using a unique journal number.
---

# Retrieves a specific journal using a unique journal number.

```omg.path
{
  JournalNumber: integer  // Number of a Journal
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
