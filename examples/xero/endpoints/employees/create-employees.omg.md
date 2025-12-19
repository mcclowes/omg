---
method: PUT
path: /Employees
operationId: createEmployees
tags:
  - Accounting
deprecated: true
summary: Creates new employees used in Xero payrun
---

# Creates new employees used in Xero payrun

This endpoint is deprecated and will be removed April 28, 2026

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
Employees
```

```omg.response
Employees
```

```omg.response.400
Error
```
