---
method: GET
path: /BatchPayments
operationId: getBatchPayments
tags:
  - Accounting
summary: Retrieves either one or many batch payments for invoices
---

# Retrieves either one or many batch payments for invoices

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
BatchPayments
```
