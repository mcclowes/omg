# CISSetting

```omg.type
type CISSetting = {
  CISEnabled?: boolean  // Boolean that describes if the contact is a CIS Subcontractor
  Rate?: number @format("double")  // CIS Deduction rate for the contact if he is a subcontractor. If the contact is not CISEnabled, then the rate is not returned
}
```
