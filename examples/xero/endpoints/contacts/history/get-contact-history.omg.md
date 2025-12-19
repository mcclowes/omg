---
method: GET
path: /Contacts/{ContactID}/History
operationId: getContactHistory
tags:
  - Accounting
summary: Retrieves history records for a specific contact
---

# Retrieves history records for a specific contact

```omg.path
{
  ContactID: uuid  // Unique identifier for a Contact
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
