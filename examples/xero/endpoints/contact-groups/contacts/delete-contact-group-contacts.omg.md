---
method: DELETE
path: /ContactGroups/{ContactGroupID}/Contacts
operationId: deleteContactGroupContacts
tags:
  - Accounting
summary: Deletes all contacts from a specific contact group
---

# Deletes all contacts from a specific contact group

```omg.path
{
  ContactGroupID: uuid  // Unique identifier for a Contact Group
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response.204

```
