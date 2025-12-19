---
method: POST
path: /BatchPayments
operationId: deleteBatchPayment
tags:
  - Accounting
summary: Updates a specific batch payment for invoices and credit notes
---

# Updates a specific batch payment for invoices and credit notes

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
BatchPaymentDelete
```

```omg.response
BatchPayments
```

```omg.response.400
Error
```
