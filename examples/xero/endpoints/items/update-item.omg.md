---
method: POST
path: /Items/{ItemID}
operationId: updateItem
tags:
  - Accounting
summary: Updates a specific item
---

# Updates a specific item

```omg.path
{
  ItemID: uuid  // Unique identifier for an Item
}
```

```omg.query
{
  unitdp?: integer  // e.g. unitdp=4 – (Unit Decimal Places) You can opt in to use four decimal places for unit amounts
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
Items
```

```omg.response
Items
```

```omg.response.400
Error
```
