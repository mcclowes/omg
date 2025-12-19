---
method: GET
path: /BankTransfers/{BankTransferID}/Attachments
operationId: getBankTransferAttachments
tags:
  - Accounting
summary: Retrieves attachments from a specific bank transfer
---

# Retrieves attachments from a specific bank transfer

```omg.path
{
  BankTransferID: uuid  // Xero generated unique identifier for a bank transfer
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
Attachments
```
