---
method: GET
path: /BankTransactions/{BankTransactionID}/History
operationId: getBankTransactionsHistory
tags:
  - Accounting
summary: Retrieves history from a specific bank transaction using a unique bank transaction Id
---

# Retrieves history from a specific bank transaction using a unique bank transaction Id

```omg.path
{
  BankTransactionID: uuid  // Xero generated unique identifier for a bank transaction
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
HistoryRecords
```
