---
method: GET
path: /Payments/{PaymentID}
operationId: getPayment
tags:
  - Accounting
summary: Retrieves a specific payment for invoices and credit notes using a unique payment Id
---

# Retrieves a specific payment for invoices and credit notes using a unique payment Id

```omg.path
{
  PaymentID: uuid  // Unique identifier for a Payment
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
Payments
```
