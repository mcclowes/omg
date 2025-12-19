---
method: PUT
path: /ExpenseClaims
operationId: createExpenseClaims
tags:
  - Accounting
summary: Creates expense claims
---

# Creates expense claims

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
ExpenseClaims
```

```omg.response
ExpenseClaims
```

```omg.response.400
Error
```
