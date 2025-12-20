---
method: GET
path: /Organisation
operationId: getOrganisations
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
      - accounting.settings.read
---

# Retrieves Xero organisation details

```omg.response
Organisations
```

{{> headers/xero-tenant-id }}
