---
method: GET
path: /RepeatingInvoices/{RepeatingInvoiceID}/Attachments/{FileName}
operationId: getRepeatingInvoiceAttachmentByFileName
tags:
  - Accounting
summary: Retrieves a specific attachment from a specific repeating invoices by file name
---

# Retrieves a specific attachment from a specific repeating invoices by file name

```omg.path
{
  RepeatingInvoiceID: uuid  // Unique identifier for a Repeating Invoice
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
