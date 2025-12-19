---
method: GET
path: /Organisation
operationId: getOrganisations
tags:
  - Accounting
summary: Retrieves Xero organisation details
---

# Retrieves Xero organisation details

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
Organisations
```
