---
method: DELETE
path: /Accounts/{AccountID}
operationId: deleteAccount
tags:
  - Accounting
summary: Deletes a chart of accounts
---

# Deletes a chart of accounts

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

```omg.response.400
Error
```
