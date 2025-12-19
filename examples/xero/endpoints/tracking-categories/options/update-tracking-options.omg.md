---
method: POST
path: /TrackingCategories/{TrackingCategoryID}/Options/{TrackingOptionID}
operationId: updateTrackingOptions
tags:
  - Accounting
summary: Updates a specific option for a specific tracking category
---

# Updates a specific option for a specific tracking category

```omg.path
{
  TrackingCategoryID: uuid  // Unique identifier for a TrackingCategory
  TrackingOptionID: uuid  // Unique identifier for a Tracking Option
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
TrackingOption
```

```omg.response
TrackingOptions
```

```omg.response.400
Error
```
