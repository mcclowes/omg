---
method: GET
path: /Contacts/{ContactID}
operationId: getContact
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.contacts
      - accounting.contacts.read
---

# Retrieves a specific contacts in a Xero organisation using a unique contact Id

```omg.path
{
  ContactID: uuid  // Unique identifier for a Contact
}
```

```omg.response
Contacts
```

{{> headers/xero-tenant-id }}
