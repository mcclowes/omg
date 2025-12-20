---
method: GET
path: /BankTransactions/{BankTransactionID}
operationId: getBankTransaction
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves a single spent or received money transaction by using a unique bank transaction Id

```omg.path
{
  BankTransactionID: uuid  // Xero generated unique identifier for a bank transaction
}
```

```omg.response
BankTransactions
```

{{> query/unitdp }}

{{> headers/xero-tenant-id }}
