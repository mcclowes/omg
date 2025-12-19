---
method: GET
path: /BankTransfers/{BankTransferID}/History
operationId: getBankTransferHistory
tags:
  - Accounting
summary: Retrieves history from a specific bank transfer using a unique bank transfer Id
---

# Retrieves history from a specific bank transfer using a unique bank transfer Id

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
HistoryRecords
```
