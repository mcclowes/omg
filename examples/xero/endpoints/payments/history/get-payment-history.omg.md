---
method: GET
path: /Payments/{PaymentID}/History
operationId: getPaymentHistory
tags:
  - Accounting
summary: Retrieves history records of a specific payment
---

# Retrieves history records of a specific payment

```omg.path
{
  PaymentID: uuid  // Unique identifier for a Payment
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
