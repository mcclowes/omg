---
method: GET
path: /Invoices/{InvoiceID}/OnlineInvoice
operationId: getOnlineInvoice
tags:
  - Accounting
summary: Retrieves a URL to an online invoice
---

# Retrieves a URL to an online invoice

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
OnlineInvoices
```
