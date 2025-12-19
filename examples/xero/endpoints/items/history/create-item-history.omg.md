---
method: PUT
path: /Items/{ItemID}/History
operationId: createItemHistory
tags:
  - Accounting
summary: Creates a history record for a specific item
---

# Creates a history record for a specific item

```omg.path
{
  ItemID: uuid  // Unique identifier for an Item
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
}
```

```omg.body
HistoryRecords
```

```omg.response
HistoryRecords
```
