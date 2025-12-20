---
method: GET
path: /ExpenseClaims
operationId: getExpenseClaims
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves expense claims

```omg.response
ExpenseClaims
```

{{> query/where }}

{{> query/order }}

{{> headers/xero-tenant-id }}

{{> headers/if-modified-since }}
