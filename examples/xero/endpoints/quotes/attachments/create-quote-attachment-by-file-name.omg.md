---
method: PUT
path: /Quotes/{QuoteID}/Attachments/{FileName}
operationId: createQuoteAttachmentByFileName
tags:
  - Accounting
summary: Creates attachment for a specific quote
---

# Creates attachment for a specific quote

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
