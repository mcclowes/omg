---
method: GET
path: /Organisation/Actions
operationId: getOrganisationActions
tags:
  - Accounting
summary: Retrieves a list of the key actions your app has permission to perform in the connected Xero organisation.
---

# Retrieves a list of the key actions your app has permission to perform in the connected Xero organisation.

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
Actions
```
