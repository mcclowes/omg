# Prepayment

```omg.type
type Prepayment = {
  Type?: "RECEIVE-PREPAYMENT" | "SPEND-PREPAYMENT" | "ARPREPAYMENT" | "APPREPAYMENT"  // See Prepayment Types
  Contact?: Contact
  Date?: string  // The date the prepayment is created YYYY-MM-DD
  Status?: "AUTHORISED" | "PAID" | "VOIDED"  // See Prepayment Status Codes
  LineAmountTypes?: LineAmountTypes
  LineItems?: LineItem[]  // See Prepayment Line Items
  SubTotal?: number @format("double")  // The subtotal of the prepayment excluding taxes
  TotalTax?: number @format("double")  // The total tax on the prepayment
  Total?: number @format("double")  // The total of the prepayment(subtotal + total tax)
  Reference?: string  // Returns Invoice number field. Reference field isn't available.
  UpdatedDateUTC?: string  // UTC timestamp of last update to the prepayment
  CurrencyCode?: CurrencyCode
  PrepaymentID?: uuid  // Xero generated unique identifier
  CurrencyRate?: number @format("double")  // The currency rate for a multicurrency prepayment. If no rate is specified, the XE.com day rate is used
  RemainingCredit?: number @format("double")  // The remaining credit balance on the prepayment
  Allocations?: Allocation[]  // See Allocations
  Payments?: Payment[]  // See Payments
  AppliedAmount?: number @format("double")  // The amount of applied to an invoice
  HasAttachments?: boolean @default("false")  // boolean to indicate if a prepayment has an attachment
  Attachments?: Attachment[]  // See Attachments
}
```
