# Item

```omg.type
type Item = {
  Code: string @maxLength(30)  // User defined item code (max length = 30)
  InventoryAssetAccountCode?: string  // The inventory asset account for the item. The account must be of type INVENTORY. The  COGSAccountCode in PurchaseDetails is also required to create a tracked item
  Name?: string @maxLength(50)  // The name of the item (max length = 50)
  IsSold?: boolean  // Boolean value, defaults to true. When IsSold is true the item will be available on sales transactions in the Xero UI. If IsSold is updated to false then Description and SalesDetails values will be nulled.
  IsPurchased?: boolean  // Boolean value, defaults to true. When IsPurchased is true the item is available for purchase transactions in the Xero UI. If IsPurchased is updated to false then PurchaseDescription and PurchaseDetails values will be nulled.
  Description?: string @maxLength(4000)  // The sales description of the item (max length = 4000)
  PurchaseDescription?: string @maxLength(4000)  // The purchase description of the item (max length = 4000)
  PurchaseDetails?: Purchase
  SalesDetails?: Purchase
  IsTrackedAsInventory?: boolean  // True for items that are tracked as inventory. An item will be tracked as inventory if the InventoryAssetAccountCode and COGSAccountCode are set.
  TotalCostPool?: number @format("double")  // The value of the item on hand. Calculated using average cost accounting.
  QuantityOnHand?: number @format("double")  // The quantity of the item on hand
  UpdatedDateUTC?: string  // Last modified date in UTC format
  ItemID?: uuid  // The Xero identifier for an Item
  StatusAttributeString?: string  // Status of object
  ValidationErrors?: ValidationError[]  // Displays array of validation error messages from the API
}
```
