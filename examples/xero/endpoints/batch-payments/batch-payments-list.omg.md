---
method: GET
path: /BatchPayments
operationId: getBatchPayments
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves either one or many batch payments for invoices

```omg.response
BatchPayments
```

{{> query/where }}

{{> query/order }}

{{> headers/xero-tenant-id }}

{{> headers/if-modified-since }}
