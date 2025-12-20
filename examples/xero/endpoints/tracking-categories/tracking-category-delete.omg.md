---
method: DELETE
path: /TrackingCategories/{TrackingCategoryID}
operationId: deleteTrackingCategory
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
---

# Deletes a specific tracking category

```omg.path
{
  TrackingCategoryID: uuid  // Unique identifier for a TrackingCategory
}
```

```omg.response
TrackingCategories
```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}
