---
method: GET
path: /BankTransactions
operationId: getBankTransactions
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves any spent or received money transactions

```omg.response
BankTransactions
```

{{> query/where }}

{{> query/order }}

{{> query/page }}

{{> query/unitdp }}

{{> query/page-size }}

{{> headers/xero-tenant-id }}

{{> headers/if-modified-since }}
