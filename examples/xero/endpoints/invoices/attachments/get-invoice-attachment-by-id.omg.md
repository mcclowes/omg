---
method: GET
path: /Invoices/{InvoiceID}/Attachments/{AttachmentID}
operationId: getInvoiceAttachmentById
tags:
  - Accounting
summary: Retrieves a specific attachment from a specific invoices or purchase bills by using a unique attachment Id
---

# Retrieves a specific attachment from a specific invoices or purchase bills by using a unique attachment Id

```omg.path
{
  InvoiceID: uuid  // Unique identifier for an Invoice
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
