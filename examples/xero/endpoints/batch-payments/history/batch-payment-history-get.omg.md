---
method: GET
path: /BatchPayments/{BatchPaymentID}/History
operationId: getBatchPaymentHistory
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves history from a specific batch payment

```omg.path
{
  BatchPaymentID: uuid  // Unique identifier for BatchPayment
}
```

```omg.response
HistoryRecords
```

{{> headers/xero-tenant-id }}
