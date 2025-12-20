---
method: GET
path: /TrackingCategories
operationId: getTrackingCategories
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
      - accounting.settings.read
---

# Retrieves tracking categories and options

```omg.response
TrackingCategories
```

{{> query/where }}

{{> query/order }}

{{> query/include-archived }}

{{> headers/xero-tenant-id }}
