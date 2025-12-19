---
method: POST
path: /RepeatingInvoices/{RepeatingInvoiceID}
operationId: updateRepeatingInvoice
tags:
  - Accounting
summary: Deletes a specific repeating invoice template
---

# Deletes a specific repeating invoice template

```omg.path
{
  RepeatingInvoiceID: uuid  // Unique identifier for a Repeating Invoice
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
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
