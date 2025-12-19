---
method: POST
path: /LinkedTransactions/{LinkedTransactionID}
operationId: updateLinkedTransaction
tags:
  - Accounting
summary: Updates a specific linked transactions (billable expenses)
---

# Updates a specific linked transactions (billable expenses)

```omg.path
{
  LinkedTransactionID: uuid  // Unique identifier for a LinkedTransaction
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
LinkedTransactions
```

```omg.response
LinkedTransactions
```

```omg.response.400
Error
```
