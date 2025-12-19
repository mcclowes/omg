---
method: POST
path: /Invoices/{InvoiceID}/Email
operationId: emailInvoice
tags:
  - Accounting
summary: Sends a copy of a specific invoice to related contact via email
---

# Sends a copy of a specific invoice to related contact via email

```omg.path
{
  InvoiceID: uuid  // Unique identifier for an Invoice
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
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
