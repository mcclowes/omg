---
method: POST
path: /BrandingThemes/{BrandingThemeID}/PaymentServices
operationId: createBrandingThemePaymentServices
tags:
  - Accounting
summary: Creates a new custom payment service for a specific branding theme
---

# Creates a new custom payment service for a specific branding theme

```omg.path
{
  BrandingThemeID: uuid  // Unique identifier for a Branding Theme
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
PaymentServices
```

```omg.response
PaymentServices
```

```omg.response.400
Error
```
