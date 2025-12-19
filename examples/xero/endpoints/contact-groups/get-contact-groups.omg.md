---
method: GET
path: /ContactGroups
operationId: getContactGroups
tags:
  - Accounting
summary: Retrieves the contact Id and name of each contact group
---

# Retrieves the contact Id and name of each contact group

```omg.query
{
  where?: string  // Filter by an any element
  order?: string  // Order by an any element
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
ContactGroups
```
