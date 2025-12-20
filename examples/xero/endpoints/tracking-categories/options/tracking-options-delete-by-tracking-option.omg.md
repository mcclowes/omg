---
method: DELETE
path: /TrackingCategories/{TrackingCategoryID}/Options/{TrackingOptionID}
operationId: deleteTrackingOptions
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
---

# Deletes a specific option for a specific tracking category

```omg.path
{
  TrackingCategoryID: uuid  // Unique identifier for a TrackingCategory
  TrackingOptionID: uuid  // Unique identifier for a Tracking Option
}
```

```omg.response
TrackingOptions
```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}
