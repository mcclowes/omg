---
method: GET
path: /Quotes/{QuoteID}/Attachments/{AttachmentID}
operationId: getQuoteAttachmentById
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves a specific attachment from a specific quote using a unique attachment Id

```omg.path
{
  QuoteID: uuid  // Unique identifier for an Quote
  AttachmentID: uuid  // Unique identifier for Attachment object
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}

{{> headers/content-type }}
