---
method: DELETE
path: /ContactGroups/{ContactGroupID}/Contacts
operationId: deleteContactGroupContacts
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.contacts
---

# Deletes all contacts from a specific contact group

```omg.path
{
  ContactGroupID: uuid  // Unique identifier for a Contact Group
}
```

```omg.response.204

```

{{> headers/xero-tenant-id }}
