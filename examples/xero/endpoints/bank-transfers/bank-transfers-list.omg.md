---
method: GET
path: /BankTransfers
operationId: getBankTransfers
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves all bank transfers

```omg.response
BankTransfers
```

{{> query/where }}

{{> query/order }}

{{> headers/xero-tenant-id }}

{{> headers/if-modified-since }}
