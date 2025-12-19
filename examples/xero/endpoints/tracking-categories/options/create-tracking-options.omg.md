---
method: PUT
path: /TrackingCategories/{TrackingCategoryID}/Options
operationId: createTrackingOptions
tags:
  - Accounting
summary: Creates options for a specific tracking category
---

# Creates options for a specific tracking category

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
TrackingOption
```

```omg.response
TrackingOptions
```

```omg.response.400
Error
```
