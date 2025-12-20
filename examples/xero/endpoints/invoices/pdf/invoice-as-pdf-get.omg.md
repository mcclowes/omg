---
method: GET
path: /Invoices/{InvoiceID}/pdf
operationId: getInvoiceAsPdf
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
extensions:
  x-path: /Invoices/{InvoiceID}
---

# Retrieves invoices or purchase bills as PDF files

```omg.path
{
  InvoiceID: uuid  // Unique identifier for an Invoice
}
```

```omg.response
string @format("binary")
```

{{> headers/xero-tenant-id }}
