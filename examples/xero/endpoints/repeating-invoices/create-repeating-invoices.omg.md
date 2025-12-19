---
method: PUT
path: /RepeatingInvoices
operationId: createRepeatingInvoices
tags:
  - Accounting
summary: Creates one or more repeating invoice templates
---

# Creates one or more repeating invoice templates

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
RepeatingInvoices
```

```omg.response
RepeatingInvoices
```

```omg.response.400
Error
```
