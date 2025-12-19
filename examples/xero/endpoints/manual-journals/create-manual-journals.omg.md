---
method: PUT
path: /ManualJournals
operationId: createManualJournals
tags:
  - Accounting
summary: Creates one or more manual journals
---

# Creates one or more manual journals

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
ManualJournals
```

```omg.response
ManualJournals
```

```omg.response.400
Error
```
