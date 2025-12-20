---
method: GET
path: /BatchPayments/{BatchPaymentID}
operationId: getBatchPayment
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves a specific batch payment using a unique batch payment Id

```omg.path
{
  BatchPaymentID: uuid  // Unique identifier for BatchPayment
}
```

```omg.response
BatchPayments
```

{{> headers/xero-tenant-id }}
