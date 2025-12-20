---
method: GET
path: /Currencies
operationId: getCurrencies
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
      - accounting.settings.read
---

# Retrieves currencies for your Xero organisation

```omg.response
Currencies
```

{{> query/where }}

{{> query/order }}

{{> headers/xero-tenant-id }}
