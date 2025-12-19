# TenNinetyNineContact

```omg.type
type TenNinetyNineContact = {
  Box1?: number @format("double")  // Box 1 on 1099 Form
  Box2?: number @format("double")  // Box 2 on 1099 Form
  Box3?: number @format("double")  // Box 3 on 1099 Form
  Box4?: number @format("double")  // Box 4 on 1099 Form
  Box5?: number @format("double")  // Box 5 on 1099 Form
  Box6?: number @format("double")  // Box 6 on 1099 Form
  Box7?: number @format("double")  // Box 7 on 1099 Form
  Box8?: number @format("double")  // Box 8 on 1099 Form
  Box9?: number @format("double")  // Box 9 on 1099 Form
  Box10?: number @format("double")  // Box 10 on 1099 Form
  Box11?: number @format("double")  // Box 11 on 1099 Form
  Box13?: number @format("double")  // Box 13 on 1099 Form
  Box14?: number @format("double")  // Box 14 on 1099 Form
  Name?: string  // Contact name on 1099 Form
  FederalTaxIDType?: string  // Contact Fed Tax ID type
  City?: string  // Contact city on 1099 Form
  Zip?: string  // Contact zip on 1099 Form
  State?: string  // Contact State on 1099 Form
  Email?: string  // Contact email on 1099 Form
  StreetAddress?: string  // Contact address on 1099 Form
  TaxID?: string  // Contact tax id on 1099 Form
  ContactId?: uuid  // Contact contact id
  LegalName?: string  // Contact legal name
  BusinessName?: string  // Contact business name
  FederalTaxClassification?: "SOLE_PROPRIETOR" | "PARTNERSHIP" | "TRUST_OR_ESTATE" | "NONPROFIT" | "C_CORP" | "S_CORP" | "OTHER"  // Contact federal tax classification
}
```
