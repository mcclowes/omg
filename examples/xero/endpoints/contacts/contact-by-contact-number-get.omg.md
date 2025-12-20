---
method: GET
path: /Contacts/{ContactNumber}
operationId: getContactByContactNumber
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.contacts
      - accounting.contacts.read
---

# Retrieves a specific contact by contact number in a Xero organisation

```omg.path
{
  ContactNumber: string  // This field is read only on the Xero contact screen, used to identify contacts in external systems (max length = 50).
}
```

```omg.response
Contacts
```

{{> headers/xero-tenant-id }}
