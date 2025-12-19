---
method: GET
path: /BankTransfers/{BankTransferID}
operationId: getBankTransfer
tags:
  - Accounting
summary: Retrieves specific bank transfers by using a unique bank transfer Id
---

# Retrieves specific bank transfers by using a unique bank transfer Id

```omg.path
{
  BankTransferID: uuid  // Xero generated unique identifier for a bank transfer
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
BankTransfers
```
