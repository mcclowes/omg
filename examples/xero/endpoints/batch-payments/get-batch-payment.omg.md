---
method: GET
path: /BatchPayments/{BatchPaymentID}
operationId: getBatchPayment
tags:
  - Accounting
summary: Retrieves a specific batch payment using a unique batch payment Id
---

# Retrieves a specific batch payment using a unique batch payment Id

```omg.path
{
  BatchPaymentID: uuid  // Unique identifier for BatchPayment
}
```

```omg.headers
{
  "xero-tenant-id": string  // Xero identifier for Tenant
}
```

```omg.response
BatchPayments
```
