# BankTransfer

```omg.type
type BankTransfer = {
  FromBankAccount: Account
  ToBankAccount: Account
  Amount: number @format("double")  // amount of the transaction
  Date?: string  // The date of the Transfer YYYY-MM-DD
  BankTransferID?: uuid  // The identifier of the Bank Transfer
  CurrencyRate?: number @format("double")  // The currency rate
  FromBankTransactionID?: uuid  // The Bank Transaction ID for the source account
  ToBankTransactionID?: uuid  // The Bank Transaction ID for the destination account
  FromIsReconciled?: boolean @default("false")  // The Bank Transaction boolean to show if it is reconciled for the source account
  ToIsReconciled?: boolean @default("false")  // The Bank Transaction boolean to show if it is reconciled for the destination account
  Reference?: string  // Reference for the transactions.
  HasAttachments?: boolean @default("false")  // Boolean to indicate if a Bank Transfer has an attachment
  CreatedDateUTC?: string  // UTC timestamp of creation date of bank transfer
  ValidationErrors?: ValidationError[]  // Displays array of validation error messages from the API
}
```
