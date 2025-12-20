---
method: PUT
path: /RepeatingInvoices/{RepeatingInvoiceID}/Attachments/{FileName}
operationId: createRepeatingInvoiceAttachmentByFileName
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
extensions:
  x-hasAccountingValidationError: true
---

# Creates an attachment from a specific repeating invoices by file name

```omg.path
{
  RepeatingInvoiceID: uuid  // Unique identifier for a Repeating Invoice
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
