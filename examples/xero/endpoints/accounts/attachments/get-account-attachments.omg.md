---
method: GET
path: /Accounts/{AccountID}/Attachments
operationId: getAccountAttachments
tags:
  - Accounting
summary: Retrieves attachments for a specific accounts by using a unique account Id
---

# Retrieves attachments for a specific accounts by using a unique account Id

```omg.path
{
  AccountID: uuid  // Unique identifier for Account object
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
