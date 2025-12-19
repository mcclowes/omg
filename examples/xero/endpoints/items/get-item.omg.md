---
method: GET
path: /Items/{ItemID}
operationId: getItem
tags:
  - Accounting
summary: Retrieves a specific item using a unique item Id
---

# Retrieves a specific item using a unique item Id

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
}
```

```omg.response
Items
```
