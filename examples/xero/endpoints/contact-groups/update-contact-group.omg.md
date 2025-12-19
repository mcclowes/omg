---
method: POST
path: /ContactGroups/{ContactGroupID}
operationId: updateContactGroup
tags:
  - Accounting
summary: Updates a specific contact group
---

# Updates a specific contact group

```omg.path
{
  ContactGroupID: uuid  // Unique identifier for a Contact Group
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
ContactGroups
```

```omg.response
ContactGroups
```

```omg.response.400
Error
```
