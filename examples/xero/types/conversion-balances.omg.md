# ConversionBalances

```omg.type
type ConversionBalances = {
  AccountCode?: string  // The account code for a account
  Balance?: number @format("double")  // The opening balances of the account. Debits are positive, credits are negative values
  BalanceDetails?: BalanceDetails[]
}
```
