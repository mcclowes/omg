---
method: GET
path: /BankTransfers/{BankTransferID}/Attachments/{FileName}
operationId: getBankTransferAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves a specific attachment on a specific bank transfer by file name

```omg.path
{
  BankTransferID: uuid  // Xero generated unique identifier for a bank transfer
  FileName: string  // Name of the attachment
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}

{{> headers/content-type }}
