---
method: GET
path: /BankTransfers/{BankTransferID}/Attachments/{FileName}
operationId: getBankTransferAttachmentByFileName
tags:
  - Accounting
summary: Retrieves a specific attachment on a specific bank transfer by file name
---

# Retrieves a specific attachment on a specific bank transfer by file name

```omg.path
{
  BankTransferID: uuid  // Xero generated unique identifier for a bank transfer
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
