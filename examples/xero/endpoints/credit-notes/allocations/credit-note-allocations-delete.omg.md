---
method: DELETE
path: /CreditNotes/{CreditNoteID}/Allocations/{AllocationID}
operationId: deleteCreditNoteAllocations
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
---

# Deletes an Allocation from a Credit Note

```omg.path
{
  CreditNoteID: uuid  // Unique identifier for a Credit Note
  AllocationID: uuid  // Unique identifier for Allocation object
}
```

```omg.response
Allocation
```

{{> headers/xero-tenant-id }}
