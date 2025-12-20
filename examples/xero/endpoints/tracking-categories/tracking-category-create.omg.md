---
method: PUT
path: /TrackingCategories
operationId: createTrackingCategory
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

# Create tracking categories

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
