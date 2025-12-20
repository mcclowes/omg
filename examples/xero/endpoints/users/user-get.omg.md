---
method: GET
path: /Users/{UserID}
operationId: getUser
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
      - accounting.settings.read
---

# Retrieves a specific user

```omg.path
{
  UserID: uuid  // Unique identifier for a User
}
```

```omg.response
Users
```

{{> headers/xero-tenant-id }}
