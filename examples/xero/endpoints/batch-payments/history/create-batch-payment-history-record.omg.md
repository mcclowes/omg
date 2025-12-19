---
method: PUT
path: /BatchPayments/{BatchPaymentID}/History
operationId: createBatchPaymentHistoryRecord
tags:
  - Accounting
summary: Creates a history record for a specific batch payment
---

# Creates a history record for a specific batch payment

```omg.path
{
  BatchPaymentID: uuid  // Unique identifier for BatchPayment
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
