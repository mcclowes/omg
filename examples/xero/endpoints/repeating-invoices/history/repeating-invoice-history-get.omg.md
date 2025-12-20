---
method: GET
path: /RepeatingInvoices/{RepeatingInvoiceID}/History
operationId: getRepeatingInvoiceHistory
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves history record for a specific repeating invoice

```omg.path
{
  RepeatingInvoiceID: uuid  // Unique identifier for a Repeating Invoice
}
```

```omg.response
HistoryRecords
```

{{> headers/xero-tenant-id }}
