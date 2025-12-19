---
method: GET
path: /Invoices/{InvoiceID}/Attachments
operationId: getInvoiceAttachments
tags:
  - Accounting
summary: Retrieves attachments for a specific invoice or purchase bill
---

# Retrieves attachments for a specific invoice or purchase bill

```omg.path
{
  InvoiceID: uuid  // Unique identifier for an Invoice
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
Attachments
```
