---
method: GET
path: /ExpenseClaims/{ExpenseClaimID}/History
operationId: getExpenseClaimHistory
tags:
  - Accounting
summary: Retrieves history records of a specific expense claim
---

# Retrieves history records of a specific expense claim

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
HistoryRecords
```
