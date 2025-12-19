---
method: GET
path: /BankTransfers
operationId: getBankTransfers
tags:
  - Accounting
summary: Retrieves all bank transfers
---

# Retrieves all bank transfers

```omg.query
{
  where?: string  // Filter by an any element
  order?: string  // Order by an any element
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "If-Modified-Since"?: datetime  // Only records created or modified since this timestamp will be returned
}
```

```omg.response
BankTransfers
```
