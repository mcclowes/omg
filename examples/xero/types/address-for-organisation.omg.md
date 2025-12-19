# AddressForOrganisation

```omg.type
type AddressForOrganisation = {
  AddressType?: "POBOX" | "STREET" | "DELIVERY"  // define the type of address
  AddressLine1?: string @maxLength(500)  // max length = 500
  AddressLine2?: string @maxLength(500)  // max length = 500
  AddressLine3?: string @maxLength(500)  // max length = 500
  AddressLine4?: string @maxLength(500)  // max length = 500
  City?: string @maxLength(255)  // max length = 255
  Region?: string @maxLength(255)  // max length = 255
  PostalCode?: string @maxLength(50)  // max length = 50
  Country?: string @maxLength(50)  // max length = 50, [A-Z], [a-z] only
  AttentionTo?: string @maxLength(255)  // max length = 255
}
```
