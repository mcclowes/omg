# LinkedTransaction

```omg.type
type LinkedTransaction = {
  SourceTransactionID?: uuid  // Filter by the SourceTransactionID. Get all the linked transactions created from a particular ACCPAY invoice
  SourceLineItemID?: uuid  // The line item identifier from the source transaction.
  ContactID?: uuid  // Filter by the combination of ContactID and Status. Get all the linked transactions that have been assigned to a particular customer and have a particular status e.g. GET /LinkedTransactions?ContactID=4bb34b03-3378-4bb2-a0ed-6345abf3224e&Status=APPROVED.
  TargetTransactionID?: uuid  // Filter by the TargetTransactionID. Get all the linked transactions  allocated to a particular ACCREC invoice
  TargetLineItemID?: uuid  // The line item identifier from the target transaction. It is possible  to link multiple billable expenses to the same TargetLineItemID.
  LinkedTransactionID?: uuid  // The Xero identifier for an Linked Transaction e.g./LinkedTransactions/297c2dc5-cc47-4afd-8ec8-74990b8761e9
  Status?: "APPROVED" | "DRAFT" | "ONDRAFT" | "BILLED" | "VOIDED"  // Filter by the combination of ContactID and Status. Get all the linked transactions that have been assigned to a particular customer and have a particular status e.g. GET /LinkedTransactions?ContactID=4bb34b03-3378-4bb2-a0ed-6345abf3224e&Status=APPROVED.
  Type?: "BILLABLEEXPENSE"  // This will always be BILLABLEEXPENSE. More types may be added in future.
  UpdatedDateUTC?: string  // The last modified date in UTC format
  SourceTransactionTypeCode?: "ACCPAY" | "SPEND"  // The Type of the source tranasction. This will be ACCPAY if the linked transaction was created from an invoice and SPEND if it was created from a bank transaction.
  ValidationErrors?: ValidationError[]  // Displays array of validation error messages from the API
}
```
