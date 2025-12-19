---
method: GET
path: /LinkedTransactions/{LinkedTransactionID}
operationId: getLinkedTransaction
tags:
  - Accounting
summary: Retrieves a specific linked transaction (billable expenses) using a unique linked transaction Id
---

# Retrieves a specific linked transaction (billable expenses) using a unique linked transaction Id

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

```omg.response
LinkedTransactions
```
