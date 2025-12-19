---
method: DELETE
path: /TrackingCategories/{TrackingCategoryID}/Options/{TrackingOptionID}
operationId: deleteTrackingOptions
tags:
  - Accounting
summary: Deletes a specific option for a specific tracking category
---

# Deletes a specific option for a specific tracking category

```omg.path
{
  TrackingCategoryID: uuid  // Unique identifier for a TrackingCategory
  TrackingOptionID: uuid  // Unique identifier for a Tracking Option
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
TrackingOptions
```

```omg.response.400
Error
```
