---
method: GET
path: /Invoices/{InvoiceID}/Attachments
operationId: getInvoiceAttachments
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.attachments
      - accounting.attachments.read
---

# Retrieves attachments for a specific invoice or purchase bill

```omg.path
{
  InvoiceID: uuid  // Unique identifier for an Invoice
}
```

```omg.response
Attachments
```

{{> headers/xero-tenant-id }}
