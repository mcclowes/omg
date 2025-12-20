---
method: POST
path: /Invoices/{InvoiceID}
operationId: updateInvoice
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
extensions:
  x-hasAccountingValidationError: true
  x-example:
    - invoice: null
      is_object: true
      key: invoice
      keyPascal: Invoice
    - reference: null
      is_last: true
      key: reference
      keyPascal: Reference
      default: I am Iron man
      object: invoice
    - invoices: null
      is_object: true
      key: invoices
      keyPascal: Invoices
    - add_invoice: null
      is_last: true
      is_array_add: true
      key: invoices
      keyPascal: Invoices
      java: Invoices
      csharp: Invoice
      object: invoice
---

# Updates a specific sales invoices or purchase bills

```omg.path
{
  InvoiceID: uuid  // Unique identifier for an Invoice
}
```

```omg.body
Invoices
```

```omg.response
Invoices
```

```omg.response.400
Error
```

{{> query/unitdp }}

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
