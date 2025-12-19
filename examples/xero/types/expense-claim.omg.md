# ExpenseClaim

```omg.type
type ExpenseClaim = {
  ExpenseClaimID?: uuid  // Xero generated unique identifier for an expense claim
  Status?: "SUBMITTED" | "AUTHORISED" | "PAID" | "VOIDED" | "DELETED"  // Current status of an expense claim – see status types
  Payments?: Payment[]  // See Payments
  User?: User
  Receipts?: Receipt[]
  UpdatedDateUTC?: string  // Last modified date UTC format
  Total?: number @format("double")  // The total of an expense claim being paid
  AmountDue?: number @format("double")  // The amount due to be paid for an expense claim
  AmountPaid?: number @format("double")  // The amount still to pay for an expense claim
  PaymentDueDate?: string  // The date when the expense claim is due to be paid YYYY-MM-DD
  ReportingDate?: string  // The date the expense claim will be reported in Xero YYYY-MM-DD
  ReceiptID?: uuid  // The Xero identifier for the Receipt e.g. e59a2c7f-1306-4078-a0f3-73537afcbba9
}
```
