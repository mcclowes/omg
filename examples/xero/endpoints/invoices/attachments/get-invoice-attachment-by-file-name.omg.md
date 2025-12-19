---
method: GET
path: /Invoices/{InvoiceID}/Attachments/{FileName}
operationId: getInvoiceAttachmentByFileName
tags:
  - Accounting
summary: Retrieves an attachment from a specific invoice or purchase bill by filename
---

# Retrieves an attachment from a specific invoice or purchase bill by filename

```omg.path
{
  InvoiceID: uuid  // Unique identifier for an Invoice
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
