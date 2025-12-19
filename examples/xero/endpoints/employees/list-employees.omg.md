---
method: GET
path: /Employees
operationId: getEmployees
tags:
  - Accounting
deprecated: true
summary: Retrieves employees used in Xero payrun
---

# Retrieves employees used in Xero payrun

This endpoint is deprecated and will be removed April 28, 2026

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
Employees
```
