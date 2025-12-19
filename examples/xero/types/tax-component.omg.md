# TaxComponent

```omg.type
type TaxComponent = {
  Name?: string  // Name of Tax Component
  Rate?: number @format("double")  // Tax Rate (up to 4dp)
  IsCompound?: boolean  // Boolean to describe if Tax rate is compounded.
  IsNonRecoverable?: boolean  // Boolean to describe if tax rate is non-recoverable. Non-recoverable rates are only applicable to Canadian organisations
}
```
