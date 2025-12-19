# InvoiceAddress

```omg.type
type InvoiceAddress = {
  InvoiceAddressType?: "FROM" | "TO"  // Indicates whether the address is defined as origin (FROM) or destination (TO)
  AddressLine1?: string  // First line of a physical address
  AddressLine2?: string  // Second line of a physical address
  AddressLine3?: string  // Third line of a physical address
  AddressLine4?: string  // Fourth line of a physical address
  City?: string  // City of a physical address
  Region?: string  // Region or state of a physical address
  PostalCode?: string  // Postal code of a physical address
  Country?: string  // Country of a physical address
}
```
