---
method: GET
path: /BankTransactions/{BankTransactionID}/Attachments/{FileName}
operationId: getBankTransactionAttachmentByFileName
tags:
  - Accounting
summary: Retrieves a specific attachment from a specific bank transaction by filename
---

# Retrieves a specific attachment from a specific bank transaction by filename

```omg.path
{
  BankTransactionID: uuid  // Xero generated unique identifier for a bank transaction
  FileName: string  // Name of the attachment
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
