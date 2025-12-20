---
method: GET
path: /Organisation/Actions
operationId: getOrganisationActions
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
      - accounting.settings.read
---

# Retrieves a list of the key actions your app has permission to perform in the connected Xero organisation.

```omg.response
Actions
```

{{> headers/xero-tenant-id }}
