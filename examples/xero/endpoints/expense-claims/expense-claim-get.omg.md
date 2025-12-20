---
method: GET
path: /ExpenseClaims/{ExpenseClaimID}
operationId: getExpenseClaim
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves a specific expense claim using a unique expense claim Id

```omg.path
{
  ExpenseClaimID: uuid  // Unique identifier for a ExpenseClaim
}
```

```omg.response
ExpenseClaims
```

{{> headers/xero-tenant-id }}
