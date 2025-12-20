---
method: DELETE
path: /LinkedTransactions/{LinkedTransactionID}
operationId: deleteLinkedTransaction
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
---

# Deletes a specific linked transactions (billable expenses)

```omg.path
{
  LinkedTransactionID: uuid  // Unique identifier for a LinkedTransaction
}
```

```omg.response.204

```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}
