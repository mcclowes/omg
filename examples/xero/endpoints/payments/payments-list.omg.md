---
method: GET
path: /Payments
operationId: getPayments
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves payments for invoices and credit notes

```omg.response
Payments
```

{{> query/where }}

{{> query/order }}

{{> query/page }}

{{> query/page-size }}

{{> headers/xero-tenant-id }}

{{> headers/if-modified-since }}
