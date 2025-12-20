---
method: DELETE
path: /Prepayments/{PrepaymentID}/Allocations/{AllocationID}
operationId: deletePrepaymentAllocations
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
---

# Deletes an Allocation from a Prepayment

```omg.path
{
  PrepaymentID: uuid  // Unique identifier for a PrePayment
  AllocationID: uuid  // Unique identifier for Allocation object
}
```

```omg.response
Allocation
```

{{> headers/xero-tenant-id }}
