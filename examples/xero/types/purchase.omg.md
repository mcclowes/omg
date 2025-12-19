# Purchase

```omg.type
type Purchase = {
  UnitPrice?: number @format("double")  // Unit Price of the item. By default UnitPrice is rounded to two decimal places. You can use 4 decimal places by adding the unitdp=4 querystring parameter to your request.
  AccountCode?: string  // Default account code to be used for purchased/sale. Not applicable to the purchase details of tracked items
  COGSAccountCode?: string  // Cost of goods sold account. Only applicable to the purchase details of tracked items.
  TaxType?: string  // The tax type from TaxRates
}
```
