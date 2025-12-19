# BudgetBalance

```omg.type
type BudgetBalance = {
  Period?: string  // Period the amount applies to (e.g. “2019-08”)
  Amount?: number @format("double")  // LineItem Quantity
  UnitAmount?: number @format("double")  // Budgeted amount
  Notes?: string @maxLength(255)  // Any footnotes associated with this balance
}
```
