# BalanceDetails

```omg.type
type BalanceDetails = {
  Balance?: number @format("double")  // The opening balances of the account. Debits are positive, credits are negative values
  CurrencyCode?: string  // The currency of the balance (Not required for base currency)
  CurrencyRate?: number @format("double")  // (Optional) Exchange rate to base currency when money is spent or received. If not specified, XE rate for the day is applied
}
```
