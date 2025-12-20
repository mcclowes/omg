---
method: GET
path: /Quotes/{QuoteID}/pdf
operationId: getQuoteAsPdf
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
extensions:
  x-path: /Quotes/{QuoteID}
---

# Retrieves a specific quote as a PDF file using a unique quote Id

```omg.path
{
  QuoteID: uuid  // Unique identifier for an Quote
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}
