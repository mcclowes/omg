---
method: GET
path: /BrandingThemes/{BrandingThemeID}/PaymentServices
operationId: getBrandingThemePaymentServices
tags:
  - Accounting
summary: Retrieves the payment services for a specific branding theme
---

# Retrieves the payment services for a specific branding theme

```omg.path
{
  BrandingThemeID: uuid  // Unique identifier for a Branding Theme
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
PaymentServices
```
