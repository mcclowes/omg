---
method: GET
path: /Contacts/{ContactID}/History
operationId: getContactHistory
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.contacts
      - accounting.contacts.read
---

# Retrieves history records for a specific contact

```omg.path
{
  ContactID: uuid  // Unique identifier for a Contact
}
```

```omg.response
HistoryRecords
```

{{> headers/xero-tenant-id }}
