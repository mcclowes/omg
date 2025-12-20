---
method: POST
path: /Invoices/{InvoiceID}/Attachments/{FileName}
operationId: updateInvoiceAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
extensions:
  x-hasAccountingValidationError: true
---

# Updates an attachment from a specific invoices or purchase bill by filename

```omg.path
{
  InvoiceID: uuid  // Unique identifier for an Invoice
  FileName: string  // Name of the attachment
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
