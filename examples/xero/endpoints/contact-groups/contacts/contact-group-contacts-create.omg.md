---
method: PUT
path: /ContactGroups/{ContactGroupID}/Contacts
operationId: createContactGroupContacts
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.contacts
extensions:
  x-hasAccountingValidationError: true
  x-example:
    - contact: null
      is_object: true
      key: contact
      keyPascal: Contact
    - contactID: null
      is_last: true
      is_uuid: true
      key: contactID
      keyPascal: ContactID
      keySnake: contact_id
      default: 00000000-0000-0000-0000-000000000000
      object: contact
    - contacts: null
      is_object: true
      key: contacts
      keyPascal: Contacts
    - add_contact: null
      is_last: true
      is_array_add: true
      key: contacts
      keyPascal: Contacts
      java: Contacts
      csharp: Contact
      object: contact
---

# Creates contacts to a specific contact group

```omg.path
{
  ContactGroupID: uuid  // Unique identifier for a Contact Group
}
```

```omg.body
Contacts
```

```omg.response
Contacts
```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
