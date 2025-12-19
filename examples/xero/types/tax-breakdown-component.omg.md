# TaxBreakdownComponent

```omg.type
type TaxBreakdownComponent = {
  TaxComponentId?: uuid  // The unique ID number of this component
  Type?: "SYSGST/USCOUNTRY" | "SYSGST/USSTATE" | "SYSGST/USCOUNTY" | "SYSGST/USCITY" | "SYSGST/USSPECIAL"  // The type of the jurisdiction
  Name?: string  // The name of the jurisdiction
  TaxPercentage?: number  // The percentage of the tax
  TaxAmount?: number  // The amount of the tax
  TaxableAmount?: number  // The amount that is taxable
  NonTaxableAmount?: number  // The amount that is not taxable
  ExemptAmount?: number  // The amount that is exempt
  StateAssignedNo?: string  // The state assigned number of the jurisdiction
  JurisdictionRegion?: string  // Name identifying the region within the country
}
```
