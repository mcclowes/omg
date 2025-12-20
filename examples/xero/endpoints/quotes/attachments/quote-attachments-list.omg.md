---
method: GET
path: /Quotes/{QuoteID}/Attachments
operationId: getQuoteAttachments
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves attachments for a specific quote

```omg.path
{
  QuoteID: uuid  // Unique identifier for an Quote
}
```

```omg.response
Attachments
```

{{> headers/xero-tenant-id }}
