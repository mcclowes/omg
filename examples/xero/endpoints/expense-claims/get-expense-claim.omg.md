---
method: GET
path: /ExpenseClaims/{ExpenseClaimID}
operationId: getExpenseClaim
tags:
  - Accounting
summary: Retrieves a specific expense claim using a unique expense claim Id
---

# Retrieves a specific expense claim using a unique expense claim Id

```omg.path
{
  ExpenseClaimID: uuid  // Unique identifier for a ExpenseClaim
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
ExpenseClaims
```
