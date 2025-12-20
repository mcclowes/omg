---
method: POST
path: /Invoices/{InvoiceID}/Email
operationId: emailInvoice
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
extensions:
  x-hasAccountingValidationError: true
  x-example:
    - requestEmpty: null
      is_last: true
      is_object: true
      key: requestEmpty
      keyPascal: RequestEmpty
---

# Sends a copy of a specific invoice to related contact via email

```omg.path
{
  InvoiceID: uuid  // Unique identifier for an Invoice
}
```

```omg.body
RequestEmpty
```

```omg.response.204

```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
