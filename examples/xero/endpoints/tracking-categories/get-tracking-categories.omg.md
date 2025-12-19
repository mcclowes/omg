---
method: GET
path: /TrackingCategories
operationId: getTrackingCategories
tags:
  - Accounting
summary: Retrieves tracking categories and options
---

# Retrieves tracking categories and options

```omg.query
{
  where?: string  // Filter by an any element
  order?: string  // Order by an any element
  includeArchived?: boolean  // e.g. includeArchived=true - Categories and options with a status of ARCHIVED will be included in the response
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
TrackingCategories
```
