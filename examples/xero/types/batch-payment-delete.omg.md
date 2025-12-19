# BatchPaymentDelete

```omg.type
type BatchPaymentDelete = {
  BatchPaymentID: uuid  // The Xero generated unique identifier for the bank transaction (read-only)
  Status: string @default("DELETED")  // The status of the batch payment.
}
```
