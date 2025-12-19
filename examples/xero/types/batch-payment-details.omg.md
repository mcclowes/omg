# BatchPaymentDetails

```omg.type
type BatchPaymentDetails = {
  BankAccountNumber?: string  // Bank account number for use with Batch Payments
  BankAccountName?: string  // Name of bank for use with Batch Payments
  Details?: string  // (Non-NZ Only) These details are sent to the org’s bank as a reference for the batch payment transaction. They will also show with the batch payment transaction in the bank reconciliation Find & Match screen. Depending on your individual bank, the detail may also show on the bank statement imported into Xero. Maximum field length = 18
  Code?: string @maxLength(12)  // (NZ Only) Optional references for the batch payment transaction. It will also show with the batch payment transaction in the bank reconciliation Find & Match screen. Depending on your individual bank, the detail may also show on the bank statement you import into Xero.
  Reference?: string @maxLength(12)  // (NZ Only) Optional references for the batch payment transaction. It will also show with the batch payment transaction in the bank reconciliation Find & Match screen. Depending on your individual bank, the detail may also show on the bank statement you import into Xero.
}
```
