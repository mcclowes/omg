---
method: GET
path: /Quotes/{QuoteID}/Attachments
operationId: getQuoteAttachments
tags:
  - Accounting
summary: Retrieves attachments for a specific quote
---

# Retrieves attachments for a specific quote

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
Attachments
```
