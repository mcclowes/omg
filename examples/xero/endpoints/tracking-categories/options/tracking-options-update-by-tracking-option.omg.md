---
method: POST
path: /TrackingCategories/{TrackingCategoryID}/Options/{TrackingOptionID}
operationId: updateTrackingOptions
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
extensions:
  x-hasAccountingValidationError: true
  x-example:
    - trackingOption: null
      is_object: true
      key: trackingOption
      keyPascal: TrackingOption
    - name: null
      is_last: true
      key: name
      keyPascal: Name
      default: Foobar
      object: trackingOption
---

# Updates a specific option for a specific tracking category

```omg.path
{
  TrackingCategoryID: uuid  // Unique identifier for a TrackingCategory
  TrackingOptionID: uuid  // Unique identifier for a Tracking Option
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

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
