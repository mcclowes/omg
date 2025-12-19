---
method: DELETE
path: /Prepayments/{PrepaymentID}/Allocations/{AllocationID}
operationId: deletePrepaymentAllocations
tags:
  - Accounting
summary: Deletes an Allocation from a Prepayment
---

# Deletes an Allocation from a Prepayment

```omg.path
{
  PrepaymentID: uuid  // Unique identifier for a PrePayment
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
