---
method: GET
path: /Accounts/{AccountID}
operationId: getAccount
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
      - accounting.settings.read
---

# Retrieves a single chart of accounts by using a unique account Id

```omg.path
{
  AccountID: uuid  // Unique identifier for Account object
}
```

```omg.response
Accounts
```

{{> headers/xero-tenant-id }}
