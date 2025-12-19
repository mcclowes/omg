# ImportSummaryAccounts

```omg.type
type ImportSummaryAccounts = {
  Total?: integer @format("int32")  // The total number of accounts in the org
  New?: integer @format("int32")  // The number of new accounts created
  Updated?: integer @format("int32")  // The number of accounts updated
  Deleted?: integer @format("int32")  // The number of accounts deleted
  Locked?: integer @format("int32")  // The number of locked accounts
  System?: integer @format("int32")  // The number of system accounts
  Errored?: integer @format("int32")  // The number of accounts that had an error
  Present?: boolean
  NewOrUpdated?: integer @format("int32")  // The number of new or updated accounts
}
```
