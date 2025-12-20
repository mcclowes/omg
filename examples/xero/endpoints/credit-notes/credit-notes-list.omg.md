---
method: GET
path: /CreditNotes
operationId: getCreditNotes
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves any credit notes

```omg.response
CreditNotes
```

{{> query/where }}

{{> query/order }}

{{> query/page }}

{{> query/unitdp }}

{{> query/page-size }}

{{> headers/xero-tenant-id }}

{{> headers/if-modified-since }}
