---
method: POST
path: /Quotes
operationId: updateOrCreateQuotes
tags:
  - Accounting
summary: Updates or creates one or more quotes
---

# Updates or creates one or more quotes

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
Quotes
```

```omg.response
Quotes
```

```omg.response.400
Error
```
