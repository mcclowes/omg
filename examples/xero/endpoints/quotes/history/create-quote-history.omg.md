---
method: PUT
path: /Quotes/{QuoteID}/History
operationId: createQuoteHistory
tags:
  - Accounting
summary: Creates a history record for a specific quote
---

# Creates a history record for a specific quote

```omg.path
{
  QuoteID: uuid  // Unique identifier for an Quote
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
HistoryRecords
```

```omg.response
HistoryRecords
```

```omg.response.400
Error
```
