---
method: PUT
path: /TrackingCategories
operationId: createTrackingCategory
tags:
  - Accounting
summary: Create tracking categories
---

# Create tracking categories

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
