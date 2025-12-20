---
method: POST
path: /BatchPayments/{BatchPaymentID}
operationId: deleteBatchPaymentByUrlParam
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
---

# Updates a specific batch payment for invoices and credit notes

```omg.path
{
  BatchPaymentID: uuid  // Unique identifier for BatchPayment
}
```

```omg.body
BatchPaymentDeleteByUrlParam
```

```omg.response
BatchPayments
```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
