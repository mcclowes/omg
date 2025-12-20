---
method: GET
path: /BankTransactions/{BankTransactionID}/Attachments
operationId: getBankTransactionAttachments
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves any attachments from a specific bank transactions

```omg.path
{
  BankTransactionID: uuid  // Xero generated unique identifier for a bank transaction
}
```

```omg.response
Attachments
```

{{> headers/xero-tenant-id }}
