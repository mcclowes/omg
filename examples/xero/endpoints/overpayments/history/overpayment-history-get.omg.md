---
method: GET
path: /Overpayments/{OverpaymentID}/History
operationId: getOverpaymentHistory
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves history records of a specific overpayment

```omg.path
{
  OverpaymentID: uuid  // Unique identifier for a Overpayment
}
```

```omg.response
HistoryRecords
```

{{> headers/xero-tenant-id }}
