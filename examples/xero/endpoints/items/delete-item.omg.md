---
method: DELETE
path: /Items/{ItemID}
operationId: deleteItem
tags:
  - Accounting
summary: Deletes a specific item
---

# Deletes a specific item

```omg.path
{
  ItemID: uuid  // Unique identifier for an Item
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response.204

```

```omg.response.400
Error
```
