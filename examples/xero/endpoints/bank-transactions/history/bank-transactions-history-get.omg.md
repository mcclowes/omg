---
method: GET
path: /BankTransactions/{BankTransactionID}/History
operationId: getBankTransactionsHistory
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves history from a specific bank transaction using a unique bank transaction Id

```omg.path
{
  BankTransactionID: uuid  // Xero generated unique identifier for a bank transaction
}
```

```omg.response
HistoryRecords
```

{{> headers/xero-tenant-id }}
