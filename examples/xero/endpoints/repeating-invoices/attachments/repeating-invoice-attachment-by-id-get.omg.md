---
method: GET
path: /RepeatingInvoices/{RepeatingInvoiceID}/Attachments/{AttachmentID}
operationId: getRepeatingInvoiceAttachmentById
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves a specific attachment from a specific repeating invoice

```omg.path
{
  RepeatingInvoiceID: uuid  // Unique identifier for a Repeating Invoice
  AttachmentID: uuid  // Unique identifier for Attachment object
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}

{{> headers/content-type }}
