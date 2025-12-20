---
method: GET
path: /Items/{ItemID}/History
operationId: getItemHistory
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.settings
      - accounting.settings.read
---

# Retrieves history for a specific item

```omg.path
{
  ItemID: uuid  // Unique identifier for an Item
}
```

```omg.response
HistoryRecords
```

{{> headers/xero-tenant-id }}
