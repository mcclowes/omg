---
method: GET
path: /Prepayments/{PrepaymentID}
operationId: getPrepayment
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Allows you to retrieve a specified prepayments

```omg.path
{
  PrepaymentID: uuid  // Unique identifier for a PrePayment
}
```

```omg.response
Prepayments
```

{{> headers/xero-tenant-id }}
