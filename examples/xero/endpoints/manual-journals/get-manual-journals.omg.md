---
method: GET
path: /ManualJournals
operationId: getManualJournals
tags:
  - Accounting
summary: Retrieves manual journals
---

# Retrieves manual journals

```omg.query
{
  where?: string  // Filter by an any element
  order?: string  // Order by an any element
  page?: integer  // e.g. page=1 – Up to 100 manual journals will be returned in a single API call with line items shown for each overpayment
  pageSize?: integer  // Number of records to retrieve per page
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "If-Modified-Since"?: datetime  // Only records created or modified since this timestamp will be returned
}
```

```omg.response
ManualJournals
```
