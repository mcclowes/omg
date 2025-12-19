---
method: DELETE
path: /LinkedTransactions/{LinkedTransactionID}
operationId: deleteLinkedTransaction
tags:
  - Accounting
summary: Deletes a specific linked transactions (billable expenses)
---

# Deletes a specific linked transactions (billable expenses)

```omg.path
{
  LinkedTransactionID: uuid  // Unique identifier for a LinkedTransaction
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response.204

```

```omg.response.400
Error
```
