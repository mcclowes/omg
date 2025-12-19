---
method: POST
path: /Accounts/{AccountID}
operationId: updateAccount
tags:
  - Accounting
summary: Updates a chart of accounts
---

# Updates a chart of accounts

```omg.path
{
  AccountID: uuid  // Unique identifier for Account object
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
Accounts
```

```omg.response
Accounts
```

```omg.response.400
Error
```
