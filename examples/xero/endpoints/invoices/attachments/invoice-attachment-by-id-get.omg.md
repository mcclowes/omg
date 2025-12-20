---
method: GET
path: /Invoices/{InvoiceID}/Attachments/{AttachmentID}
operationId: getInvoiceAttachmentById
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves a specific attachment from a specific invoices or purchase bills by using a unique attachment Id

```omg.path
{
  InvoiceID: uuid  // Unique identifier for an Invoice
  AttachmentID: uuid  // Unique identifier for Attachment object
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}

{{> headers/content-type }}
