---
method: GET
path: /BrandingThemes/{BrandingThemeID}
operationId: getBrandingTheme
tags:
  - Accounting
summary: Retrieves a specific branding theme using a unique branding theme Id
---

# Retrieves a specific branding theme using a unique branding theme Id

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
BrandingThemes
```
