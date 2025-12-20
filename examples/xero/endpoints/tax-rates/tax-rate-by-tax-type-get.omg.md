---
method: GET
path: /TaxRates/{TaxType}
operationId: getTaxRateByTaxType
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
      - accounting.settings.read
---

# Retrieves a specific tax rate according to given TaxType code

```omg.path
{
  TaxType: string  // A valid TaxType code
}
```

```omg.response
TaxRates
```

{{> headers/xero-tenant-id }}
