# ManualJournal

```omg.type
type ManualJournal = {
  Narration: string  // Description of journal being posted
  JournalLines?: ManualJournalLine[]  // See JournalLines
  Date?: string  // Date journal was posted – YYYY-MM-DD
  LineAmountTypes?: LineAmountTypes
  Status?: "DRAFT" | "POSTED" | "DELETED" | "VOIDED" | "ARCHIVED"  // See Manual Journal Status Codes
  Url?: string  // Url link to a source document – shown as “Go to [appName]” in the Xero app
  ShowOnCashBasisReports?: boolean  // Boolean – default is true if not specified
  HasAttachments?: boolean @default("false")  // Boolean to indicate if a manual journal has an attachment
  UpdatedDateUTC?: string  // Last modified date UTC format
  ManualJournalID?: uuid  // The Xero identifier for a Manual Journal
  StatusAttributeString?: string  // A string to indicate if a invoice status
  Warnings?: ValidationError[]  // Displays array of warning messages from the API
  ValidationErrors?: ValidationError[]  // Displays array of validation error messages from the API
  Attachments?: Attachment[]  // Displays array of attachments from the API
}
```
