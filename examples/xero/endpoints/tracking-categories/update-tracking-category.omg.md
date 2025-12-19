---
method: POST
path: /TrackingCategories/{TrackingCategoryID}
operationId: updateTrackingCategory
tags:
  - Accounting
summary: Updates a specific tracking category
---

# Updates a specific tracking category

```omg.path
{
  TrackingCategoryID: uuid  // Unique identifier for a TrackingCategory
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
TrackingCategory
```

```omg.response
TrackingCategories
```

```omg.response.400
Error
```
