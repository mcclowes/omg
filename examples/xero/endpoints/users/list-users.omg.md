---
method: GET
path: /Users
operationId: getUsers
tags:
  - Accounting
summary: Retrieves users
---

# Retrieves users

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
Users
```
