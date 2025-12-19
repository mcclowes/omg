---
method: GET
path: /Quotes/{QuoteID}/Attachments/{FileName}
operationId: getQuoteAttachmentByFileName
tags:
  - Accounting
summary: Retrieves a specific attachment from a specific quote by filename
---

# Retrieves a specific attachment from a specific quote by filename

```omg.path
{
  QuoteID: uuid  // Unique identifier for an Quote
  FileName: string  // Name of the attachment
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  contentType: string  // The mime type of the attachment file you are retrieving i.e image/jpg, application/pdf
}
```

```omg.response
string @format("binary")
```
