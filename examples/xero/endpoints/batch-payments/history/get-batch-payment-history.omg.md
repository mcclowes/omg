---
method: GET
path: /BatchPayments/{BatchPaymentID}/History
operationId: getBatchPaymentHistory
tags:
  - Accounting
summary: Retrieves history from a specific batch payment
---

# Retrieves history from a specific batch payment

```omg.path
{
  BatchPaymentID: uuid  // Unique identifier for BatchPayment
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
