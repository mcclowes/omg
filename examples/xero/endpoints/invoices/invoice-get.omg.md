---
method: GET
path: /Invoices/{InvoiceID}
operationId: getInvoice
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves a specific sales invoice or purchase bill using a unique invoice Id

```omg.path
{
  InvoiceID: uuid  // Unique identifier for an Invoice
}
```

```omg.response
Invoices
```

{{> query/unitdp }}

{{> headers/xero-tenant-id }}
