---
method: GET
path: /Payments/{PaymentID}/History
operationId: getPaymentHistory
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves history records of a specific payment

```omg.path
{
  PaymentID: uuid  // Unique identifier for a Payment
}
```

```omg.response
HistoryRecords
```

{{> headers/xero-tenant-id }}
