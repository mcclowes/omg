---
method: GET
path: /Quotes/{QuoteID}
operationId: getQuote
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves a specific quote using a unique quote Id

```omg.path
{
  QuoteID: uuid  // Unique identifier for an Quote
}
```

```omg.response
Quotes
```

{{> headers/xero-tenant-id }}
