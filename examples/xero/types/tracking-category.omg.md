# TrackingCategory

```omg.type
type TrackingCategory = {
  TrackingCategoryID?: uuid  // The Xero identifier for a tracking category e.g. 297c2dc5-cc47-4afd-8ec8-74990b8761e9
  TrackingOptionID?: uuid  // The Xero identifier for a tracking option e.g. dc54c220-0140-495a-b925-3246adc0075f
  Name?: string @maxLength(100)  // The name of the tracking category e.g. Department, Region (max length = 100)
  Option?: string @maxLength(100)  // The option name of the tracking option e.g. East, West (max length = 100)
  Status?: "ACTIVE" | "ARCHIVED" | "DELETED"  // The status of a tracking category
  Options?: TrackingOption[]  // See Tracking Options
}
```
