---
method: POST
path: /TrackingCategories/{TrackingCategoryID}
operationId: updateTrackingCategory
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
extensions:
  x-hasAccountingValidationError: true
  x-example:
    - trackingCategory: null
      is_object: true
      key: trackingCategory
      keyPascal: TrackingCategory
    - name: null
      is_last: true
      key: name
      keyPascal: Name
      default: Foobar
      object: trackingCategory
---

# Updates a specific tracking category

```omg.path
{
  TrackingCategoryID: uuid  // Unique identifier for a TrackingCategory
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

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
