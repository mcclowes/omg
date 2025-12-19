---
method: GET
path: /Overpayments/{OverpaymentID}/History
operationId: getOverpaymentHistory
tags:
  - Accounting
summary: Retrieves history records of a specific overpayment
---

# Retrieves history records of a specific overpayment

```omg.path
{
  OverpaymentID: uuid  // Unique identifier for a Overpayment
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
