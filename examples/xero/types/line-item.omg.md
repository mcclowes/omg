# LineItem

```omg.type
type LineItem = {
  LineItemID?: uuid  // LineItem unique ID
  Description?: string  // Description needs to be at least 1 char long. A line item with just a description (i.e no unit amount or quantity) can be created by specifying just a <Description> element that contains at least 1 character
  Quantity?: number @format("double")  // LineItem Quantity
  UnitAmount?: number @format("double")  // LineItem Unit Amount
  ItemCode?: string  // See Items
  AccountCode?: string  // See Accounts
  AccountID?: uuid  // The associated account ID related to this line item
  TaxType?: string  // The tax type from TaxRates
  TaxAmount?: number @format("double")  // The tax amount is auto calculated as a percentage of the line amount (see below) based on the tax rate. This value can be overriden if the calculated <TaxAmount> is not correct.
  Item?: LineItemItem
  LineAmount?: number @format("double")  // If you wish to omit either the Quantity or UnitAmount you can provide a LineAmount and Xero will calculate the missing amount for you. The line amount reflects the discounted price if either a DiscountRate or DiscountAmount has been used i.e. LineAmount = Quantity * Unit Amount * ((100 - DiscountRate)/100) or LineAmount = (Quantity * UnitAmount) - DiscountAmount
  Tracking?: LineItemTracking[]  // Optional Tracking Category – see Tracking.  Any LineItem can have a  maximum of 2 <TrackingCategory> elements.
  DiscountRate?: number @format("double")  // Percentage discount being applied to a line item (only supported on  ACCREC invoices – ACC PAY invoices and credit notes in Xero do not support discounts
  DiscountAmount?: number @format("double")  // Discount amount being applied to a line item. Only supported on ACCREC invoices and quotes. ACCPAY invoices and credit notes in Xero do not support discounts.
  RepeatingInvoiceID?: uuid  // The Xero identifier for a Repeating Invoice
  Taxability?: "TAXABLE" | "NON_TAXABLE" | "EXEMPT" | "PART_TAXABLE" | "NOT_APPLICABLE"  // The type of taxability
  SalesTaxCodeId?: number  // The ID of the sales tax code
  TaxBreakdown?: TaxBreakdownComponent[]  // An array of tax components defined for this line item
}
```
