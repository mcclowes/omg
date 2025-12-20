---
method: GET
path: /RepeatingInvoices/{RepeatingInvoiceID}
operationId: getRepeatingInvoice
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
      - accounting.transactions.read
---

# Retrieves a specific repeating invoice by using a unique repeating invoice Id

```omg.path
{
  RepeatingInvoiceID: uuid  // Unique identifier for a Repeating Invoice
}
```

```omg.response
RepeatingInvoices
```

{{> headers/xero-tenant-id }}
