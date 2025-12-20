---
method: GET
path: /Items/{ItemID}
operationId: getItem
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
      - accounting.settings.read
---

# Retrieves a specific item using a unique item Id

```omg.path
{
  ItemID: uuid  // Unique identifier for an Item
}
```

```omg.response
Items
```

{{> query/unitdp }}

{{> headers/xero-tenant-id }}
