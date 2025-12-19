---
method: GET
path: /ContactGroups/{ContactGroupID}
operationId: getContactGroup
tags:
  - Accounting
summary: Retrieves a specific contact group by using a unique contact group Id
---

# Retrieves a specific contact group by using a unique contact group Id

```omg.path
{
  ContactGroupID: uuid  // Unique identifier for a Contact Group
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
