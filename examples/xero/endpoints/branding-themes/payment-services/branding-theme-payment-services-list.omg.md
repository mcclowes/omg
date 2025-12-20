---
method: GET
path: /BrandingThemes/{BrandingThemeID}/PaymentServices
operationId: getBrandingThemePaymentServices
tags:
  - Accounting
security:
  - OAuth2:
      - paymentservices
extensions:
  x-excludeFromPreview: true
---

# Retrieves the payment services for a specific branding theme

```omg.path
{
  BrandingThemeID: uuid  // Unique identifier for a Branding Theme
}
```

```omg.response
PaymentServices
```

{{> headers/xero-tenant-id }}
