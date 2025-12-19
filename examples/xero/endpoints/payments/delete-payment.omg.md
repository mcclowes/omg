---
method: POST
path: /Payments/{PaymentID}
operationId: deletePayment
tags:
  - Accounting
summary: Updates a specific payment for invoices and credit notes
---

# Updates a specific payment for invoices and credit notes

```omg.path
{
  PaymentID: uuid  // Unique identifier for a Payment
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
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
