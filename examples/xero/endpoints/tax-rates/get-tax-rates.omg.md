---
method: GET
path: /TaxRates
operationId: getTaxRates
tags:
  - Accounting
summary: Retrieves tax rates
---

# Retrieves tax rates

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
TaxRates
```
