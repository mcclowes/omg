---
method: DELETE
path: /TrackingCategories/{TrackingCategoryID}
operationId: deleteTrackingCategory
tags:
  - Accounting
summary: Deletes a specific tracking category
---

# Deletes a specific tracking category

```omg.path
{
  TrackingCategoryID: uuid  // Unique identifier for a TrackingCategory
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
TrackingCategories
```

```omg.response.400
Error
```
