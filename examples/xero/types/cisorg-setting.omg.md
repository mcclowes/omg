# CISOrgSetting

```omg.type
type CISOrgSetting = {
  CISContractorEnabled?: boolean  // true or false - Boolean that describes if the organisation is a CIS Contractor
  CISSubContractorEnabled?: boolean  // true or false - Boolean that describes if the organisation is a CIS SubContractor
  Rate?: number @format("double")  // CIS Deduction rate for the organisation
}
```
