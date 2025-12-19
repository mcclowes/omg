---
method: GET
path: /Prepayments
operationId: getPrepayments
tags:
  - Accounting
summary: Retrieves prepayments
---

# Retrieves prepayments

```omg.query
{
  where?: string  // Filter by an any element
  order?: string  // Order by an any element
  page?: integer  // e.g. page=1 – Up to 100 prepayments will be returned in a single API call with line items shown for each overpayment
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
Prepayments
```
