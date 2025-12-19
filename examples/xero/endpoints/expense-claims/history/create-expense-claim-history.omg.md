---
method: PUT
path: /ExpenseClaims/{ExpenseClaimID}/History
operationId: createExpenseClaimHistory
tags:
  - Accounting
summary: Creates a history record for a specific expense claim
---

# Creates a history record for a specific expense claim

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
HistoryRecords
```

```omg.response
HistoryRecords
```
