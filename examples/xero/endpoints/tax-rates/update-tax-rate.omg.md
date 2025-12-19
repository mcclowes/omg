---
method: POST
path: /TaxRates
operationId: updateTaxRate
tags:
  - Accounting
summary: Updates tax rates
---

# Updates tax rates

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
