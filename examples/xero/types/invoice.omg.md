# Invoice

```omg.type
type Invoice = {
  Type?: "ACCPAY" | "ACCPAYCREDIT" | "APOVERPAYMENT" | "APPREPAYMENT" | "ACCREC" | "ACCRECCREDIT" | "AROVERPAYMENT" | "ARPREPAYMENT"  // See Invoice Types
  Contact?: Contact
  LineItems?: LineItem[]  // See LineItems
  Date?: string  // Date invoice was issued – YYYY-MM-DD. If the Date element is not specified it will default to the current date based on the timezone setting of the organisation
  DueDate?: string  // Date invoice is due – YYYY-MM-DD
  LineAmountTypes?: LineAmountTypes
  InvoiceNumber?: string @maxLength(255)  // ACCREC – Unique alpha numeric code identifying invoice (when missing will auto-generate from your Organisation Invoice Settings) (max length = 255)
  Reference?: string  // ACCREC only – additional reference number
  BrandingThemeID?: uuid  // See BrandingThemes
  Url?: string  // URL link to a source document – shown as “Go to [appName]” in the Xero app
  CurrencyCode?: CurrencyCode
  CurrencyRate?: number @format("double")  // The currency rate for a multicurrency invoice. If no rate is specified, the XE.com day rate is used. (max length = [18].[6])
  Status?: "DRAFT" | "SUBMITTED" | "DELETED" | "AUTHORISED" | "PAID" | "VOIDED"  // See Invoice Status Codes
  SentToContact?: boolean  // Boolean to set whether the invoice in the Xero app should be marked as “sent”. This can be set only on invoices that have been approved
  ExpectedPaymentDate?: string  // Shown on sales invoices (Accounts Receivable) when this has been set
  PlannedPaymentDate?: string  // Shown on bills (Accounts Payable) when this has been set
  CISDeduction?: number @format("double")  // CIS deduction for UK contractors
  CISRate?: number @format("double")  // CIS Deduction rate for the organisation
  SubTotal?: number @format("double")  // Total of invoice excluding taxes
  TotalTax?: number @format("double")  // Total tax on invoice
  Total?: number @format("double")  // Total of Invoice tax inclusive (i.e. SubTotal + TotalTax). This will be ignored if it doesn’t equal the sum of the LineAmounts
  TotalDiscount?: number @format("double")  // Total of discounts applied on the invoice line items
  InvoiceID?: uuid  // Xero generated unique identifier for invoice
  RepeatingInvoiceID?: uuid  // Xero generated unique identifier for repeating invoices
  HasAttachments?: boolean @default("false")  // boolean to indicate if an invoice has an attachment
  IsDiscounted?: boolean  // boolean to indicate if an invoice has a discount
  Payments?: Payment[]  // See Payments
  Prepayments?: Prepayment[]  // See Prepayments
  Overpayments?: Overpayment[]  // See Overpayments
  AmountDue?: number @format("double")  // Amount remaining to be paid on invoice
  AmountPaid?: number @format("double")  // Sum of payments received for invoice
  FullyPaidOnDate?: string  // The date the invoice was fully paid. Only returned on fully paid invoices
  AmountCredited?: number @format("double")  // Sum of all credit notes, over-payments and pre-payments applied to invoice
  UpdatedDateUTC?: string  // Last modified date UTC format
  CreditNotes?: CreditNote[]  // Details of credit notes that have been applied to an invoice
  Attachments?: Attachment[]  // Displays array of attachments from the API
  HasErrors?: boolean @default("false")  // A boolean to indicate if a invoice has an validation errors
  StatusAttributeString?: string  // A string to indicate if a invoice status
  ValidationErrors?: ValidationError[]  // Displays array of validation error messages from the API
  Warnings?: ValidationError[]  // Displays array of warning messages from the API
  InvoiceAddresses?: InvoiceAddress[]  // An array of addresses used to auto calculate sales tax
}
```
