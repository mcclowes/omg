---
method: GET
path: /Quotes/{QuoteID}/Attachments/{FileName}
operationId: getQuoteAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves a specific attachment from a specific quote by filename

```omg.path
{
  QuoteID: uuid  // Unique identifier for an Quote
  FileName: string  // Name of the attachment
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}

{{> headers/content-type }}
