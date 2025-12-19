---
method: GET
path: /BankTransactions/{BankTransactionID}
operationId: getBankTransaction
tags:
  - Accounting
summary: Retrieves a single spent or received money transaction by using a unique bank transaction Id
---

# Retrieves a single spent or received money transaction by using a unique bank transaction Id

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
}
```

```omg.response
BankTransactions
```
