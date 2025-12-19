# PurchaseOrder

```omg.type
type PurchaseOrder = {
  Contact?: Contact
  LineItems?: LineItem[]  // See LineItems
  Date?: string  // Date purchase order was issued – YYYY-MM-DD. If the Date element is not specified then it will default to the current date based on the timezone setting of the organisation
  DeliveryDate?: string  // Date the goods are to be delivered – YYYY-MM-DD
  LineAmountTypes?: LineAmountTypes
  PurchaseOrderNumber?: string  // Unique alpha numeric code identifying purchase order (when missing will auto-generate from your Organisation Invoice Settings)
  Reference?: string  // Additional reference number
  BrandingThemeID?: uuid  // See BrandingThemes
  CurrencyCode?: CurrencyCode
  Status?: "DRAFT" | "SUBMITTED" | "AUTHORISED" | "BILLED" | "DELETED"  // See Purchase Order Status Codes
  SentToContact?: boolean  // Boolean to set whether the purchase order should be marked as “sent”. This can be set only on purchase orders that have been approved or billed
  DeliveryAddress?: string  // The address the goods are to be delivered to
  AttentionTo?: string  // The person that the delivery is going to
  Telephone?: string  // The phone number for the person accepting the delivery
  DeliveryInstructions?: string  // A free text feild for instructions (500 characters max)
  ExpectedArrivalDate?: string  // The date the goods are expected to arrive.
  PurchaseOrderID?: uuid  // Xero generated unique identifier for purchase order
  CurrencyRate?: number @format("double")  // The currency rate for a multicurrency purchase order. If no rate is specified, the XE.com day rate is used.
  SubTotal?: number @format("double")  // Total of purchase order excluding taxes
  TotalTax?: number @format("double")  // Total tax on purchase order
  Total?: number @format("double")  // Total of Purchase Order tax inclusive (i.e. SubTotal + TotalTax)
  TotalDiscount?: number @format("double")  // Total of discounts applied on the purchase order line items
  HasAttachments?: boolean @default("false")  // boolean to indicate if a purchase order has an attachment
  UpdatedDateUTC?: string  // Last modified date UTC format
  StatusAttributeString?: string  // A string to indicate if a invoice status
  ValidationErrors?: ValidationError[]  // Displays array of validation error messages from the API
  Warnings?: ValidationError[]  // Displays array of warning messages from the API
  Attachments?: Attachment[]  // Displays array of attachments from the API
}
```
