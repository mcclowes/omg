---
method: PUT
path: /BankTransfers
operationId: createBankTransfer
tags:
  - Accounting
summary: Creates a bank transfer
---

# Creates a bank transfer

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
BankTransfers
```

```omg.response
BankTransfers
```

```omg.response.400
Error
```
