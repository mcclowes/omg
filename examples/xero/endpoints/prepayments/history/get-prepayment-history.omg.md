---
method: GET
path: /Prepayments/{PrepaymentID}/History
operationId: getPrepaymentHistory
tags:
  - Accounting
summary: Retrieves history record for a specific prepayment
---

# Retrieves history record for a specific prepayment

```omg.path
{
  PrepaymentID: uuid  // Unique identifier for a PrePayment
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
HistoryRecords
```
