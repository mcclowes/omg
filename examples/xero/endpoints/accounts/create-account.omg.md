---
method: PUT
path: /Accounts
operationId: createAccount
tags:
  - Accounting
summary: Creates a new chart of accounts
---

# Creates a new chart of accounts

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
Account
```

```omg.response
Accounts
```

```omg.response.400
Error
```
