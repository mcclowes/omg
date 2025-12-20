---
method: PUT
path: /Invoices/{InvoiceID}/Attachments/{FileName}
operationId: createInvoiceAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
extensions:
  x-hasAccountingValidationError: true
---

# Creates an attachment for a specific invoice or purchase bill by filename

```omg.path
{
  InvoiceID: uuid  // Unique identifier for an Invoice
  FileName: string  // Name of the attachment
}
```

```omg.query
{
  IncludeOnline?: boolean @default(false)  // Allows an attachment to be seen by the end customer within their online invoice
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

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
