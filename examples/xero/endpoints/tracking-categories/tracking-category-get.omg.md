---
method: GET
path: /TrackingCategories/{TrackingCategoryID}
operationId: getTrackingCategory
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
      - accounting.settings.read
---

# Retrieves specific tracking categories and options using a unique tracking category Id

```omg.path
{
  TrackingCategoryID: uuid  // Unique identifier for a TrackingCategory
}
```

```omg.response
TrackingCategories
```

{{> headers/xero-tenant-id }}
