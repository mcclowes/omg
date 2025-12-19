---
method: PUT
path: /ContactGroups
operationId: createContactGroup
tags:
  - Accounting
summary: Creates a contact group
---

# Creates a contact group

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
