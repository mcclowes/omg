---
method: GET
path: /Invoices/{InvoiceID}/History
operationId: getInvoiceHistory
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves history records for a specific invoice

```omg.path
{
  InvoiceID: uuid  // Unique identifier for an Invoice
}
```

```omg.response
HistoryRecords
```

{{> headers/xero-tenant-id }}
