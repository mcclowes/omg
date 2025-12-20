---
method: GET
path: /BankTransactions/{BankTransactionID}/Attachments/{AttachmentID}
operationId: getBankTransactionAttachmentById
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves specific attachments from a specific BankTransaction using a unique attachment Id

```omg.path
{
  BankTransactionID: uuid  // Xero generated unique identifier for a bank transaction
  AttachmentID: uuid  // Unique identifier for Attachment object
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}

{{> headers/content-type }}
