---
method: GET
path: /BankTransactions/{BankTransactionID}/Attachments
operationId: getBankTransactionAttachments
tags:
  - Accounting
summary: Retrieves any attachments from a specific bank transactions
---

# Retrieves any attachments from a specific bank transactions

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
Attachments
```
