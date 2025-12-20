---
method: GET
path: /Prepayments
operationId: getPrepayments
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves prepayments

```omg.response
Prepayments
```

{{> query/where }}

{{> query/order }}

{{> query/page }}

{{> query/unitdp }}

{{> query/page-size }}

{{> headers/xero-tenant-id }}

{{> headers/if-modified-since }}
