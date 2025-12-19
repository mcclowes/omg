---
method: GET
path: /Items/{ItemID}/History
operationId: getItemHistory
tags:
  - Accounting
summary: Retrieves history for a specific item
---

# Retrieves history for a specific item

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

```omg.response
HistoryRecords
```
