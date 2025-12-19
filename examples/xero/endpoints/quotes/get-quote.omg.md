---
method: GET
path: /Quotes/{QuoteID}
operationId: getQuote
tags:
  - Accounting
summary: Retrieves a specific quote using a unique quote Id
---

# Retrieves a specific quote using a unique quote Id

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
Quotes
```
