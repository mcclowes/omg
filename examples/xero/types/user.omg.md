# User

```omg.type
type User = {
  UserID?: uuid  // Xero identifier
  EmailAddress?: string  // Email address of user
  FirstName?: string  // First name of user
  LastName?: string  // Last name of user
  UpdatedDateUTC?: string  // Timestamp of last change to user
  IsSubscriber?: boolean  // Boolean to indicate if user is the subscriber
  OrganisationRole?: "READONLY" | "INVOICEONLY" | "STANDARD" | "FINANCIALADVISER" | "MANAGEDCLIENT" | "CASHBOOKCLIENT" | "UNKNOWN" | "REMOVED"  // User role that defines permissions in Xero and via API (READONLY, INVOICEONLY, STANDARD, FINANCIALADVISER, etc)
}
```
