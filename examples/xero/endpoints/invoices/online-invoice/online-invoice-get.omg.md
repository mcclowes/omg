---
method: GET
path: /Invoices/{InvoiceID}/OnlineInvoice
operationId: getOnlineInvoice
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves a URL to an online invoice

```omg.path
{
  InvoiceID: uuid  // Unique identifier for an Invoice
}
```

```omg.response
OnlineInvoices
```

{{> headers/xero-tenant-id }}
