# BrandingTheme

```omg.type
type BrandingTheme = {
  BrandingThemeID?: uuid  // Xero identifier
  Name?: string  // Name of branding theme
  LogoUrl?: string  // The location of the image file used as the logo on this branding theme
  Type?: "INVOICE"  // Always INVOICE
  SortOrder?: integer  // Integer – ranked order of branding theme. The default branding theme has a value of 0
  CreatedDateUTC?: string  // UTC timestamp of creation date of branding theme
}
```
