---
method: GET
path: /Accounts
operationId: getAccounts
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
      - accounting.settings.read
---

# Retrieves the full chart of accounts

```omg.response
Accounts
```

{{> query/where }}

{{> query/order }}

{{> headers/xero-tenant-id }}

{{> headers/if-modified-since }}
