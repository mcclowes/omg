---
method: GET
path: /Overpayments/{OverpaymentID}
operationId: getOverpayment
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves a specific overpayment using a unique overpayment Id

```omg.path
{
  OverpaymentID: uuid  // Unique identifier for a Overpayment
}
```

```omg.response
Overpayments
```

{{> headers/xero-tenant-id }}
