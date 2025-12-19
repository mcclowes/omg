---
method: GET
path: /Journals
operationId: getJournals
tags:
  - Accounting
summary: Retrieves journals
---

# Retrieves journals

```omg.query
{
  offset?: integer  // Offset by a specified journal number. e.g. journals with a JournalNumber greater than the offset will be returned
  paymentsOnly?: boolean  // Filter to retrieve journals on a cash basis. Journals are returned on an accrual basis by default.
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "If-Modified-Since"?: datetime  // Only records created or modified since this timestamp will be returned
}
```

```omg.response
Journals
```
