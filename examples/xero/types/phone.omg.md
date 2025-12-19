# Phone

```omg.type
type Phone = {
  PhoneType?: "DEFAULT" | "DDI" | "MOBILE" | "FAX" | "OFFICE"
  PhoneNumber?: string @maxLength(50)  // max length = 50
  PhoneAreaCode?: string @maxLength(10)  // max length = 10
  PhoneCountryCode?: string @maxLength(20)  // max length = 20
}
```
