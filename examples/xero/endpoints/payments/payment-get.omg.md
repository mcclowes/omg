---
method: GET
path: /Payments/{PaymentID}
operationId: getPayment
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves a specific payment for invoices and credit notes using a unique payment Id

```omg.path
{
  PaymentID: uuid  // Unique identifier for a Payment
}
```

```omg.response
Payments
```

{{> headers/xero-tenant-id }}
