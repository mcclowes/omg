---
method: GET
path: /Quotes/{QuoteID}/Attachments/{AttachmentID}
operationId: getQuoteAttachmentById
tags:
  - Accounting
summary: Retrieves a specific attachment from a specific quote using a unique attachment Id
---

# Retrieves a specific attachment from a specific quote using a unique attachment Id

```omg.path
{
  QuoteID: uuid  // Unique identifier for an Quote
  AttachmentID: uuid  // Unique identifier for Attachment object
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
