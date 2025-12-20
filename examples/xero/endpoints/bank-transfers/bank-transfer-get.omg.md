---
method: GET
path: /BankTransfers/{BankTransferID}
operationId: getBankTransfer
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves specific bank transfers by using a unique bank transfer Id

```omg.path
{
  BankTransferID: uuid  // Xero generated unique identifier for a bank transfer
}
```

```omg.response
BankTransfers
```

{{> headers/xero-tenant-id }}
