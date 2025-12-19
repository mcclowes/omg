---
method: POST
path: /Quotes/{QuoteID}
operationId: updateQuote
tags:
  - Accounting
summary: Updates a specific quote
---

# Updates a specific quote

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
Quotes
```

```omg.response
Quotes
```

```omg.response.400
Error
```
