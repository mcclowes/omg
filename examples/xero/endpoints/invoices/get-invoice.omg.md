---
method: GET
path: /Invoices/{InvoiceID}
operationId: getInvoice
tags:
  - Accounting
summary: Retrieves a specific sales invoice or purchase bill using a unique invoice Id
---

# Retrieves a specific sales invoice or purchase bill using a unique invoice Id

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
}
```

```omg.response
Invoices
```
