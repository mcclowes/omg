# Overpayment

```omg.type
type Overpayment = {
  Type?: "RECEIVE-OVERPAYMENT" | "SPEND-OVERPAYMENT" | "AROVERPAYMENT"  // See Overpayment Types
  Contact?: Contact
  Date?: string  // The date the overpayment is created YYYY-MM-DD
  Status?: "AUTHORISED" | "PAID" | "VOIDED"  // See Overpayment Status Codes
  LineAmountTypes?: LineAmountTypes
  LineItems?: LineItem[]  // See Overpayment Line Items
  SubTotal?: number @format("double")  // The subtotal of the overpayment excluding taxes
  TotalTax?: number @format("double")  // The total tax on the overpayment
  Total?: number @format("double")  // The total of the overpayment (subtotal + total tax)
  UpdatedDateUTC?: string  // UTC timestamp of last update to the overpayment
  CurrencyCode?: CurrencyCode
  OverpaymentID?: uuid  // Xero generated unique identifier
  CurrencyRate?: number @format("double")  // The currency rate for a multicurrency overpayment. If no rate is specified, the XE.com day rate is used
  RemainingCredit?: number @format("double")  // The remaining credit balance on the overpayment
  Allocations?: Allocation[]  // See Allocations
  AppliedAmount?: number @format("double")  // The amount of applied to an invoice
  Payments?: Payment[]  // See Payments
  HasAttachments?: boolean @default("false")  // boolean to indicate if a overpayment has an attachment
  Attachments?: Attachment[]  // See Attachments
}
```
