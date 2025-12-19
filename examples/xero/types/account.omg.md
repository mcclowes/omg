# Account

```omg.type
type Account = {
  Code?: string  // Customer defined alpha numeric account code e.g 200 or SALES (max length = 10)
  Name?: string @maxLength(150)  // Name of account (max length = 150)
  AccountID?: uuid  // The Xero identifier for an account – specified as a string following  the endpoint name   e.g. /297c2dc5-cc47-4afd-8ec8-74990b8761e9
  Type?: AccountType
  BankAccountNumber?: string  // For bank accounts only (Account Type BANK)
  Status?: "ACTIVE" | "ARCHIVED" | "DELETED"  // Accounts with a status of ACTIVE can be updated to ARCHIVED. See Account Status Codes
  Description?: string  // Description of the Account. Valid for all types of accounts except bank accounts (max length = 4000)
  BankAccountType?: "BANK" | "CREDITCARD" | "PAYPAL" | "NONE" | ""  // For bank accounts only. See Bank Account types
  CurrencyCode?: CurrencyCode
  TaxType?: string  // The tax type from taxRates
  EnablePaymentsToAccount?: boolean  // Boolean – describes whether account can have payments applied to it
  ShowInExpenseClaims?: boolean  // Boolean – describes whether account code is available for use with expense claims
  Class?: "ASSET" | "EQUITY" | "EXPENSE" | "LIABILITY" | "REVENUE"  // See Account Class Types
  SystemAccount?: "DEBTORS" | "CREDITORS" | "BANKCURRENCYGAIN" | "GST" | "GSTONIMPORTS" | "HISTORICAL" | "REALISEDCURRENCYGAIN" | "RETAINEDEARNINGS" | "ROUNDING" | "TRACKINGTRANSFERS" | "UNPAIDEXPCLM" | "UNREALISEDCURRENCYGAIN" | "WAGEPAYABLES" | "CISASSETS" | "CISASSET" | "CISLABOUR" | "CISLABOUREXPENSE" | "CISLABOURINCOME" | "CISLIABILITY" | "CISMATERIALS" | ""  // If this is a system account then this element is returned. See System Account types. Note that non-system accounts may have this element set as either “” or null.
  ReportingCode?: string  // Shown if set
  ReportingCodeName?: string  // Shown if set
  HasAttachments?: boolean @default("false")  // boolean to indicate if an account has an attachment (read only)
  UpdatedDateUTC?: string  // Last modified date UTC format
  AddToWatchlist?: boolean  // Boolean – describes whether the account is shown in the watchlist widget on the dashboard
  ValidationErrors?: ValidationError[]  // Displays array of validation error messages from the API
}
```
