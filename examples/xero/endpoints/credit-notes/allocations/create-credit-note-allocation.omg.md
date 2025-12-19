---
method: PUT
path: /CreditNotes/{CreditNoteID}/Allocations
operationId: createCreditNoteAllocation
tags:
  - Accounting
summary: Creates allocation for a specific credit note
---

# Creates allocation for a specific credit note

```omg.path
{
  CreditNoteID: uuid  // Unique identifier for a Credit Note
}
```

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
Allocations
```

```omg.response
Allocations
```

```omg.response.400
Error
```
