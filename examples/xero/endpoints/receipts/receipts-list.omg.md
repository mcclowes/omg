---
method: GET
path: /Receipts
operationId: getReceipts
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves draft expense claim receipts for any user

```omg.response
Receipts
```

{{> query/where }}

{{> query/order }}

{{> query/unitdp }}

{{> headers/xero-tenant-id }}

{{> headers/if-modified-since }}
