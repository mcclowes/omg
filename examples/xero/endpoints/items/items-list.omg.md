---
method: GET
path: /Items
operationId: getItems
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
      - accounting.settings.read
---

# Retrieves items

```omg.response
Items
```

{{> query/where }}

{{> query/order }}

{{> query/unitdp }}

{{> headers/xero-tenant-id }}

{{> headers/if-modified-since }}
