---
method: PUT
path: /Prepayments/{PrepaymentID}/History
operationId: createPrepaymentHistory
tags:
  - Accounting
summary: Creates a history record for a specific prepayment
---

# Creates a history record for a specific prepayment

```omg.path
{
  PrepaymentID: uuid  // Unique identifier for a PrePayment
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

```omg.response.400
Error
```
