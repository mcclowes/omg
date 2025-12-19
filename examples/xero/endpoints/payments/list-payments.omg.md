---
method: GET
path: /Payments
operationId: getPayments
tags:
  - Accounting
summary: Retrieves payments for invoices and credit notes
---

# Retrieves payments for invoices and credit notes

```omg.query
{
  where?: string  // Filter by an any element
  order?: string  // Order by an any element
  page?: integer  // Up to 100 payments will be returned in a single API call
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
Payments
```
