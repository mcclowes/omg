---
method: GET
path: /Overpayments
operationId: getOverpayments
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves overpayments

```omg.response
Overpayments
```

{{> query/where }}

{{> query/order }}

{{> query/page }}

{{> query/unitdp }}

{{> query/page-size }}

{{> headers/xero-tenant-id }}

{{> headers/if-modified-since }}
