---
method: GET
path: /BrandingThemes
operationId: getBrandingThemes
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
      - accounting.settings.read
---

# Retrieves all the branding themes

```omg.response
BrandingThemes
```

{{> headers/xero-tenant-id }}
