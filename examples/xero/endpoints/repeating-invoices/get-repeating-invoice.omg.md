---
method: GET
path: /RepeatingInvoices/{RepeatingInvoiceID}
operationId: getRepeatingInvoice
tags:
  - Accounting
summary: Retrieves a specific repeating invoice by using a unique repeating invoice Id
---

# Retrieves a specific repeating invoice by using a unique repeating invoice Id

```omg.path
{
  RepeatingInvoiceID: uuid  // Unique identifier for a Repeating Invoice
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
RepeatingInvoices
```
