---
method: POST
path: /Quotes/{QuoteID}/Attachments/{FileName}
operationId: updateQuoteAttachmentByFileName
tags:
  - Accounting
summary: Updates a specific attachment from a specific quote by filename
---

# Updates a specific attachment from a specific quote by filename

```omg.path
{
  QuoteID: uuid  // Unique identifier for an Quote
  FileName: string  // Name of the attachment
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
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
