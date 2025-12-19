---
method: POST
path: /ExpenseClaims/{ExpenseClaimID}
operationId: updateExpenseClaim
tags:
  - Accounting
summary: Updates a specific expense claims
---

# Updates a specific expense claims

```omg.path
{
  ExpenseClaimID: uuid  // Unique identifier for a ExpenseClaim
}
```

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
