---
method: PUT
path: /Payments/{PaymentID}/History
operationId: createPaymentHistory
tags:
  - Accounting
summary: Creates a history record for a specific payment
---

# Creates a history record for a specific payment

```omg.path
{
  PaymentID: uuid  // Unique identifier for a Payment
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
