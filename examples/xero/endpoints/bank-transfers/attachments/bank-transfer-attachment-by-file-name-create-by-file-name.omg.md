---
method: PUT
path: /BankTransfers/{BankTransferID}/Attachments/{FileName}
operationId: createBankTransferAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
extensions:
  x-hasAccountingValidationError: true
---

# PUT /BankTransfers/{BankTransferID}/Attachments/{FileName}

```omg.path
{
  BankTransferID: uuid  // Xero generated unique identifier for a bank transfer
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
