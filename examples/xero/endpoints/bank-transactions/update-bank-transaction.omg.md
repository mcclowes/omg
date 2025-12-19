---
method: POST
path: /BankTransactions/{BankTransactionID}
operationId: updateBankTransaction
tags:
  - Accounting
summary: Updates a single spent or received money transaction
---

# Updates a single spent or received money transaction

```omg.path
{
  BankTransactionID: uuid  // Xero generated unique identifier for a bank transaction
}
```

```omg.query
{
  unitdp?: integer  // e.g. unitdp=4 – (Unit Decimal Places) You can opt in to use four decimal places for unit amounts
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
BankTransactions
```

```omg.response
BankTransactions
```

```omg.response.400
Error
```
