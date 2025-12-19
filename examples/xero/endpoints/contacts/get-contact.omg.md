---
method: GET
path: /Contacts/{ContactID}
operationId: getContact
tags:
  - Accounting
summary: Retrieves a specific contacts in a Xero organisation using a unique contact Id
---

# Retrieves a specific contacts in a Xero organisation using a unique contact Id

```omg.path
{
  ContactID: uuid  // Unique identifier for a Contact
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
Contacts
```
