# RepeatingInvoice

```omg.type
type RepeatingInvoice = {
  Type?: "ACCPAY" | "ACCREC"  // See Invoice Types
  Contact?: Contact
  Schedule?: Schedule
  LineItems?: LineItem[]  // See LineItems
  LineAmountTypes?: LineAmountTypes
  Reference?: string  // ACCREC only – additional reference number
  BrandingThemeID?: uuid  // See BrandingThemes
  CurrencyCode?: CurrencyCode
  Status?: "DRAFT" | "AUTHORISED" | "DELETED"  // One of the following - DRAFT or AUTHORISED – See Invoice Status Codes
  SubTotal?: number @format("double")  // Total of invoice excluding taxes
  TotalTax?: number @format("double")  // Total tax on invoice
  Total?: number @format("double")  // Total of Invoice tax inclusive (i.e. SubTotal + TotalTax)
  RepeatingInvoiceID?: uuid  // Xero generated unique identifier for repeating invoice template
  ID?: uuid  // Xero generated unique identifier for repeating invoice template
  HasAttachments?: boolean @default("false")  // Boolean to indicate if an invoice has an attachment
  Attachments?: Attachment[]  // Displays array of attachments from the API
  ApprovedForSending?: boolean @default("false")  // Boolean to indicate whether the invoice has been approved for sending
  SendCopy?: boolean @default("false")  // Boolean to indicate whether a copy is sent to sender's email
  MarkAsSent?: boolean @default("false")  // Boolean to indicate whether the invoice in the Xero app displays as "sent"
  IncludePDF?: boolean @default("false")  // Boolean to indicate whether to include PDF attachment
}
```
