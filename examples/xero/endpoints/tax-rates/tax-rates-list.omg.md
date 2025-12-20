---
method: GET
path: /TaxRates
operationId: getTaxRates
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
      - accounting.settings.read
---

# Retrieves tax rates

```omg.response
TaxRates
```

{{> query/where }}

{{> query/order }}

{{> headers/xero-tenant-id }}
