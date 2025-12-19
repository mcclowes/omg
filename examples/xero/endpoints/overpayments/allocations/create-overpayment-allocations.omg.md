---
method: PUT
path: /Overpayments/{OverpaymentID}/Allocations
operationId: createOverpaymentAllocations
tags:
  - Accounting
summary: Creates a single allocation for a specific overpayment
---

# Creates a single allocation for a specific overpayment

```omg.path
{
  OverpaymentID: uuid  // Unique identifier for a Overpayment
}
```

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
Allocations
```

```omg.response
Allocations
```

```omg.response.400
Error
```
