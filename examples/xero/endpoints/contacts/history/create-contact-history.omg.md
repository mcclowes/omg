---
method: PUT
path: /Contacts/{ContactID}/History
operationId: createContactHistory
tags:
  - Accounting
summary: Creates a new history record for a specific contact
---

# Creates a new history record for a specific contact

```omg.path
{
  ContactID: uuid  // Unique identifier for a Contact
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

```omg.response.400
Error
```
