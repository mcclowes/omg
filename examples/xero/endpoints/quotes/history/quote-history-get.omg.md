---
method: GET
path: /Quotes/{QuoteID}/History
operationId: getQuoteHistory
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves history records of a specific quote

```omg.path
{
  QuoteID: uuid  // Unique identifier for an Quote
}
```

```omg.response
HistoryRecords
```

{{> headers/xero-tenant-id }}
