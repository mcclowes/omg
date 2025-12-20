---
method: GET
path: /Prepayments/{PrepaymentID}/History
operationId: getPrepaymentHistory
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves history record for a specific prepayment

```omg.path
{
  PrepaymentID: uuid  // Unique identifier for a PrePayment
}
```

```omg.response
HistoryRecords
```

{{> headers/xero-tenant-id }}
