---
method: DELETE
path: /Overpayments/{OverpaymentID}/Allocations/{AllocationID}
operationId: deleteOverpaymentAllocations
tags:
  - Accounting
security:
  - OAuth2:
      - accounting.transactions
---

# Deletes an Allocation from an overpayment

```omg.path
{
  OverpaymentID: uuid  // Unique identifier for a Overpayment
  AllocationID: uuid  // Unique identifier for Allocation object
}
```

```omg.response
Allocation
```

{{> headers/xero-tenant-id }}
