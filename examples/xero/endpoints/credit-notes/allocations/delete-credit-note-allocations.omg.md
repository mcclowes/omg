---
method: DELETE
path: /CreditNotes/{CreditNoteID}/Allocations/{AllocationID}
operationId: deleteCreditNoteAllocations
tags:
  - Accounting
summary: Deletes an Allocation from a Credit Note
---

# Deletes an Allocation from a Credit Note

```omg.path
{
  CreditNoteID: uuid  // Unique identifier for a Credit Note
  AllocationID: uuid  // Unique identifier for Allocation object
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
Allocation
```
