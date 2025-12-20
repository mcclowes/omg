---
method: POST
path: /BatchPayments
operationId: deleteBatchPayment
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
extensions:
  x-hasAccountingValidationError: true
  x-example:
    - batchPaymentDelete: null
      is_object: true
      key: batchPaymentDelete
      keyPascal: BatchPaymentDelete
    - status: null
      is_last: true
      key: status
      keyPascal: Status
      default: DELETED
      object: batchPaymentDelete
    - batchPaymentID: null
      is_last: true
      is_uuid: true
      key: batchPaymentID
      keyPascal: BatchPaymentID
      keySnake: batch_payment_id
      default: 00000000-0000-0000-0000-000000000000
      object: batchPaymentDelete
---

# Updates a specific batch payment for invoices and credit notes

```omg.body
BatchPaymentDelete
```

```omg.response
BatchPayments
```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
