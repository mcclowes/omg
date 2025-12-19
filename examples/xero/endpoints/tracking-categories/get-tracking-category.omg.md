---
method: GET
path: /TrackingCategories/{TrackingCategoryID}
operationId: getTrackingCategory
tags:
  - Accounting
summary: Retrieves specific tracking categories and options using a unique tracking category Id
---

# Retrieves specific tracking categories and options using a unique tracking category Id

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
