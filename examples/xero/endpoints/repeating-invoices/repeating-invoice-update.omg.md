---
method: POST
path: /RepeatingInvoices/{RepeatingInvoiceID}
operationId: updateRepeatingInvoice
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
extensions:
  x-hasAccountingValidationError: true
---

# Deletes a specific repeating invoice template

```omg.path
{
  RepeatingInvoiceID: uuid  // Unique identifier for a Repeating Invoice
}
```

```omg.body
RepeatingInvoices
```

```omg.response
RepeatingInvoices
```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
