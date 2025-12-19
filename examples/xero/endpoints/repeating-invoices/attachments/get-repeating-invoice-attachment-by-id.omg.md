---
method: GET
path: /RepeatingInvoices/{RepeatingInvoiceID}/Attachments/{AttachmentID}
operationId: getRepeatingInvoiceAttachmentById
tags:
  - Accounting
summary: Retrieves a specific attachment from a specific repeating invoice
---

# Retrieves a specific attachment from a specific repeating invoice

```omg.path
{
  RepeatingInvoiceID: uuid  // Unique identifier for a Repeating Invoice
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
