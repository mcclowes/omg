---
method: GET
path: /BankTransfers/{BankTransferID}/History
operationId: getBankTransferHistory
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves history from a specific bank transfer using a unique bank transfer Id

```omg.path
{
  BankTransferID: uuid  // Xero generated unique identifier for a bank transfer
}
```

```omg.response
HistoryRecords
```

{{> headers/xero-tenant-id }}
