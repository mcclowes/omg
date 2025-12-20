---
method: GET
path: /RepeatingInvoices/{RepeatingInvoiceID}/Attachments/{FileName}
operationId: getRepeatingInvoiceAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves a specific attachment from a specific repeating invoices by file name

```omg.path
{
  RepeatingInvoiceID: uuid  // Unique identifier for a Repeating Invoice
  FileName: string  // Name of the attachment
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}

{{> headers/content-type }}
