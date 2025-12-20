---
method: DELETE
path: /ContactGroups/{ContactGroupID}/Contacts/{ContactID}
operationId: deleteContactGroupContact
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.contacts
---

# Deletes a specific contact from a contact group using a unique contact Id

```omg.path
{
  ContactGroupID: uuid  // Unique identifier for a Contact Group
  ContactID: uuid  // Unique identifier for a Contact
}
```

```omg.response.204

```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}
