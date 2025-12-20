---
method: GET
path: /BankTransactions/{BankTransactionID}/Attachments/{FileName}
operationId: getBankTransactionAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves a specific attachment from a specific bank transaction by filename

```omg.path
{
  BankTransactionID: uuid  // Xero generated unique identifier for a bank transaction
  FileName: string  // Name of the attachment
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}

{{> headers/content-type }}
