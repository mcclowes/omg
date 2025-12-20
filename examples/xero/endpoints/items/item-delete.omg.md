---
method: DELETE
path: /Items/{ItemID}
operationId: deleteItem
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
---

# Deletes a specific item

```omg.path
{
  ItemID: uuid  // Unique identifier for an Item
}
```

```omg.response.204

```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}
