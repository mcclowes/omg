---
method: GET
path: /LinkedTransactions/{LinkedTransactionID}
operationId: getLinkedTransaction
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves a specific linked transaction (billable expenses) using a unique linked transaction Id

```omg.path
{
  LinkedTransactionID: uuid  // Unique identifier for a LinkedTransaction
}
```

```omg.response
LinkedTransactions
```

{{> headers/xero-tenant-id }}
