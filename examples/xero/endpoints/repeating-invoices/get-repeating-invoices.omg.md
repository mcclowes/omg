---
method: GET
path: /RepeatingInvoices
operationId: getRepeatingInvoices
tags:
  - Accounting
summary: Retrieves repeating invoices
---

# Retrieves repeating invoices

```omg.query
{
  where?: string  // Filter by an any element
  order?: string  // Order by an any element
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
