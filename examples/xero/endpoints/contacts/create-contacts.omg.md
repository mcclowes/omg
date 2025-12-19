---
method: PUT
path: /Contacts
operationId: createContacts
tags:
  - Accounting
summary: Creates multiple contacts (bulk) in a Xero organisation
---

# Creates multiple contacts (bulk) in a Xero organisation

```omg.query
{
  summarizeErrors?: boolean @default(false)  // If false return 200 OK and mix of successfully created objects and any with validation errors
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
