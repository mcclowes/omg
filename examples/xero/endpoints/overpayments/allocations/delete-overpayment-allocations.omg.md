---
method: DELETE
path: /Overpayments/{OverpaymentID}/Allocations/{AllocationID}
operationId: deleteOverpaymentAllocations
tags:
  - Accounting
summary: Deletes an Allocation from an overpayment
---

# Deletes an Allocation from an overpayment

```omg.path
{
  OverpaymentID: uuid  // Unique identifier for a Overpayment
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
