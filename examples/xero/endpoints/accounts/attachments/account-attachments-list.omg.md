---
method: GET
path: /Accounts/{AccountID}/Attachments
operationId: getAccountAttachments
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves attachments for a specific accounts by using a unique account Id

```omg.path
{
  AccountID: uuid  // Unique identifier for Account object
}
```

```omg.response
Attachments
```

{{> headers/xero-tenant-id }}
