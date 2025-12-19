---
method: GET
path: /Receipts
operationId: getReceipts
tags:
  - Accounting
summary: Retrieves draft expense claim receipts for any user
---

# Retrieves draft expense claim receipts for any user

```omg.query
{
  where?: string  // Filter by an any element
  order?: string  // Order by an any element
  unitdp?: integer  // e.g. unitdp=4 – (Unit Decimal Places) You can opt in to use four decimal places for unit amounts
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "If-Modified-Since"?: datetime  // Only records created or modified since this timestamp will be returned
}
```

```omg.response
Receipts
```
