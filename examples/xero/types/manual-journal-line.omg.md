# ManualJournalLine

```omg.type
type ManualJournalLine = {
  LineAmount?: number @format("double")  // total for line. Debits are positive, credits are negative value
  AccountCode?: string  // See Accounts
  AccountID?: uuid  // See Accounts
  Description?: string  // Description for journal line
  TaxType?: string  // The tax type from TaxRates
  Tracking?: TrackingCategory[]  // Optional Tracking Category – see Tracking. Any JournalLine can have a maximum of 2 <TrackingCategory> elements.
  TaxAmount?: number @format("double")  // The calculated tax amount based on the TaxType and LineAmount
  IsBlank?: boolean  // is the line blank
}
```
