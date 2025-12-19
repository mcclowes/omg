---
method: GET
path: /Currencies
operationId: getCurrencies
tags:
  - Accounting
summary: Retrieves currencies for your Xero organisation
---

# Retrieves currencies for your Xero organisation

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
Currencies
```
