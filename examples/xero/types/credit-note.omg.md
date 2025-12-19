# CreditNote

```omg.type
type CreditNote = {
  Type?: "ACCPAYCREDIT" | "ACCRECCREDIT"  // See Credit Note Types
  Contact?: Contact
  Date?: string  // The date the credit note is issued YYYY-MM-DD. If the Date element is not specified then it will default to the current date based on the timezone setting of the organisation
  DueDate?: string  // Date invoice is due – YYYY-MM-DD
  Status?: "DRAFT" | "SUBMITTED" | "DELETED" | "AUTHORISED" | "PAID" | "VOIDED"  // See Credit Note Status Codes
  LineAmountTypes?: LineAmountTypes
  LineItems?: LineItem[]  // See Invoice Line Items
  SubTotal?: number @format("double")  // The subtotal of the credit note excluding taxes
  TotalTax?: number @format("double")  // The total tax on the credit note
  Total?: number @format("double")  // The total of the Credit Note(subtotal + total tax)
  CISDeduction?: number @format("double")  // CIS deduction for UK contractors
  CISRate?: number @format("double")  // CIS Deduction rate for the organisation
  UpdatedDateUTC?: string  // UTC timestamp of last update to the credit note
  CurrencyCode?: CurrencyCode
  FullyPaidOnDate?: string  // Date when credit note was fully paid(UTC format)
  CreditNoteID?: uuid  // Xero generated unique identifier
  CreditNoteNumber?: string  // ACCRECCREDIT – Unique alpha numeric code identifying credit note (when missing will auto-generate from your Organisation Invoice Settings)
  Reference?: string  // ACCRECCREDIT only – additional reference number
  SentToContact?: boolean  // Boolean to set whether the credit note in the Xero app should be marked as “sent”. This can be set only on credit notes that have been approved
  CurrencyRate?: number @format("double")  // The currency rate for a multicurrency invoice. If no rate is specified, the XE.com day rate is used
  RemainingCredit?: number @format("double")  // The remaining credit balance on the Credit Note
  Allocations?: Allocation[]  // See Allocations
  AppliedAmount?: number @format("double")  // The amount of applied to an invoice
  Payments?: Payment[]  // See Payments
  BrandingThemeID?: uuid  // See BrandingThemes
  StatusAttributeString?: string  // A string to indicate if a invoice status
  HasAttachments?: boolean @default("false")  // boolean to indicate if a credit note has an attachment
  HasErrors?: boolean @default("false")  // A boolean to indicate if a credit note has an validation errors
  ValidationErrors?: ValidationError[]  // Displays array of validation error messages from the API
  Warnings?: ValidationError[]  // Displays array of warning messages from the API
  InvoiceAddresses?: InvoiceAddress[]  // An array of addresses used to auto calculate sales tax
}
```
