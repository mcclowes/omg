---
method: GET
path: /ManualJournals
operationId: getManualJournals
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves manual journals

```omg.response
ManualJournals
```

{{> query/where }}

{{> query/order }}

{{> query/page }}

{{> query/page-size }}

{{> headers/xero-tenant-id }}

{{> headers/if-modified-since }}
