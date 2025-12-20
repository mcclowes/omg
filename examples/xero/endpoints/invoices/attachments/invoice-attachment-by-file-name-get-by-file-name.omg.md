---
method: GET
path: /Invoices/{InvoiceID}/Attachments/{FileName}
operationId: getInvoiceAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves an attachment from a specific invoice or purchase bill by filename

```omg.path
{
  InvoiceID: uuid  // Unique identifier for an Invoice
  FileName: string  // Name of the attachment
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}

{{> headers/content-type }}
