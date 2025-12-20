---
method: POST
path: /ContactGroups/{ContactGroupID}
operationId: updateContactGroup
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
      key: contactGroup
      keyPascal: ContactGroup
      keySnake: contact_group
    - name: null
      is_last: true
      key: name
      keyPascal: Name
      default: Vendor
      object: contactGroup
    - contactGroups: null
      is_object: true
      key: contactGroups
      keyPascal: ContactGroups
    - add_ContactGroup: null
      is_last: true
      is_array_add: true
      key: contactGroups
      keyPascal: ContactGroups
      keySnake: contact_groups
      java: ContactGroups
      python: contact_group
      ruby: contact_group
      csharp: ContactGroup
      object: contactGroup
---

# Updates a specific contact group

```omg.path
{
  ContactGroupID: uuid  // Unique identifier for a Contact Group
}
```

```omg.body
ContactGroups
```

```omg.response
ContactGroups
```

```omg.response.400
Error
```

{{> headers/xero-tenant-id }}

{{> headers/idempotency-key }}
