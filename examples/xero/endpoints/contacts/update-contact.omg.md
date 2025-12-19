---
method: POST
path: /Contacts/{ContactID}
operationId: updateContact
tags:
  - Accounting
summary: Updates a specific contact in a Xero organisation
---

# Updates a specific contact in a Xero organisation

```omg.path
{
  ContactID: uuid  // Unique identifier for a Contact
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
  "Idempotency-Key"?: string  // This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
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
