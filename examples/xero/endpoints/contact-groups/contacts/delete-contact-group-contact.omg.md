---
method: DELETE
path: /ContactGroups/{ContactGroupID}/Contacts/{ContactID}
operationId: deleteContactGroupContact
tags:
  - Accounting
summary: Deletes a specific contact from a contact group using a unique contact Id
---

# Deletes a specific contact from a contact group using a unique contact Id

```omg.path
{
  ContactGroupID: uuid  // Unique identifier for a Contact Group
  ContactID: uuid  // Unique identifier for a Contact
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response.204

```

```omg.response.400
Error
```
