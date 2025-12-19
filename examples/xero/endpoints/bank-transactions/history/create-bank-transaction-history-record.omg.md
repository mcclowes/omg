---
method: PUT
path: /BankTransactions/{BankTransactionID}/History
operationId: createBankTransactionHistoryRecord
tags:
  - Accounting
summary: Creates a history record for a specific bank transactions
---

# Creates a history record for a specific bank transactions

```omg.path
{
  BankTransactionID: uuid  // Xero generated unique identifier for a bank transaction
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
HistoryRecords
```

```omg.response
HistoryRecords
```

```omg.response.400
Error
```
