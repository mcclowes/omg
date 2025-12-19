---
method: POST
path: /Invoices/{InvoiceID}/Attachments/{FileName}
operationId: updateInvoiceAttachmentByFileName
tags:
  - Accounting
summary: Updates an attachment from a specific invoices or purchase bill by filename
---

# Updates an attachment from a specific invoices or purchase bill by filename

```omg.path
{
  InvoiceID: uuid  // Unique identifier for an Invoice
  FileName: string  // Name of the attachment
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
string @format("byte")
```

```omg.response
Attachments
```

```omg.response.400
Error
```
