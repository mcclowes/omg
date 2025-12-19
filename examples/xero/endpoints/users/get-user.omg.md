---
method: GET
path: /Users/{UserID}
operationId: getUser
tags:
  - Accounting
summary: Retrieves a specific user
---

# Retrieves a specific user

```omg.path
{
  UserID: uuid  // Unique identifier for a User
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
Users
```
