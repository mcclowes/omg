---
method: GET
path: /BankTransfers/{BankTransferID}/Attachments
operationId: getBankTransferAttachments
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves attachments from a specific bank transfer

```omg.path
{
  BankTransferID: uuid  // Xero generated unique identifier for a bank transfer
}
```

```omg.response
Attachments
```

{{> headers/xero-tenant-id }}
