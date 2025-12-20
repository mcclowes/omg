---
method: POST
path: /Payments/{PaymentID}
operationId: deletePayment
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
extensions:
  x-hasAccountingValidationError: true
  x-example:
    - paymentDelete: null
      is_object: true
      key: paymentDelete
      keyPascal: PaymentDelete
    - status: null
      is_last: true
      key: status
      keyPascal: Status
      default: DELETED
      object: paymentDelete
---

# Updates a specific payment for invoices and credit notes

```omg.path
{
  PaymentID: uuid  // Unique identifier for a Payment
}
```

```omg.body
PaymentDelete
```

```omg.response
Payments
```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
