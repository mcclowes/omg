---
method: GET
path: /ExpenseClaims/{ExpenseClaimID}/History
operationId: getExpenseClaimHistory
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves history records of a specific expense claim

```omg.path
{
  ExpenseClaimID: uuid  // Unique identifier for a ExpenseClaim
}
```

```omg.response
HistoryRecords
```

{{> headers/xero-tenant-id }}
