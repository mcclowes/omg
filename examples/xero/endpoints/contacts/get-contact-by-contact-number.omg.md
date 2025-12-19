---
method: GET
path: /Contacts/{ContactNumber}
operationId: getContactByContactNumber
tags:
  - Accounting
summary: Retrieves a specific contact by contact number in a Xero organisation
---

# Retrieves a specific contact by contact number in a Xero organisation

```omg.path
{
  ContactNumber: string  // This field is read only on the Xero contact screen, used to identify contacts in external systems (max length = 50).
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
