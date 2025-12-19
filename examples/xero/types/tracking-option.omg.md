# TrackingOption

```omg.type
type TrackingOption = {
  TrackingOptionID?: uuid  // The Xero identifier for a tracking option e.g. ae777a87-5ef3-4fa0-a4f0-d10e1f13073a
  Name?: string @maxLength(100)  // The name of the tracking option e.g. Marketing, East (max length = 100)
  Status?: "ACTIVE" | "ARCHIVED" | "DELETED"  // The status of a tracking option
  TrackingCategoryID?: uuid  // Filter by a tracking category e.g. 297c2dc5-cc47-4afd-8ec8-74990b8761e9
}
```
