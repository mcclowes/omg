# LineItemItem

```omg.type
type LineItemItem = {
  Code?: string @maxLength(30)  // User defined item code (max length = 30)
  Name?: string @maxLength(50)  // The name of the item (max length = 50)
  ItemID?: uuid  // The Xero identifier for an Item
}
```
