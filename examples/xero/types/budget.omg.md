# Budget

```omg.type
type Budget = {
  BudgetID?: uuid  // Xero identifier
  Type?: "OVERALL" | "TRACKING"  // Type of Budget. OVERALL or TRACKING
  Description?: string @maxLength(255)  // The Budget description
  UpdatedDateUTC?: string  // UTC timestamp of last update to budget
  BudgetLines?: BudgetLine[]
  Tracking?: TrackingCategory[]
}
```
