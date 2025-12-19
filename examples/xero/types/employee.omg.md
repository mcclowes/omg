# Employee

```omg.type
type Employee = {
  EmployeeID?: uuid  // The Xero identifier for an employee e.g. 297c2dc5-cc47-4afd-8ec8-74990b8761e9
  Status?: "ACTIVE" | "ARCHIVED" | "GDPRREQUEST" | "DELETED"  // Current status of an employee – see contact status types
  FirstName?: string @maxLength(255)  // First name of an employee (max length = 255)
  LastName?: string @maxLength(255)  // Last name of an employee (max length = 255)
  ExternalLink?: ExternalLink
  UpdatedDateUTC?: string
  StatusAttributeString?: string  // A string to indicate if a invoice status
  ValidationErrors?: ValidationError[]  // Displays array of validation error messages from the API
}
```
