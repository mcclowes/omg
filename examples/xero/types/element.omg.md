# Element

```omg.type
type Element = {
  ValidationErrors?: ValidationError[]  // Array of Validation Error message
  BatchPaymentID?: uuid  // Unique ID for batch payment object with validation error
  BankTransactionID?: uuid
  CreditNoteID?: uuid
  ContactID?: uuid
  InvoiceID?: uuid
  ItemID?: uuid
  PurchaseOrderID?: uuid
}
```
