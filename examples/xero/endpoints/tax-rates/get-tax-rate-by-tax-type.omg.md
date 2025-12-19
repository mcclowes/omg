---
method: GET
path: /TaxRates/{TaxType}
operationId: getTaxRateByTaxType
tags:
  - Accounting
summary: Retrieves a specific tax rate according to given TaxType code
---

# Retrieves a specific tax rate according to given TaxType code

```omg.path
{
  TaxType: string  // A valid TaxType code
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
