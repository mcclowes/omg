# Contact

```omg.type
type Contact = {
  ContactID?: uuid  // Xero identifier
  MergedToContactID?: uuid  // ID for the destination of a merged contact. Only returned when using paging or when fetching a contact by ContactId or ContactNumber.
  ContactNumber?: string @maxLength(50)  // This can be updated via the API only i.e. This field is read only on the Xero contact screen, used to identify contacts in external systems (max length = 50). If the Contact Number is used, this is displayed as Contact Code in the Contacts UI in Xero.
  AccountNumber?: string @maxLength(50)  // A user defined account number. This can be updated via the API and the Xero UI (max length = 50)
  ContactStatus?: "ACTIVE" | "ARCHIVED" | "GDPRREQUEST"  // Current status of a contact – see contact status types
  Name?: string @maxLength(255)  // Full name of contact/organisation (max length = 255)
  FirstName?: string @maxLength(255)  // First name of contact person (max length = 255)
  LastName?: string @maxLength(255)  // Last name of contact person (max length = 255)
  CompanyNumber?: string @maxLength(50)  // Company registration number (max length = 50)
  EmailAddress?: string @maxLength(255)  // Email address of contact person (umlauts not supported) (max length  = 255)
  ContactPersons?: ContactPerson[]  // See contact persons
  BankAccountDetails?: string  // Bank account number of contact
  TaxNumber?: string @maxLength(50)  // Tax number of contact – this is also known as the ABN (Australia), GST Number (New Zealand), VAT Number (UK) or Tax ID Number (US and global) in the Xero UI depending on which regionalized version of Xero you are using (max length = 50)
  TaxNumberType?: "SSN" | "EIN" | "ITIN" | "ATIN"  // Identifier of the regional type of tax number, such as US, UK, or other regional tax identifiers
  AccountsReceivableTaxType?: string  // The tax type from TaxRates
  AccountsPayableTaxType?: string  // The tax type from TaxRates
  Addresses?: Address[]  // Store certain address types for a contact – see address types
  Phones?: Phone[]  // Store certain phone types for a contact – see phone types
  IsSupplier?: boolean  // true or false – Boolean that describes if a contact that has any AP  invoices entered against them. Cannot be set via PUT or POST – it is automatically set when an accounts payable invoice is generated against this contact.
  IsCustomer?: boolean  // true or false – Boolean that describes if a contact has any AR invoices entered against them. Cannot be set via PUT or POST – it is automatically set when an accounts receivable invoice is generated against this contact.
  SalesDefaultLineAmountType?: "INCLUSIVE" | "EXCLUSIVE" | "NONE"  // The default sales line amount type for a contact. Only available when summaryOnly parameter or paging is used, or when fetch by ContactId or ContactNumber.
  PurchasesDefaultLineAmountType?: "INCLUSIVE" | "EXCLUSIVE" | "NONE"  // The default purchases line amount type for a contact Only available when summaryOnly parameter or paging is used, or when fetch by ContactId or ContactNumber.
  DefaultCurrency?: CurrencyCode
  XeroNetworkKey?: string  // Store XeroNetworkKey for contacts.
  SalesDefaultAccountCode?: string  // The default sales account code for contacts
  PurchasesDefaultAccountCode?: string  // The default purchases account code for contacts
  SalesTrackingCategories?: SalesTrackingCategory[]  // The default sales tracking categories for contacts
  PurchasesTrackingCategories?: SalesTrackingCategory[]  // The default purchases tracking categories for contacts
  TrackingCategoryName?: string  // The name of the Tracking Category assigned to the contact under SalesTrackingCategories and PurchasesTrackingCategories
  TrackingCategoryOption?: string  // The name of the Tracking Option assigned to the contact under SalesTrackingCategories and PurchasesTrackingCategories
  PaymentTerms?: PaymentTerm
  UpdatedDateUTC?: string  // UTC timestamp of last update to contact
  ContactGroups?: ContactGroup[]  // Displays which contact groups a contact is included in
  Website?: string  // Website address for contact (read only)
  BrandingTheme?: BrandingTheme
  BatchPayments?: BatchPaymentDetails
  Discount?: number @format("double")  // The default discount rate for the contact (read only)
  Balances?: Balances
  Attachments?: Attachment[]  // Displays array of attachments from the API
  HasAttachments?: boolean @default("false")  // A boolean to indicate if a contact has an attachment
  ValidationErrors?: ValidationError[]  // Displays validation errors returned from the API
  HasValidationErrors?: boolean @default("false")  // A boolean to indicate if a contact has an validation errors
  StatusAttributeString?: string  // Status of object
}
```
