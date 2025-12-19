---
method: GET
path: /Overpayments/{OverpaymentID}
operationId: getOverpayment
tags:
  - Accounting
summary: Retrieves a specific overpayment using a unique overpayment Id
---

# Retrieves a specific overpayment using a unique overpayment Id

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
Overpayments
```
