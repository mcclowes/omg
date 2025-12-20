---
method: PUT
path: /TrackingCategories/{TrackingCategoryID}/Options
operationId: createTrackingOptions
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

# Creates options for a specific tracking category

```omg.path
{
  TrackingCategoryID: uuid  // Unique identifier for a TrackingCategory
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
