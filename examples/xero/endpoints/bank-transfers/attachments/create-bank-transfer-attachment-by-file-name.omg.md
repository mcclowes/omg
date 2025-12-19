---
method: PUT
path: /BankTransfers/{BankTransferID}/Attachments/{FileName}
operationId: createBankTransferAttachmentByFileName
tags:
  - Accounting
---

# PUT /BankTransfers/{BankTransferID}/Attachments/{FileName}

```omg.path
{
  BankTransferID: uuid  // Xero generated unique identifier for a bank transfer
  FileName: string  // Name of the attachment
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
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
