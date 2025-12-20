---
method: PUT
path: /Quotes/{QuoteID}/Attachments/{FileName}
operationId: createQuoteAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
extensions:
  x-hasAccountingValidationError: true
---

# Creates attachment for a specific quote

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
