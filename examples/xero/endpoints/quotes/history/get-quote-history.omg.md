---
method: GET
path: /Quotes/{QuoteID}/History
operationId: getQuoteHistory
tags:
  - Accounting
summary: Retrieves history records of a specific quote
---

# Retrieves history records of a specific quote

```omg.path
{
  QuoteID: uuid  // Unique identifier for an Quote
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
HistoryRecords
```
