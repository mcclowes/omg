# Allocation

```omg.type
type Allocation = {
  AllocationID?: uuid  // Xero generated unique identifier
  Invoice: Invoice
  Overpayment?: Overpayment
  Prepayment?: Prepayment
  CreditNote?: CreditNote
  Amount: number @format("double")  // the amount being applied to the invoice
  Date: string  // the date the allocation is applied YYYY-MM-DD.
  IsDeleted?: boolean  // A flag that returns true when the allocation is succesfully deleted
  StatusAttributeString?: string  // A string to indicate if a invoice status
  ValidationErrors?: ValidationError[]  // Displays array of validation error messages from the API
}
```
