---
method: GET
path: /ContactGroups/{ContactGroupID}
operationId: getContactGroup
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.contacts
      - accounting.contacts.read
---

# Retrieves a specific contact group by using a unique contact group Id

```omg.path
{
  ContactGroupID: uuid  // Unique identifier for a Contact Group
}
```

```omg.response
ContactGroups
```

{{> headers/xero-tenant-id }}
