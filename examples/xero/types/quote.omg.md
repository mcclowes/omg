# Quote

```omg.type
type Quote = {
  QuoteID?: uuid  // QuoteID GUID is automatically generated and is returned after create or GET.
  QuoteNumber?: string @maxLength(255)  // Unique alpha numeric code identifying a quote (Max Length = 255)
  Reference?: string @maxLength(4000)  // Additional reference number
  Terms?: string @maxLength(4000)  // Terms of the quote
  Contact?: Contact
  LineItems?: LineItem[]  // See LineItems
  Date?: string  // Date quote was issued – YYYY-MM-DD. If the Date element is not specified it will default to the current date based on the timezone setting of the organisation
  DateString?: string  // Date the quote was issued (YYYY-MM-DD)
  ExpiryDate?: string  // Date the quote expires – YYYY-MM-DD.
  ExpiryDateString?: string  // Date the quote expires – YYYY-MM-DD.
  Status?: QuoteStatusCodes
  CurrencyCode?: CurrencyCode
  CurrencyRate?: number @format("double")  // The currency rate for a multicurrency quote
  SubTotal?: number @format("double")  // Total of quote excluding taxes.
  TotalTax?: number @format("double")  // Total tax on quote
  Total?: number @format("double")  // Total of Quote tax inclusive (i.e. SubTotal + TotalTax). This will be ignored if it doesn’t equal the sum of the LineAmounts
  TotalDiscount?: number @format("double")  // Total of discounts applied on the quote line items
  Title?: string @maxLength(100)  // Title text for the quote
  Summary?: string @maxLength(3000)  // Summary text for the quote
  BrandingThemeID?: uuid  // See BrandingThemes
  UpdatedDateUTC?: string  // Last modified date UTC format
  LineAmountTypes?: QuoteLineAmountTypes
  StatusAttributeString?: string  // A string to indicate if a invoice status
  ValidationErrors?: ValidationError[]  // Displays array of validation error messages from the API
}
```
