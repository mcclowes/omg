---
method: PUT
path: /BankTransfers/{BankTransferID}/History
operationId: createBankTransferHistoryRecord
tags:
  - Accounting
summary: Creates a history record for a specific bank transfer
---

# Creates a history record for a specific bank transfer

```omg.path
{
  BankTransferID: uuid  // Xero generated unique identifier for a bank transfer
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
