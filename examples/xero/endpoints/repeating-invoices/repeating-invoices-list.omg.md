---
method: GET
path: /RepeatingInvoices
operationId: getRepeatingInvoices
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves repeating invoices

```omg.response
RepeatingInvoices
```

{{> query/where }}

{{> query/order }}

{{> headers/xero-tenant-id }}
