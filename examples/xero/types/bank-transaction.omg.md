# BankTransaction

```omg.type
type BankTransaction = {
  Type: "RECEIVE" | "RECEIVE-OVERPAYMENT" | "RECEIVE-PREPAYMENT" | "SPEND" | "SPEND-OVERPAYMENT" | "SPEND-PREPAYMENT" | "RECEIVE-TRANSFER" | "SPEND-TRANSFER"  // See Bank Transaction Types
  Contact?: Contact
  LineItems: LineItem[]  // See LineItems
  BankAccount: Account
  IsReconciled?: boolean  // Boolean to show if transaction is reconciled
  Date?: string  // Date of transaction – YYYY-MM-DD
  Reference?: string  // Reference for the transaction. Only supported for SPEND and RECEIVE transactions.
  CurrencyCode?: CurrencyCode
  CurrencyRate?: number @format("double")  // Exchange rate to base currency when money is spent or received. e.g.0.7500 Only used for bank transactions in non base currency. If this isn’t specified for non base currency accounts then either the user-defined rate (preference) or the XE.com day rate will be used. Setting currency is only supported on overpayments.
  Url?: string  // URL link to a source document – shown as “Go to App Name”
  Status?: "AUTHORISED" | "DELETED" | "VOIDED"  // See Bank Transaction Status Codes
  LineAmountTypes?: LineAmountTypes
  SubTotal?: number @format("double")  // Total of bank transaction excluding taxes
  TotalTax?: number @format("double")  // Total tax on bank transaction
  Total?: number @format("double")  // Total of bank transaction tax inclusive
  BankTransactionID?: uuid  // Xero generated unique identifier for bank transaction
  PrepaymentID?: uuid  // Xero generated unique identifier for a Prepayment. This will be returned on BankTransactions with a Type of SPEND-PREPAYMENT or RECEIVE-PREPAYMENT
  OverpaymentID?: uuid  // Xero generated unique identifier for an Overpayment. This will be returned on BankTransactions with a Type of SPEND-OVERPAYMENT or RECEIVE-OVERPAYMENT
  UpdatedDateUTC?: string  // Last modified date UTC format
  HasAttachments?: boolean @default("false")  // Boolean to indicate if a bank transaction has an attachment
  StatusAttributeString?: string  // A string to indicate if a invoice status
  ValidationErrors?: ValidationError[]  // Displays array of validation error messages from the API
}
```
