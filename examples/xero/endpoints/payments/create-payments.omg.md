---
method: PUT
path: /Payments
operationId: createPayments
tags:
  - Accounting
summary: Creates multiple payments for invoices or credit notes
---

# Creates multiple payments for invoices or credit notes

```omg.query
{
  summarizeErrors?: boolean @default(false)  // If false return 200 OK and mix of successfully created objects and any with validation errors
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
Payments
```

```omg.response
Payments
```

```omg.response.400
Error
```
