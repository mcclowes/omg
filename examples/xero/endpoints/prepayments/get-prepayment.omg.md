---
method: GET
path: /Prepayments/{PrepaymentID}
operationId: getPrepayment
tags:
  - Accounting
summary: Allows you to retrieve a specified prepayments
---

# Allows you to retrieve a specified prepayments

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
Prepayments
```
