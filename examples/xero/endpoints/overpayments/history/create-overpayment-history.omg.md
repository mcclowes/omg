---
method: PUT
path: /Overpayments/{OverpaymentID}/History
operationId: createOverpaymentHistory
tags:
  - Accounting
summary: Creates a history record for a specific overpayment
---

# Creates a history record for a specific overpayment

```omg.path
{
  OverpaymentID: uuid  // Unique identifier for a Overpayment
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
