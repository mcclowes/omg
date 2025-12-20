---
method: POST
path: /BankTransactions/{BankTransactionID}/Attachments/{FileName}
operationId: updateBankTransactionAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
extensions:
  x-hasAccountingValidationError: true
---

# Updates a specific attachment from a specific bank transaction by filename

```omg.path
{
  BankTransactionID: uuid  // Xero generated unique identifier for a bank transaction
  FileName: string  // Name of the attachment
}
```

```omg.body
string @format("byte")
```

```omg.response
Attachments
```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
