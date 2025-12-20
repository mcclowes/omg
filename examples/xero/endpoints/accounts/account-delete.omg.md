---
method: DELETE
path: /Accounts/{AccountID}
operationId: deleteAccount
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
extensions:
  x-hasAccountingValidationError: true
---

# Deletes a chart of accounts

```omg.path
{
  AccountID: uuid  // Unique identifier for Account object
}
```

```omg.response
Accounts
```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}
