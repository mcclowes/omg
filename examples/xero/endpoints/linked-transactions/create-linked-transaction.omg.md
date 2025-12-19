---
method: PUT
path: /LinkedTransactions
operationId: createLinkedTransaction
tags:
  - Accounting
summary: Creates linked transactions (billable expenses)
---

# Creates linked transactions (billable expenses)

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
LinkedTransaction
```

```omg.response
LinkedTransactions
```

```omg.response.400
Error
```
