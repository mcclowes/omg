# BatchPayment

```omg.type
type BatchPayment = {
  Account?: Account
  Reference?: string @maxLength(255)  // (NZ Only) Optional references for the batch payment transaction. It will also show with the batch payment transaction in the bank reconciliation Find & Match screen. Depending on your individual bank, the detail may also show on the bank statement you import into Xero.
  Particulars?: string @maxLength(12)  // (NZ Only) Optional references for the batch payment transaction. It will also show with the batch payment transaction in the bank reconciliation Find & Match screen. Depending on your individual bank, the detail may also show on the bank statement you import into Xero.
  Code?: string @maxLength(12)  // (NZ Only) Optional references for the batch payment transaction. It will also show with the batch payment transaction in the bank reconciliation Find & Match screen. Depending on your individual bank, the detail may also show on the bank statement you import into Xero.
  Details?: string  // (Non-NZ Only) These details are sent to the org’s bank as a reference for the batch payment transaction. They will also show with the batch payment transaction in the bank reconciliation Find & Match screen. Depending on your individual bank, the detail may also show on the bank statement imported into Xero. Maximum field length = 18
  Narrative?: string @maxLength(18)  // (UK Only) Only shows on the statement line in Xero. Max length =18
  BatchPaymentID?: uuid  // The Xero generated unique identifier for the bank transaction (read-only)
  DateString?: string  // Date the payment is being made (YYYY-MM-DD) e.g. 2009-09-06
  Date?: string  // Date the payment is being made (YYYY-MM-DD) e.g. 2009-09-06
  Amount?: number @format("double")  // The amount of the payment. Must be less than or equal to the outstanding amount owing on the invoice e.g. 200.00
  Payments?: Payment[]  // An array of payments
  Type?: "PAYBATCH" | "RECBATCH"  // PAYBATCH for bill payments or RECBATCH for sales invoice payments (read-only)
  Status?: "AUTHORISED" | "DELETED"  // AUTHORISED or DELETED (read-only). New batch payments will have a status of AUTHORISED. It is not possible to delete batch payments via the API.
  TotalAmount?: number @format("double")  // The total of the payments that make up the batch (read-only)
  UpdatedDateUTC?: string  // UTC timestamp of last update to the payment
  IsReconciled?: boolean  // Booelan that tells you if the batch payment has been reconciled (read-only)
  ValidationErrors?: ValidationError[]  // Displays array of validation error messages from the API
}
```
