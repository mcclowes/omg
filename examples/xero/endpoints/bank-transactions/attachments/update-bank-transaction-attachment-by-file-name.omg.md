---
method: POST
path: /BankTransactions/{BankTransactionID}/Attachments/{FileName}
operationId: updateBankTransactionAttachmentByFileName
tags:
  - Accounting
summary: Updates a specific attachment from a specific bank transaction by filename
---

# Updates a specific attachment from a specific bank transaction by filename

```omg.path
{
  BankTransactionID: uuid  // Xero generated unique identifier for a bank transaction
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
