---
method: GET
path: /BrandingThemes/{BrandingThemeID}
operationId: getBrandingTheme
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
      - accounting.settings.read
---

# Retrieves a specific branding theme using a unique branding theme Id

```omg.path
{
  BrandingThemeID: uuid  // Unique identifier for a Branding Theme
}
```

```omg.response
BrandingThemes
```

{{> headers/xero-tenant-id }}
