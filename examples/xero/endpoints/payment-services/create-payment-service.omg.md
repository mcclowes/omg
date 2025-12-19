---
method: PUT
path: /PaymentServices
operationId: createPaymentService
tags:
  - Accounting
summary: Creates a payment service
---

# Creates a payment service

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
PaymentServices
```

```omg.response
PaymentServices
```

```omg.response.400
Error
```
