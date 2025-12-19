---
method: POST
path: /Invoices/{InvoiceID}
operationId: updateInvoice
tags:
  - Accounting
summary: Updates a specific sales invoices or purchase bills
---

# Updates a specific sales invoices or purchase bills

```omg.path
{
  InvoiceID: uuid  // Unique identifier for an Invoice
}
```

```omg.query
{
  unitdp?: integer  // e.g. unitdp=4 – (Unit Decimal Places) You can opt in to use four decimal places for unit amounts
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
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
