---
method: POST
path: /Payments
operationId: createPayment
tags:
  - Accounting
summary: Creates a single payment for invoice or credit notes
---

# Creates a single payment for invoice or credit notes

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
Payment
```

```omg.response
Payments
```

```omg.response.400
Error
```
