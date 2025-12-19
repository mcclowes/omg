---
method: GET
path: /Accounts/{AccountID}
operationId: getAccount
tags:
  - Accounting
summary: Retrieves a single chart of accounts by using a unique account Id
---

# Retrieves a single chart of accounts by using a unique account Id

```omg.path
{
  AccountID: uuid  // Unique identifier for Account object
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
Accounts
```
