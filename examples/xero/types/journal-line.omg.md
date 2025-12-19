# JournalLine

```omg.type
type JournalLine = {
  JournalLineID?: uuid  // Xero identifier for Journal
  AccountID?: uuid  // See Accounts
  AccountCode?: string  // See Accounts
  AccountType?: AccountType
  AccountName?: string  // See AccountCodes
  Description?: string  // The description from the source transaction line item. Only returned if populated.
  NetAmount?: number @format("double")  // Net amount of journal line. This will be a positive value for a debit and negative for a credit
  GrossAmount?: number @format("double")  // Gross amount of journal line (NetAmount + TaxAmount).
  TaxAmount?: number @format("double")  // Total tax on a journal line
  TaxType?: string  // The tax type from taxRates
  TaxName?: string  // see TaxRates
  TrackingCategories?: TrackingCategory[]  // Optional Tracking Category – see Tracking. Any JournalLine can have a maximum of 2 <TrackingCategory> elements.
}
```
