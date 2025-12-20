---
method: POST
path: /Contacts/{ContactID}
operationId: updateContact
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
    - name: null
      key: name
      keyPascal: Name
      default: Thanos
      object: contact
    - contactID: null
      is_last: true
      is_uuid: true
      key: contactID
      keyPascal: ContactID
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

# Updates a specific contact in a Xero organisation

```omg.path
{
  ContactID: uuid  // Unique identifier for a Contact
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
