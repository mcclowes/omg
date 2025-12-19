---
method: PUT
path: /TaxRates
operationId: createTaxRates
tags:
  - Accounting
summary: Creates one or more tax rates
---

# Creates one or more tax rates

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
TaxRates
```

```omg.response
TaxRates
```

```omg.response.400
Error
```
