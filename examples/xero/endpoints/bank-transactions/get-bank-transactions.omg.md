---
method: GET
path: /BankTransactions
operationId: getBankTransactions
tags:
  - Accounting
summary: Retrieves any spent or received money transactions
---

# Retrieves any spent or received money transactions

```omg.query
{
  where?: string  // Filter by an any element
  order?: string  // Order by an any element
  page?: integer  // Up to 100 bank transactions will be returned in a single API call with line items details
  unitdp?: integer  // e.g. unitdp=4 – (Unit Decimal Places) You can opt in to use four decimal places for unit amounts
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
BankTransactions
```
