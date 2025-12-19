---
method: GET
path: /BankTransactions/{BankTransactionID}/Attachments/{AttachmentID}
operationId: getBankTransactionAttachmentById
tags:
  - Accounting
summary: Retrieves specific attachments from a specific BankTransaction using a unique attachment Id
---

# Retrieves specific attachments from a specific BankTransaction using a unique attachment Id

```omg.path
{
  BankTransactionID: uuid  // Xero generated unique identifier for a bank transaction
  AttachmentID: uuid  // Unique identifier for Attachment object
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  contentType: string  // The mime type of the attachment file you are retrieving i.e image/jpg, application/pdf
}
```

```omg.response
string @format("binary")
```
