---
method: POST
path: /Quotes/{QuoteID}/Attachments/{FileName}
operationId: updateQuoteAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
extensions:
  x-hasAccountingValidationError: true
---

# Updates a specific attachment from a specific quote by filename

```omg.path
{
  QuoteID: uuid  // Unique identifier for an Quote
  FileName: string  // Name of the attachment
}
```

```omg.body
string @format("byte")
```

```omg.response
Attachments
```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
