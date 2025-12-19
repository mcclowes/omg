# Receipt

```omg.type
type Receipt = {
  Date?: string  // Date of receipt – YYYY-MM-DD
  Contact?: Contact
  LineItems?: LineItem[]
  User?: User
  Reference?: string  // Additional reference number
  LineAmountTypes?: LineAmountTypes
  SubTotal?: number @format("double")  // Total of receipt excluding taxes
  TotalTax?: number @format("double")  // Total tax on receipt
  Total?: number @format("double")  // Total of receipt tax inclusive (i.e. SubTotal + TotalTax)
  ReceiptID?: uuid  // Xero generated unique identifier for receipt
  Status?: "DRAFT" | "SUBMITTED" | "AUTHORISED" | "DECLINED" | "VOIDED"  // Current status of receipt – see status types
  ReceiptNumber?: string  // Xero generated sequence number for receipt in current claim for a given user
  UpdatedDateUTC?: string  // Last modified date UTC format
  HasAttachments?: boolean @default("false")  // boolean to indicate if a receipt has an attachment
  Url?: string  // URL link to a source document – shown as “Go to [appName]” in the Xero app
  ValidationErrors?: ValidationError[]  // Displays array of validation error messages from the API
  Warnings?: ValidationError[]  // Displays array of warning messages from the API
  Attachments?: Attachment[]  // Displays array of attachments from the API
}
```
