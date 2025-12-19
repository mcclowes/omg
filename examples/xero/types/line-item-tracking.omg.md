# LineItemTracking

```omg.type
type LineItemTracking = {
  TrackingCategoryID?: uuid  // The Xero identifier for a tracking category
  TrackingOptionID?: uuid  // The Xero identifier for a tracking category option
  Name?: string @maxLength(100)  // The name of the tracking category
  Option?: string  // See Tracking Options
}
```
